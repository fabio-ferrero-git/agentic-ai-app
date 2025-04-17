<template>
  <div class="phase">
    <h2><span class="h2b">Interface</span> Evaluation</h2>
    <grid-questionnaire @answered-questions="onAnsweredQuestions" description="Please answer the following questions about the interface you just explored. Please note that you cannot go back once you click on 'Continue'.">
      <div>The proactive support in the Mail section improved my <span class="b">email management</span> (e.g. drafting emails).</div>
      <div>The proactive support for Calendar management (e.g. automatically creating events <span v-if="system==='sys1'">by using the AI assistant</span>) helped me schedule my <span class="b">events</span> effectively.</div>
      <div>The proactive support for Todo management (e.g. automatically creating tasks <span v-if="system==='sys1'">by using the AI assistant</span>) helped me manage my <span class="b">tasks</span> efficiently.</div>
    </grid-questionnaire>
  </div>
</template>

<script>
import GridQuestionnaire from '../GridQuestionnaire.vue'

export default {
  name: 'GridQuestionnairePhase',
  components: {
    GridQuestionnaire
  },
  data() {
    return {
      system : sessionStorage.getItem('sys'),
    }
  },
  emits: ['log-activity', 'next-phase'],
  methods: {
    onAnsweredQuestions(data) {
      this.$emit('log-activity', 'grid_questionnaire', data[0])
      this.$emit('log-activity', 'attention_check_passed', {'passed': data[1]})
      this.$emit('next-phase')
    }
  }
}
</script>

<style scoped>
.h2b, .b {
  font-weight: bold;
}
.it {
  font-style: italic;
}
</style>