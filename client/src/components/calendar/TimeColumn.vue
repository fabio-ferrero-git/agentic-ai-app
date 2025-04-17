<template>
  <div class="time-column">
    <div class="time-header"></div>
    <div class="time-slots">
      <div v-for="hour in 24" :key="hour-1" class="time-slot">
        {{ formatHour(hour - 1) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const formatHour = (hour) => {
      return `${hour.toString().padStart(2, '0')}:00`
    }

    return { formatHour }
  }
}
</script>

<style scoped>
.time-column {
  position: sticky;
  left: 0;
  z-index: 2;
  background: white;
  width: 60px;
}

.time-header {
  height: 50px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 3;
  border-bottom: 1px solid #e1e1e1;
}

.time-slots {
  height: calc(24 * 60px);
}

.time-slot {
  height: 100px;
  padding-right: 8px;
  text-align: right;
  color: #70757a;
  font-size: 12px;
  /* Border left (hour slots) */
  border-bottom: 1px solid #e1e1e1;;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
