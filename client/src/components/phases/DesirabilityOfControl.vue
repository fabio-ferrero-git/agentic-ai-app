<template>
  <div class="phase-desirability_of_control">
    <h2 class="h2b">Please answer the following questions about yourself</h2>
    <grid-questionnaire @answered-questions="onAnsweredQuestions" description='Please note that you cannot go back once you click on "Continue".'>
      <div>I prefer a job where I have a lot of control over what I do and when I do it.</div>
      <div>I enjoy political participation because I want to have as much of a say in running government as possible.</div>
      <div>I try to avoid situations where someone else tells me what to do.</div>
      <div>I would prefer to be a leader rather than a follower.</div>
      <div>I enjoy being able to influence the actions of others.</div>
      <div>I am careful to check everything on an automobile before I leave for a long trip.</div>
      <div>Others usually know what is best for me.</div>
      <div>I enjoy making my own decisions.</div>
      <div>I enjoy having control over my own destiny.</div>
      <div>I would rather someone else took over the leadership role when I'm involved in a group project.</div>
      <div>I consider myself to be generally more capable of handling situations than others are.</div>
    </grid-questionnaire>
  </div>
</template>

<script>
import GridQuestionnaire from '../GridQuestionnaire.vue'

export default {
  name: 'DesirabilityOfControl',
  components: {
    GridQuestionnaire
  },
  emits: ['log-activity', 'next-phase'],
  methods: {
    onAnsweredQuestions(data) {
      this.$emit('log-activity', 'desirability_of_control', data[0])
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

.phase-desirability_of_control {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>