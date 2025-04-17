<template>
  <div class="calendar-container">
    <CalendarHeader
        :weekStart="weekStart"
        :weekEnd="weekEnd"
        @create-event="showCreateModal = true"
    />
    <CalendarBody
        ref="calendarBodyRef"
        :weekDays="weekDays"
        :events="events"
        @grid-click="handleGridClick"
        @open-event="openEventModal"
        @to-parent-email="toParentEmail"
    />
    <EventModal
        v-if="showCreateModal || editingEvent"
        :event="editingEvent"
        :eventForm="eventForm"
        :events="events"
        :isAction="isLLMActionEvent"
        @close="closeModal"
        @save="saveCalendarEvent"
        @delete="deleteEvent"
    />
  </div>
</template>

<script>
import CalendarHeader from './CalendarHeader.vue'
import CalendarBody from './CalendarBody.vue'
import EventModal from './EventModal.vue'
import { useCalendarLogic } from '@/composables/useCalendarLogic.js'
import {onMounted, ref} from "vue";

export default {
  components: {
    CalendarHeader,
    CalendarBody,
    EventModal
  },

  props: {
    events: {
      type: Array,
      required: true
    },
    selectedEvent: {
      type: Object,
      required: false
    }
  },

  setup(props, { emit }) {
    const {
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
    } = useCalendarLogic(props, emit)

    const isLLMActionEvent = ref(null)
    const calendarBodyRef = ref(null)

    const saveCalendarEvent = (eventData, actor='user') => {
      saveEvent(eventData, props.events.length, actor)
      isLLMActionEvent.value = null;
    }

    const toParentEmail = (event) => {
      emit('to-parent-email', event)
    }

    onMounted(() => {
      setTimeout(() => {
        props.events.forEach(event => event.highlighted = false)
      }, 3000)



      if (props.selectedEvent) {
        if (props.selectedEvent.start) {
          const h = props.selectedEvent.start.split('T')[1].split(':')[0]
          calendarBodyRef.value.scrollToTime(h)
        }
        if (props.selectedEvent['open_modal']) {
          openEventModal(props.selectedEvent)
          isLLMActionEvent.value = true;
          props.selectedEvent['open_modal'] = false;
        }
      }
    })

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
      saveCalendarEvent,
      toParentEmail,
      isLLMActionEvent,
      calendarBodyRef
    }
  }
}
</script>

<style scoped>
.calendar-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
</style>
