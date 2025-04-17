<template>
  <div class="phase">
    <h2 class="h2b">Please answer the following questions about yourself</h2>
    <grid-questionnaire @answered-questions="onAnsweredQuestions" description='Please note that you cannot go back once you click on "Continue".'>
      <div>I'd rather run my own business and make my own mistakes than listen to someone else's orders.</div>
      <div>I like to get a good idea of what a job is all about before I begin.</div>
      <div>When I see a problem I prefer to do something about it rather than sit by and let it continue.</div>
      <div>When it comes to orders, I would rather give them than receive them.</div>
      <div>I wish I could push many of life's daily decisions off on someone else.</div>
      <div>When driving, I try to avoid putting myself in a situation where I could be hurt by someone else's mistake.</div>
      <div>I prefer to avoid situations where someone else has to tell me what it is I should be doing.</div>
      <div>There are many situations in which I would prefer only one choice rather than having to make a decision.</div>
      <div>I like to wait and see if someone else is going to solve a problem so that I don't have to be bothered by it.</div>

      <!-- TiA Pre-Task questions -->
      <div>One should be careful with unfamiliar automated systems</div>
      <div>I rather trust a system than I mistrust it</div>
      <div>Automated systems generally work well</div>
    </grid-questionnaire>
  </div>
</template>

<script>
import GridQuestionnaire from '../GridQuestionnaire.vue'

export default {
  name: 'TiAPreTask',
  components: {
    GridQuestionnaire
  },
  emits: ['log-activity', 'next-phase'],
  methods: {
    onAnsweredQuestions(data) {
      this.$emit('log-activity', 'tia_pre_task', data[0])
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
</style>