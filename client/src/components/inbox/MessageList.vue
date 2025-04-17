<template>
  <div class="message-list">
    <EmptyState v-if="!messages.length"
                textPrimary="Your inbox is empty"
                textSecondary="No messages to display"
                icon="inbox"/>
    <MessageItem
        v-else
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :connectedEvents="events"
        :connectedTodos="todos"
        @action="(action, id) => this.$emit('action', action, id)"
        @click-item="messageClick(message)"
    />
  </div>
</template>

<script>
import EmptyState from '../EmptyState.vue'
import MessageItem from './MessageItem.vue'

export default {
  components: {
    EmptyState,
    MessageItem
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    events: {
      type: Array,
      required: true
    },
    todos: {
      type: Array,
      required: true
    },
  },

  methods : {
    messageClick(message) {
      this.$emit('open-message', message, true)
    }
  },
}
</script>

<style scoped>
.message-list {
  overflow-y: auto;
  padding-top: 8px;
  width: 100%;
}
</style>