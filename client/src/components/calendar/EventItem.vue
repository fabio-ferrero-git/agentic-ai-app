<template>
  <div>
    <div v-if="showTooltip" :style="getTooltipStyle(event)"
         @mouseenter="showTooltip = true"
         @mouseleave="showTooltip = false">
      <div class="event-title">{{ event.title }}</div>
      <div class="event-time">
        {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
      </div>
      <div v-if="event['provisional'] && !eventItemIsFullWidth" class="blue">(Provisional)</div>
    </div>
  <div
      class="event-item"
      :class="{'highlighted': event['highlighted'] === true}"
      :style="getEventStyle(event)"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false">
    <div v-if="eventItemIsFullWidth" class="event-time">{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</div>
    <div class="event-title">{{ event.title }}</div>

    <div v-if="event['provisional'] && eventItemIsFullWidth" class="blue">(Provisional)</div>

    <div class="back-to-parent">
      <button v-if="event['parent_message']" class="icon-button back-to-parent-btn" @click.stop="toParentEmail">
        <span class="material-icons back-to-parent-icon">email</span>
        <span class="back-to-email" v-if="event['parent_message'] && eventItemIsFullWidth">Back to Email</span>
      </button>
    </div>
  </div>
  </div>
</template>


<script>
import {ref} from "vue";

export default {
  props: {
    event: Object,
    events: Array,
  },

  setup(props, { emit }) {

    const showTooltip = ref(false)
    const eventItemIsFullWidth = ref(true)

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    const findOverlappingEvents = () => {
      return props.events.filter(otherEvent => {
        if (otherEvent === props.event) return false

        const eventStart = new Date(props.event.start)
        const eventEnd = new Date(props.event.end || props.event.start)
        const otherStart = new Date(otherEvent.start)
        const otherEnd = new Date(otherEvent.end || otherEvent.start)

        return eventStart < otherEnd && eventEnd > otherStart
      })
    }



    const getTooltipStyle = (event) => {
      const start = new Date(event.start)
      const overlappingEvents = findOverlappingEvents()
      const totalOverlapping = overlappingEvents.length + 1
      const sortedEvents = [...overlappingEvents, event].sort((a, b) => {
        const timeA = new Date(a.start).getTime()
        const timeB = new Date(b.start).getTime()
        return timeA === timeB ? ((a.id || '') < (b.id || '') ? -1 : 1) : timeA - timeB
      })
      const index = sortedEvents.indexOf(event)
      const left = `${(index * 100) / totalOverlapping}%`

      let fullWidth = (100/totalOverlapping)
      fullWidth = (fullWidth !== 100 && event['provisional']) ? 85 : 60
      const top = `${((start.getHours() + start.getMinutes() / 60) * 100) - fullWidth}px` // Position above event

      return {
        position: 'absolute',
        top,
        left,
        backgroundColor: '#f1f1f1',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 1000,
        width: `max-content`
      }
    }

    const getEventStyle = (event) => {
      const start = new Date(event.start)
      const end = new Date(event.end || start)
      const top = `${(start.getHours() + start.getMinutes() / 60) * 100}px`
      const height = `${((end - start) / (1000 * 60 * 60)) * 100}px`

      const overlappingEvents = findOverlappingEvents()
      const totalOverlapping = overlappingEvents.length + 1

      // Sort overlapping events by start time and ID to ensure consistent ordering
      const sortedEvents = [...overlappingEvents, event].sort((a, b) => {
        const timeA = new Date(a.start).getTime()
        const timeB = new Date(b.start).getTime()
        if (timeA === timeB) {
          // If times are equal, use the event ID or some unique identifier
          return (a.id || '') < (b.id || '') ? -1 : 1
        }
        return timeA - timeB
      })

      // Find index of current event in sorted array
      const index = sortedEvents.indexOf(event)
      const width = `${100 / totalOverlapping}%`
      const left = `${(index * 100) / totalOverlapping}%`
      const backgroundColor = event['provisional'] ? 'white' : '#3e82dd'
      const color = event['provisional'] ? 'black' : 'white'
      const border = `${event['provisional'] ? '3' : '1'}px solid ${event['provisional'] ? '#1a73e8' : 'white'}`

      eventItemIsFullWidth.value = (100/totalOverlapping) === 100

      return {
        top,
        height,
        width,
        left,
        position: 'absolute',
        backgroundColor,
        border: border,
        color: color,
      }
    }

    const getTimeStamp = (datetime) => {
      return new Date(datetime).getHours() + ':' +  new Date(datetime).getMinutes()
    }

    const toParentEmail = () => {
      emit('to-parent-email', props.event)
    }

    return {
      formatTime,
      getEventStyle,
      getTimeStamp,
      getTooltipStyle,
      showTooltip,
      toParentEmail,
      eventItemIsFullWidth
    }
  }
}
</script>

<style scoped>
.event-item {
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  border: solid 0.5px white;
}

.highlighted {
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
}


.event-time {
  font-size: 11px;
  opacity: 0.9;
}

.event-title {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.back-to-email {
  white-space: nowrap;
  font-size: 12px;
}

.icon-button {
  border: none;
  /*padding: 4px 8px;*/
  cursor: pointer;
  border-radius: 4px;
  color: black;
  background-color: #ffd17e;
  transition: ease-out 0.1s;
}

.icon-button:hover {
  color: black;
  transform: scale(1.05);
  background-color: #ffc65e;
}

.back-to-parent {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.back-to-parent-icon {
  font-size: 140%;
}

.back-to-parent-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 1px 2px 5px #7a7a7a;
}

.blue {
  color: #1a73e8;
}

.prov-big {
  font-size: medium;
}

</style>
