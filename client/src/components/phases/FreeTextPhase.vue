<template>
  <div class="phase">
    <h2 class="h2b">Additional Feedback</h2>
    <div>
      Any comment (either positive or negative) is very much appreciated.<br>
      Leaving a negative comment will not influence the decision on your submission 😃.
    </div>
    <div class="feedback-form">
      <div class="form-group">
        <label for="useful">What aspects of the interface did you find most useful?</label>
        <textarea id="useful" v-model="answers.useful" rows="4"></textarea>
      </div>
      <div class="form-group">
        <label for="improvements">What aspects could be improved?</label>
        <textarea id="improvements" v-model="answers.improvements" rows="4"></textarea>
      </div>
      <button class="btn-primary" @click="submitFeedback">Submit Feedback</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FreeTextPhase',
  emits: ['log-activity', 'next-phase'],
  data() {
    return {
      answers: {
        useful: '',
        improvements: ''
      }
    }
  },
  methods: {
    submitFeedback() {
      this.$emit('log-activity', 'freeTextAnswers', this.answers)
      this.$emit('next-phase')
    }
  }
}
</script>
<style scoped>
.feedback-form {
  max-width: 600px;
  margin: 30px auto 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: medium;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

</style>
