<template>
  <div class="phase-tia">
    <h2 class="h2b">Trust in Automated Systems</h2>
    <grid-questionnaire @answered-questions="onAnsweredQuestions" description='Please answer the following questions about the <span style="font-weight:bold;">Trust in Automated Systems</span>. Please note that you cannot go back once you click on "Continue".'>
      <div>The system is capable of interpreting situations correctly</div>
      <div>The system works reliably</div>
      <div>A system malfunction is likely</div>
      <div>The system is capable of taking over complicated tasks</div>
      <div>The system might make sporadic errors</div>
      <div>I am confident about the system's capabilities</div>
      <div>The system state was always clear to me</div>
      <div>The system reacts unpredictably</div>
      <div>I was able to understand why things happened</div>
      <div>It's difficult to identify what the system will do next</div>
      <div>I already know similar systems</div>
      <div>I have already used similar systems</div>
      <div>The developers are trustworthy</div>
      <div>The developers take my well-being seriously</div>
      <div>I trust the system</div>
      <div>I can rely on the system</div>
    </grid-questionnaire>
  </div>
</template>

<script>
import GridQuestionnaire from '../GridQuestionnaire.vue'

export default {
  name: 'TiAPostTask',
  components: {
    GridQuestionnaire
  },
  emits: ['log-activity', 'next-phase'],
  methods: {
    onAnsweredQuestions(data) {
        this.$emit('log-activity', 'tia_post_task', data[0])
      this.$emit('log-activity', 'attention_check_passed', {'passed': data[1]})
      this.$emit('next-phase')
    }
  }
}
</script>

<style scoped>
.h2b {
  font-weight: bold;
}

.phase-tia {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>