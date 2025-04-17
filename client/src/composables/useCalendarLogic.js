import { ref, computed } from 'vue'
import { formatDate } from './dateFormatter'
import consentPhase from "@/components/phases/ConsentPhase.vue";
import {useApi} from "@/composables/useApi.js";

/**
 * Calendar management composable that handles calendar logic for a weekly view
 * @param {Object} props - The component props
 * @param {Function} emit - Function to emit events to parent component
 * @returns {Object} Calendar state and methods
 */
export function useCalendarLogic(props, emit) {
    const api = useApi();
    const weekStart = ref(new Date())

    /**
     * The date of the last day of the displayed week
     * @type {import('vue').ComputedRef<Date>}
     */
    const weekEnd = computed(() => {
        const end = new Date(weekStart.value)
        end.setDate(end.getDate() + 6)
        return end
    })

    const showCreateModal = ref(false)
    const editingEvent = ref(null)
    const eventForm = ref({ title: '', start: '', end: '', id: '', provisional: false})

    /**
     * Array of days in the current week with their respective dates
     * @type {import('vue').ComputedRef<Array<{date: Date}>>}
     */
    const weekDays = computed(() => {
        const days = []
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart.value)
            date.setDate(date.getDate() + i)
            days.push({ date })
        }
        return days
    })

    /**
     * Handles a click on the calendar grid to create a new event
     * @param {MouseEvent} event - The mouse event
     * @param {Date} date - The date of the clicked day
     */
    const handleGridClick = (event, date) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const y = event.clientY - rect.top
        const hours = Math.floor(y / 100)
        const minutes = Math.floor((y % 100) / 30) * 30
        const newDate = new Date(date)
        newDate.setHours(hours, minutes, 0, 0)
        eventForm.value = {
            title: '',
            start : api.dateToLocalISO(newDate),
            end: api.dateToLocalISO(new Date(newDate.getTime() + (60 * 60 * 1000))),
            provisional: false
        }
        showCreateModal.value = true
    }

    /**
     * Opens the event editing modal for an existing event
     * @param {Object} event - The event to edit
     */
    const openEventModal = (event) => {
        editingEvent.value = event
        eventForm.value = {
            id: event.id,
            title: event.title,
            start: formatDateTimeForInput(event.start),
            end: formatDateTimeForInput(event.end || event.start),
            highlighted : event.highlighted,
            parent_message : event.parent_message,
            provisional: event.provisional
        }
        emit('event-click', event)
    }

    /**
     * Formats a date string for use in datetime-local input fields
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date string
     */
    const formatDateTimeForInput = (dateString) => {
        return dateString
    }

    /**
     * Closes the event modal and resets the form
     * @param {Object} [message] - Optional message to emit with the close event
     */
    const closeModal = (message) => {
        showCreateModal.value = false
        editingEvent.value = null
        eventForm.value = { title: '', start: '', end: '', provisional: false}
        emit('close-event', message)
    }

    /**
     * Saves a new or edited event
     * @param {Object} eventData - The event data to save
     * @param {string|number} id - A unique identifier for new events
     * @param {string} [actor='user'] - Who initiated the event creation (user or system)
     */
    const saveEvent = (eventData, id, actor='user') => {
        const event = {
            ...eventData,
            id: editingEvent.value?.id || 'EVENT_' + id
        }
        emit(editingEvent.value ? 'update-event' : 'create-event', event, actor)
        closeModal(event)
        setTimeout(() => {
            event.highlighted = false
        }, 2500)
    }

    /**
     * Deletes an event
     * @param {Object} event - The event to delete
     */
    const deleteEvent = (event) => {
        emit('delete-event', event)
        closeModal(event)
    }

    /**
     * CONFLICT FINDER
     * Checks if an event overlaps with any other events in the collection
     * @param {Array<Object>} events - Collection of events to check against
     * @param {Object} event - The event to check for overlaps
     * @returns {Array<Object>|null} Array of overlapping events or null if no overlaps
     */
    const conflictFinder = (events, event) => {
        const overlaps =  events.filter(otherEvent => {
            if (otherEvent === event) return false
            if (otherEvent.title === event.title) return false

            const eventStart = new Date(event.start)
            const eventEnd = new Date(event.end || event.start)
            const otherStart = new Date(otherEvent.start)
            const otherEnd = new Date(otherEvent.end || otherEvent.start)

            return eventStart < otherEnd && eventEnd > otherStart
        })
        return overlaps.length > 0 ? overlaps : null
    }

    /**
     * SINGLE CONFLICT FINDER
     * Checks if two events overlap
     * @param {Object} event1 - First event
     * @param {Object} event2 - Second event
     * @returns {boolean} True if events overlap
     */
    const singleConflictFinder = (event1, event2) => {
        const event1Start = new Date(event1.start)
        const event1End = new Date(event1.end || event1.start)
        const event2Start = new Date(event2.start)
        const event2End = new Date(event2.end || event2.start)

        return event1Start < event2End && event1End > event2Start
    }

    return {
        weekStart,
        weekEnd,
        weekDays,
        showCreateModal,
        editingEvent,
        eventForm,
        handleGridClick,
        openEventModal,
        closeModal,
        saveEvent,
        deleteEvent,
        formatDateTimeForInput,
        eventOverlap: conflictFinder,
        singleEventOverlap: singleConflictFinder
    }
}
