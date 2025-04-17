<template>
  <div class="message-toolbar">
    <div class="toolbar-left">
      <button class="icon-button" @click="$emit('toggle-unread')">
        <span class="material-icons-outlined">
          {{ !message.unread ? 'mark_email_read' : 'mark_email_unread' }}
        </span>
      </button>
      <button class="icon-button" @click="$emit('delete-message')">
        <span class="material-icons-outlined">delete</span>
      </button>
    </div>
    <div class="toolbar-right">
      <button class="icon-button" @click="$emit('close')">
        <span class="material-icons-outlined">close</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.message-toolbar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f4;
}

.icon-button {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  color: #5f6368;
  cursor: pointer;
}

.icon-button:hover {
  background: #f1f3f4;
}

.ai-support {
  background-color: #34a853;
}
</style>