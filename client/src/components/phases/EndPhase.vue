<template>
  <div class="phase">
    <h2 class="h2b">Thank You!</h2>
    <h3>Thank you for participating in our study. Your feedback is invaluable in helping us improve our interface.</h3>
    <h3>If you have any questions or concerns, please contact us at <a href="mailto:study@example.com">study@example.com</a>.</h3>
    <div class="divider">
      <h3><span>Important:</span> To complete your submission, click on the button below: you will be redirected to the Prolific website. If you do not complete this step, we will not be able to pay you.</h3>
      <input class="divider" type="button" value="Send" id="complete" @click="complete">
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndPhase',
  emits: ['completed'],
  methods: {
    complete() {
      this.$emit('completed')
      document.getElementById('complete').disabled = true
      document.getElementById('complete').value = 'Finalizing, do not close the page...'
    }
  }
}
</script>

<style scoped>
.divider {
  margin-top: 30px;
}
.divider span {
  font-weight: bold;
}
</style>
