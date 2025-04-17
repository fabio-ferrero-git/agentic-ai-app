<template>
  <div class="phase">
    <h2><span class="h2b">Perceived Workload</span> Evaluation</h2>
    <grid-questionnaire :tlx="true" @answered-questions="onAnsweredQuestions"
                        description="Please answer the following questions about the perceived workload.
                        Please note that you cannot go back once you click on 'Continue'.">
      <div>How mentally demanding was the task?</div>
      <div>How physically demanding was the task?</div>
      <div>How hurried or rushed was the pace of the task?</div>
      <div>How successful were you in accomplishing what you were asked to do?</div>
      <div>How hard did you have to work to accomplish your level of performance?</div>
      <div>How insecure, discouraged, irritated, stressed, and annoyed were you?</div>
    </grid-questionnaire>
  </div>
</template>
<script>
import GridQuestionnaire from "@/components/GridQuestionnaire.vue";
export default {
  name: 'NasaTLX',
  components: {
    GridQuestionnaire
  },
  methods: {
    onAnsweredQuestions(data) {
      this.$emit('log-activity', 'tlx_questionnaire', data[0])
      this.$emit('next-phase')
    }
  }
}
</script>

<style scoped>
.h2b {
  font-weight: bold;
}
</style>