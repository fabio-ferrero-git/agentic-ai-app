import {ref} from 'vue';
import axios from 'axios';
import dayColumn from "@/components/calendar/DayColumn.vue";
import {baseURL} from "@/composables/url.js";

/**
 * A composable function to manage a follow-up queue system.
 * This system processes requests sequentially and interacts with an API to generate follow-ups.
 *
 * @returns {Object} - An object containing the `generateFollowUp` function.
 */
export function useFollowUpQueue() {

    // Reactive state to track loading status
    const loading = ref(false);

    // Reactive state to store error messages
    const error = ref(null);

    // Reactive array to hold the queue of requests
    const requestQueue = ref([]);

    // Reactive flag to indicate if the queue is currently being processed
    const isProcessing = ref(false);

    /**
     * Axios instance configured with the base URL and default headers.
     */
    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });


    /**
     * Adds a request to the queue and starts processing the queue if not already in progress.
     *
     * @param {Object} message - The email thread or message content.
     * @param {Object} datetime - The datetime for the follow-up.
     * @param {Object} options - Additional options for the follow-up generation.
     * @returns {Promise} - A promise that resolves with the result of the follow-up generation.
     */
    const enqueue = async (message, datetime, options) => {
        return new Promise((resolve, reject) => {
            requestQueue.value.push({message, datetime, options, resolve, reject });
            processQueue();
        });
    };


    /**
     * Processes the request queue sequentially.
     * If a request is being processed, it waits until the current request is completed.
     */
    const processQueue = async () => {
        if (isProcessing.value || requestQueue.value.length === 0) return;
        isProcessing.value = true;
        const { message, datetime, options, resolve, reject } = requestQueue.value.shift();
        try {
            const result = await llmFollowUpGenerator(message, datetime, options);
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            isProcessing.value = false;
            await processQueue();
        }
    }


    /**
     * Sends a request to the API to generate a follow-up.
     *
     * @param {string} message - The email thread or message content.
     * @param {string} datetime - The datetime for the follow-up.
     * @param {Object} options - Additional options for the follow-up generation.
     * @returns {Promise<Object>} - The API response data.
     * @throws {Error} - Throws an error if the API request fails.
     */
    const llmFollowUpGenerator = async (message, datetime, options) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.post('/follow-up-generator',
                {email_thread: message, datetime: datetime, options: options, username: sessionStorage.getItem('username')});
            return response.data;
        } catch (error) {
            error.value = error.message;
            throw error;
        } finally {
            loading.value = false;
        }
    }


    /**
     * Public function to enqueue a follow-up generation request.
     *
     * @param {Object} message - The email thread or message content.
     * @param {Object} datetime - The datetime for the follow-up.
     * @param {Object} options - Additional options for the follow-up generation.
     * @returns {Promise} - A promise that resolves with the result of the follow-up generation.
     */
    const generateFollowUp = async (message, datetime, options) => {
        return enqueue(message, datetime, options);
    }


    return {
        generateFollowUp
    }
}