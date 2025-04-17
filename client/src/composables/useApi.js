import {ref} from 'vue';
import axios from 'axios';
import {baseURL} from "@/composables/url.js";


/**
 * Custom composable for handling API requests with support for request queuing,
 * streaming responses, and utility functions for date and message formatting.
 * @returns {Object} - Exposes various methods and reactive properties for API interactions.
 */
export function useApi() {
    const loading = ref(false); // Tracks the loading state of API requests
    const error = ref(null); // Stores error messages from API requests

    const requestQueue = ref([]); // Queue for managing API requests
    const activeRequests = ref(0); // Tracks the number of active API requests
    const MAX_PARALLEL_REQUESTS = 5; // Maximum number of parallel API requests allowed

    /*
     * Axios instance creation with default configuration
     */
    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });


    /**
     * Mapping of endpoint keys to their respective URL paths.
     * @type {Object.<string, string>}
     */
    const urlMapping = {
        'ask-llm' : '/ask-llm',
        'update-ask-llm' : '/update-ask-llm',
    }


    /**
     * Adds a request to the queue and processes it.
     * @param {string} endpoint - The API endpoint key.
     * @param {Object} data - The payload for the request.
     * @param {boolean} [chunks=false] - Whether the request expects streaming responses.
     * @param {Function} [onChunk] - Callback for processing streamed chunks.
     * @returns {Promise<any>} - Resolves with the API response or rejects with an error.
     */
    const enqueue = async (endpoint, data, chunks = false, onChunk = undefined) => {
        return new Promise((resolve, reject) => {
            requestQueue.value.push({ endpoint, data, resolve, reject, chunks, onChunk });
            processQueue();
        });
    };


    /**
     * Processes the request queue, ensuring the number of active requests
     * does not exceed the maximum allowed.
     * @returns {Promise<void>}
     */
    const processQueue = async () => {
        // Process as many requests as we can up to MAX_PARALLEL_REQUESTS
        while (requestQueue.value.length > 0 && activeRequests.value < MAX_PARALLEL_REQUESTS) {
            activeRequests.value++;
            const { endpoint, data, resolve, reject, chunks, onChunk } = requestQueue.value.shift();

            // Process this request independently
            askLLMSupport(endpoint, data, {chunks, onChunk})
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
                .finally(() => {
                    activeRequests.value--;
                    // Check if we can process more requests
                    if (requestQueue.value.length > 0) {
                        processQueue();
                    }
                });
        }
    }

    /**
     * Parses a Server-Sent Events (SSE) chunk.
     * @param {string} chunk - The SSE chunk to parse.
     * @returns {Object|null} - Parsed JSON object or null if parsing fails.
     */
    const parseSSEChunk = (chunk) => {
        if (!chunk.startsWith('data: ')) return null;
        try {
            return JSON.parse(chunk.slice(6));
        } catch (e) {
            console.warn('Failed to parse SSE chunk:', e);
            return null;
        }
    };


    /**
     * Sends a request to the specified endpoint, with optional support for streaming responses.
     * @param {string} endpoint - The API endpoint key.
     * @param {Object} data - The payload for the request.
     * @param {Object} [options] - Additional options for the request.
     * @param {boolean} [options.chunks=false] - Whether the request expects streaming responses.
     * @param {Function} [options.onChunk=null] - Callback for processing streamed chunks.
     * @returns {Promise<any|boolean>} - Resolves with the API response or true for successful streams.
     */
    const askLLMSupport = async (endpoint, data, { chunks = false, onChunk = null } = {}) => {
        if(endpoint !== 'ask-llm')
            loading.value = true;
        error.value = null;

        try {
            if (!chunks) {
                // Regular request using axios
                const response = await api.post(urlMapping[endpoint], data);
                return response.data;
            } else {
                // Streaming request using fetch
                const response = await fetch(baseURL + urlMapping[endpoint], {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    const chunkText = decoder.decode(value, { stream: true });
                    const chunkLines = chunkText.split('\n').filter(line => line.trim());

                    for (const line of chunkLines) {
                        const parsedChunk = parseSSEChunk(line);
                        if (parsedChunk && onChunk) {
                            await onChunk(parsedChunk);
                        }
                    }
                }

                return true; // Indicate successful completion of stream
            }
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            if(endpoint !== 'ask-llm')
                loading.value = false;
        }
    };


    /**
     * Adds a request to the queue for processing.
     * @param {string} endpoint - The API endpoint key.
     * @param {Object} data - The payload for the request.
     * @param {boolean} [chunks=false] - Whether the request expects streaming responses.
     * @param {Function} [onChunk=undefined] - Callback for processing streamed chunks.
     * @returns {Promise<any>} - Resolves with the API response or rejects with an error.
     */
    const queuedAskLLMSupport = async (endpoint, data, chunks = false, onChunk=undefined) => {
        return enqueue(endpoint, data, chunks, onChunk);
    }


    /**
     * Converts a date to a local ISO string.
     * @param {Date} [date=new Date()] - The date to convert.
     * @returns {string} - The local ISO string representation of the date.
     */
    const dateToLocalISO = (date=new Date()) => {
        const tzOffset = -date.getTimezoneOffset();
        const diff = tzOffset >= 0 ? '+' : '-';
        const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');

        const seconds = pad(date.getSeconds());
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes());
    }

    /**
     * Converts a local ISO string to a Date object.
     * @param {string} isoDate - The ISO string to convert.
     * @returns {Date} - The corresponding Date object.
     */
    const localISOToDate = (isoDate) => {
        return new Date(isoDate);
    }


    /**
     * Extracts and formats only the essential information from a message object.
     * @param {Object} message - The message object to clean.
     * @returns {Object} - A cleaned message object containing only essential information.
     */
    const cleanMessage = (message) => {
        const username = sessionStorage.getItem('username')
        const firstSender = message.sender
        const date = new Date(message.timestamp.getTime())
        const messages = [{
            order_index: 1,
            sender: firstSender,
            receiver: username,
            timestamp: dateToLocalISO(date) + ` (${formatMessageTime(date)})`,
            content: message.content,
        }]
        if (message.replies && message.replies.length > 0) {
            message.replies.forEach((r,idx) => {
                let rDate = new Date(r.timestamp.getTime());
                let sender = r.sender !== 'Me' ? r.sender : username
                let receiver = sender === username ? firstSender: username
                messages.push({
                    order_index: messages.length+1,
                    sender: sender,
                    receiver: receiver,
                    timestamp: dateToLocalISO(rDate) + ` (${formatMessageTime(rDate)})`,
                    content: r.content,
                });
            })
        }
        return {
            id: message.id,
            subject: message.subject,
            messages : messages,
        }
    }


    /**
     * Formats a date object into a localized time string.
     * @param {Date} date - The date object to format.
     * @returns {string} - The formatted time string (e.g., "12:30 PM").
     */
    const formatTime = date => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };


    /**
     * Formats a date object into a detailed message time string.
     * @param {Date} date - The date object to format.
     * @returns {string} - The formatted message time string (e.g., "Monday 12, March, 12:30 PM").
     */
    const formatMessageTime = (date) => {
        const dayName = date.toLocaleString('en-US', { weekday: 'long' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const dayNumber = date.getDate();
        const hour = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).slice(0, 16);
        return `${dayName} ${dayNumber}, ${month},  ${hour}`;
    }


    /**
     * Generates a string representation of the current week, starting from today.
     * @returns {string} - A string containing the names and dates of the next 7 days.
     */
    const currentWeek = () => {
        let result = '';
        const today = new Date();
        for (let i = 0; i <= 6; i++) {
            const future = new Date(today);
            future.setDate(today.getDate() + i);
            const dayName = future.toLocaleString('en-US', { weekday: 'long' });
            const month = future.toLocaleString('en-US', { month: 'long' });
            const dayNumber = future.getDate();
            result += `"${dayName} ${dayNumber}, ${month}",\n`;
        }
        return result;
    }


    /**
     * Retrieves the current time and date information, optionally including the current week's days.
     * @param {Date} [now=new Date()] - The current date and time.
     * @param {boolean} [week=true] - Whether to include the current week's days.
     * @returns {Object} - An object containing the current timestamp, date, time, and optionally the week's days.
     */
    const currentTime = (now = new Date(), week= true) => {
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now) + ', ' + now.getDate();
        const day = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now) + ' ' + now.getFullYear();
        return {
            timestamp: dateToLocalISO(now),
            current_date: `${dayName} ${day}`,
            current_time: formatTime(now),
            current_week_days: week ? currentWeek() : null,
        }
    }


    /**
     * CONTEXT BUILDER
     * Analyzes a schedule of events, threads, and a to-do list, and organizes them into a structured summary.
     * @param {Array} events - An array of event objects.
     * @param {Array} threads - An array of email thread objects.
     * @param {Array} todoList - An array of to-do list items.
     * @param {string} requestType - The type of request (e.g., "operational", "wellness", "ask-llm").
     * @returns {Promise<Object>} - A summary object containing the processed schedule, to-do list, and email summary.
     */
    const contextBuilder = async (events, threads, todoList, requestType) => {
        const now = new Date();
        now.setSeconds(0, 0); // Reset seconds and milliseconds for cleaner comparison

        const getRelativeDayDescription = date => {
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const diffTime = inputDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const dateDescription = date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric'});

            if (diffDays === 0) return dateDescription + " (Today)"
            if (diffDays === 1) return dateDescription + " (Tomorrow)"
            return dateDescription
        };


        // Sort events chronologically
        const sortedEvents = events
            .map(event => ({
                ...event,
                startTime: new Date(event.start),
                endTime: new Date(event.end)
            }))
            .sort((a, b) => a.startTime - b.startTime);

        // Group events by day
        const eventsByDay = {};

        sortedEvents.forEach(event => {
            const day = getRelativeDayDescription(event.startTime);
            if (!eventsByDay[day]) {
                eventsByDay[day] = [];
            }
            eventsByDay[day].push(event);
        });

        // Process each day to include free slots
        const processedSchedule = [];

        Object.entries(eventsByDay).forEach(([day, dayEvents]) => {
            const schedule = [];
            const dayStart = new Date(dayEvents[0].startTime);
            dayStart.setHours(8, 0, 0, 0); // Assume day starts at 8 AM
            const dayEnd = new Date(dayEvents[0].startTime);
            dayEnd.setHours(19, 0, 0, 0); // Assume day ends at 7 PM

            let currentTime = day === "Today" ? new Date(Math.max(now, dayStart)) : dayStart;

            dayEvents.forEach(event => {
                // Add free slot if there's a gap
                if (event.startTime > currentTime) {
                    schedule.push({free : `Free from ${formatTime(currentTime)} to ${formatTime(event.startTime)}`});
                }

                // Add the event
                schedule.push({
                    'event_title' : event.title,
                    'event_id' : event.id,
                    'datetime' : dateToLocalISO(event.startTime),
                    'duration': (event.endTime - event.startTime)/3600000,
                    'provisional' : event.provisional,
                    'timeslot': `from ${formatTime(event.startTime)} to ${formatTime(event.endTime)}`
                });

                currentTime = new Date(Math.max(currentTime, event.endTime));
            });

            // Add final free slot if needed
            if (currentTime < dayEnd) {
                schedule.push({free : `Free from ${formatTime(currentTime)} to ${formatTime(dayEnd)}`});
            }

            processedSchedule.push({
                'day' : day,
                'schedule': schedule
            });
        });


        const processed_todoList = todoList.filter(item => !item.completed).map(t => {
            return {
                id: t.id,
                task: t.title,
                description: t.description,
                priority: t.priority,
            };
        });


        return {
            todo_list: (requestType === 'operational' || requestType === 'wellness') ? null : processed_todoList,
            calendar_summary: (requestType === 'operational' || requestType === 'wellness') ? null : processedSchedule,
            email_summary: requestType === 'ask-llm' ? null :
                threads.map(thread => cleanMessage(thread))
                    .filter(t => {
                        return t.messages[t.messages.length-1]['sender'] !== 'Me'
                    }),

            current_time : currentTime(new Date(), false),
            username: sessionStorage.getItem('username'),
            scenario: sessionStorage.getItem('scenario'),
        };
    }


    /**
     * LIGHT CONTEXT BUILDER
     * Creates a small summary of an event and its associated reply.
     * @param {Object} event - The event object.
     * @param {Object} reply - The reply object.
     * @returns {Object} - A summary object containing the event and reply details.
     */
    const lightContextBuilder = (event, reply) => {
        return {
            event: {
                action: event.action,
                id: event.id,
                title: event.title,
                description: event.description,
                datetime: event.datetime,
                duration: event.duration,
                provisional: event.provisional,
            },
            reply: reply.content,
            current_time : currentTime(new Date(), false),
            username: sessionStorage.getItem('username'),
            scenario: sessionStorage.getItem('scenario'),
        }
    }


    return {
        loading,
        error,
        analyzeSchedule: contextBuilder,
        smallAnalyzeSchedule: lightContextBuilder,
        askLLMSupport,
        queuedAskLLMSupport,
        cleanMessage,
        currentTime,
        formatMessageTime,
        dateToLocalISO,
        localISOToDate
    };
}