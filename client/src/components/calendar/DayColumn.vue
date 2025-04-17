<template>
  <div class="day-column">
    <div class="day-header">
      {{ formatDay(day.date) }}
    </div>
    <div class="day-grid" @click="$emit('grid-click', $event)">
      <div v-for="hour in 24" :key="hour" class="hour-slot"></div>
      <EventItem
          v-for="event in events"
          :key="event.id"
          :event="event"
          :events="events"
          @to-parent-email="toParentEmail"
          @click.stop="$emit('open-event', event);"
      />
      <CurrentTimeLine v-if="isToday(day.date)" />
    </div>
  </div>
</template>

<script>
import EventItem from './EventItem.vue'
import CurrentTimeLine from './CurrentTimeLine.vue'

export default {

  components: {
    EventItem,
    CurrentTimeLine
  },
  props: {
    day: Object,
    events: Array
  },
  setup(props, { emit }) {
    const formatDay = (date) => {
      return new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
    }

    const isToday = (date) => {
      const today = new Date()
      return date.toDateString() === today.toDateString()
    }

    const toParentEmail = (event) => {
      emit('to-parent-email', event)
    }

    return { formatDay, isToday, toParentEmail }
  }
}
</script>

<style scoped>
.day-column {
  min-width: 130px;
}

.day-header {
  height: 50px;
  padding: 8px;
  text-align: center;
  /* Day borders (week days) */
  border-bottom: 1px solid #e1e1e1;
  border-left: 1px solid #e1e1e1;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}

.day-grid {
  height: calc(24 * 85px);
  position: relative;
}

.hour-slot {
  height: 100px;
  /* Grid border (cells) */
  border-left: 1px solid #e1e1e1;;
  border-bottom: 1px solid #e1e1e1;;
}
</style>
