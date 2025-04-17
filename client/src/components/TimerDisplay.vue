<template>
  <div class="timer-display" :style="{ 'background-color': timerColor }">
    Timer: {{ toMs }}
  </div>
</template>

<script>
export default {
  props : {
    timerConfig : {
      type: Object,
      required: true,
    }
  },

  mounted() {
    this.$emit('on-start')
  },

  computed: {
    timerColor() {
      return this.timerConfig.getState().current < this.timerConfig.getState().duration*.2 ?
          '#ffc8c8' : this.timerConfig.getState().current > this.timerConfig.getState().duration*.5 ? '#bdecbe' : '#ffe7b4'
    },
    toMs() {
      return ~~(this.timerConfig.getState().current / 60) + ':' +
          (this.timerConfig.getState().current%60 < 10 ? '0'+this.timerConfig.getState().current%60 : this.timerConfig.getState().current%60)
    },

    state() {
      return this.timerConfig.getState().current;
    },
  },

  watch: {
    state(newValue) {
      if (newValue === 0) {
        this.$emit('on-end')
      }
    }
  }
}
</script>

<style scoped>
.timer-display {
  position: fixed;
  top: 20px;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #9c9c9c;
  font-size: 13px;
  font-family: monospace;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
