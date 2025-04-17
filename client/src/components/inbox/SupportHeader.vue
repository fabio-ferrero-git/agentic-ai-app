<template>
  <div class="ask-support-container">
    <span class="material-icons">assistant</span>
    <h4 class="ask-support">
      <span style="font-weight: bold">AI Assistant</span>: {{text}}
    </h4>
  </div>
</template>


<script>
export default {
  name: 'SupportHeader',
  props: {
    text : {
      type: String,
      required: true
    }
  },
}
</script>


<style scoped>
.ask-support-container {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 10px 10px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.ask-support {
  margin-bottom: 0 !important;
}
</style>