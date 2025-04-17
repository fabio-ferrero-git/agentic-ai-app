<template>
  <div class="inbox-container" @click="messages.forEach(m => {m.lastClicked = false; })">
    <MessageList
        :messages="messages"
        :events="events"
        :todos="todos"
        @open-message="openMessage"
        @action="(action, id) => this.$emit('action', action, id)"
    />
    <transition name="modal-fade">
    <MessageModal
        v-if="selectedMessage"
        :message="selectedMessage"
        :messages="messages"
        :events="events"
        :loader="$props.loader"
        :system="system"
        @close="closeModal"
        @toggle-unread="toggleUnread"
        @delete-message="deleteMessage"
        @send-reply="sendReply"
        @llm-support="llmSupport"
        @action="doAction"
        @conflict-event="toConflict"
        @update-followup="$emit('update-followup', selectedMessage, true)"
        @ignore-followup="$emit('ignore-followup')"
        @change-view="(view) => $emit('change-view', view)"
    />
    </transition>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import MessageList from './MessageList.vue'
import MessageModal from './MessageModal.vue'

export default {

  components: {
    MessageList,
    MessageModal
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
    selectedMsg : {
      type: Object,
      required: false
    },
    fromOperational : {
      type: Boolean,
      default: false
    },
    loader : {
      type: Boolean,
      required: true
    },
    system: {
      type: String,
      required: true
    }
  },

  setup(props, {emit}) {
    const selectedMessage = ref(props.selectedMsg ? props.selectedMsg : null)

    const openMessage = (message, fromItem=false) => {
      if (selectedMessage.value === message) return;
      selectedMessage.value = message
      setLastClicked(selectedMessage.value)
      handleMessageOpen(message, fromItem)
    }

    const setLastClicked = (message) => {
      props.messages.forEach((m) => m.lastClicked = false)
      message.lastClicked = true
    }

    const closeModal = (message) => {
      selectedMessage.value = null
      emit('close-modal', message)
    }

    const toggleUnread = (message) => {
      message.unread = !message.unread
      emit('toggle-unread', message)
    }

    const deleteMessage = (message) => {
      emit('message-delete', message)
      closeModal(message)
    }

    const sendReply = (message, reply) => {
      message.replies.push(reply)
      emit('message-reply', message, reply)
      if (props.system === 'sys0') {
        closeModal(message)
      }
    }

    const llmSupport = async () => {
      // Updated: do not ask AI assistant on message open
      // emit('llm-support', selectedMessage.value)
    }

    const doAction = (message, action) => {
      emit('action_' + action.action, action, message)
    }

    const handleMessageOpen = (message, fromItem=false) => {
      if (message)
        emit('message-click', message, fromItem)
    }

    const toConflict = (event) => {
      emit('conflict-event', event)
    }


    watch(
        () => props.selectedMsg,
        (newValue, _) => {
          if (!newValue) {
            const lastSelected = props.messages.find((m) => m.lastClicked)
            if (lastSelected) {
              selectedMessage.value = lastSelected;
            }
          }
          else {
            selectedMessage.value = newValue;
            handleMessageOpen(newValue, props.fromOperational);
            setLastClicked(selectedMessage.value);
          }
        },
        {
          immediate: true  // Trigger on component creation
        }
    )

    return {
      selectedMessage,
      openMessage,
      closeModal,
      toggleUnread,
      deleteMessage,
      sendReply,
      llmSupport,
      doAction,
      toConflict
    }
  },

}
</script>

<style scoped>
.inbox-container {
  background: #ffffff;
  font-family: 'Roboto', sans-serif;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>