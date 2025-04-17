<template>
  <div class="calendar-body">
    <div class="scrollable-container" ref="scrollableContainerRef">
      <TimeColumn />
      <div class="calendar-grid">
        <DayColumn
            v-for="day in weekDays"
            :key="day.date"
            :day="day"
            :events="getEventsForDay(day.date)"
            @grid-click="(e) => $emit('grid-click', e, day.date)"
            @open-event="$emit('open-event', $event)"
            @to-parent-email="toParentEmail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import TimeColumn from './TimeColumn.vue'
import DayColumn from './DayColumn.vue'

export default {
  components: {
    TimeColumn,
    DayColumn
  },
  props: {
    weekDays: Array,
    events: Array
  },
  setup(props, { emit }) {
    const scrollableContainerRef = ref(null)

    const getEventsForDay = (date) => {
      return props.events.filter(event => {
        const eventDate = new Date(event.start)
        return eventDate.toDateString() === date.toDateString()
      })
    }

    onMounted(() => {
      // scrollTo8AM()
      scrollToTime(new Date().getHours()-1)
    })

    const scrollTo8AM = () => {
      if (scrollableContainerRef.value) {
        // Calculate the scroll position for 8 AM
        // Assuming each hour is 60px high and the day starts at 00:00
        const scrollPosition = 9 * 100 // 8 hours * 80px per hour
        scrollableContainerRef.value.scrollTop = scrollPosition
      }
    }

    const scrollToTime = (time) => {
      if (scrollableContainerRef.value) {
        scrollableContainerRef.value.scrollTop = (time - 1) * 100
      }
    }

    const toParentEmail = (event) => {
      emit('to-parent-email', event)
    }

    return { scrollableContainerRef, getEventsForDay, toParentEmail, scrollToTime }
  }
}


</script>
<style scoped>
.calendar-body {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.scrollable-container {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  min-width: 0;
}
</style>
