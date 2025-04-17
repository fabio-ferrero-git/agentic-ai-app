<template>
  <div class="calendar-header">
    <div class="current-week">
      {{ formatDateRange(weekStart, weekEnd) }}
    </div>
    <button @click="$emit('create-event')" class="create-event-btn">
      <i class="material-icons">add</i> Create
    </button>
  </div>
</template>

<script>
import { formatDate } from '../../composables/dateFormatter'

export default {
  props: {
    weekStart: Date,
    weekEnd: Date
  },
  setup() {
    const formatDateRange = (start, end) => {
      return `${formatDate(start)} - ${formatDate(end)}`
    }

    return { formatDateRange }
  }
}
</script>

<style scoped>
.calendar-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
}

.current-week {
  font-size: 16px;
  color: #3c4043;
}

.create-event-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
