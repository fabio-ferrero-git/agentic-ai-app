<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div
          class="progress-fill"
          :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    currentPhase: {
      type: String,
      required: true
    },
    phases: {
      type: Array,
      required: true
    }
  },
  computed: {
    currentStep() {
      return this.phases.indexOf(this.currentPhase) + 1
    },
    totalSteps() {
      return this.phases.length
    },
    progress() {
      return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100
    }
  }
}
</script>

<style scoped>
.progress-container {
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.progress-label {
  margin-top: 8px;
  text-align: right;
  font-size: 14px;
  color: #666;
}
</style>