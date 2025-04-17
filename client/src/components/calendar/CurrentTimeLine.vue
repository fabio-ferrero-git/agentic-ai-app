<template>
  <div class="current-time-line" :style="getCurrentTimeStyle()"></div>
</template>

<script>
export default {
  setup() {
    const getCurrentTimeStyle = () => {
      const now = new Date()
      const top = `${(now.getHours() + now.getMinutes() / 60) * 100}px`
      return { top }
    }

    return { getCurrentTimeStyle }
  }
}
</script>

<style scoped>
.current-time-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #ea4335;
  z-index: 2;
}
</style>
