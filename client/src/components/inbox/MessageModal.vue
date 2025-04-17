<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <MessageToolbar
          :message="message"
          @toggle-unread="$emit('toggle-unread', message); closeModal"
          @delete-message="$emit('delete-message', message)"
          @close="closeModal"
          @draft-support="$emit('llm-support', 'draft')"
          @event-support="$emit('llm-support', 'event')"
          @todo-support="$emit('llm-support', 'todo')"
      />

      <MessageThread :message="message"
                     :lastMessage="lastMessage"
                     :suggested-actions-list="suggestedActions"
                     :system="system">
      </MessageThread>

      <div class="reply-container">
        <div class="reply-content">
          <button v-if="!replySectionVisible"
                  class="reply-button"
                  :class="{ 'inactive': lastMessageIsFromUser }"
                  :disabled="lastMessageIsFromUser"
                  @click="replySectionVisible = true; scrollToEnd()">
            <span class="material-icons-outlined">reply</span>
            Reply
          </button>
          <button v-if="system === 'sys0'"
                  class="action-button-modal"
                  @click="$emit('change-view', 'calendar')">
            <span class="material-icons-outlined">calendar_today</span>
            Go to Calendar
          </button>
          <button v-if="system === 'sys0'"
                  class="action-button-modal"
                  @click="$emit('change-view', 'todo')">
            <span class="material-icons-outlined">task_alt</span>
            Go to TO-DO List
          </button>
        </div>


        <template v-if="system !== 'sys2'">
          <ReplySection v-if="replySectionVisible"
                        :message="message"
                        :system="system"
                        @send-reply="handleSendReply"
                        @close-reply="replySectionVisible = false">
          </ReplySection>
        </template>
        <template v-else>
          <ReplySectionSys2
                        v-if="replySectionVisible"
                        :message="message"
                        @send-reply="handleSendReply"
                        @close-reply="replySectionVisible = false"
                        @scrollToEnd="scrollToEnd">
          </ReplySectionSys2>
        </template>

      </div>

      <PopUpNewMessage v-if="isPopUpVisible"
                       :unread="unreadMessages"
                       :sender="message.sender"
                       @update="updateFollowUp"
                       @ignore="ignoreFollowUp">
      </PopUpNewMessage>

      <support-section
          ref="supportSection"
          @llm-support="llmSupport"
          @update-suggested-action="updateSuggestedAction"
          :message="message"
          :events="events"
          :system="system"
          @action="doAction"
          @close="closeModal"
          @conflict-event="toConflict"/>

    </div>
  </div>
</template>

<script>
import MessageToolbar from './MessageToolbar.vue'
import MessageThread from './MessageThread.vue'
import ReplySection from './ReplySection.vue'
import PopUpNewMessage from "./PopUpNewMessage.vue";
import SupportSection from "@/components/inbox/SupportSection.vue";
import Loading from "vue-loading-overlay";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import ReplySectionSys2 from "@/components/inbox/ReplySectionSys2.vue";

export default {
  components: {
    ReplySectionSys2,
    Loading,
    MessageToolbar,
    MessageThread,
    ReplySection,
    SupportSection,
    PopUpNewMessage
  },

  props: {
    message: {
      type: Object,
      required: true
    },
    messages : {
      type: Array,
      required: true
    },
    events : {
      type: Array,
      required: true
    },
    loader: {
      type: Boolean,
      required: true
    },
    system: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const lastMessageIsFromUser = computed(() => {
      if (props.message.replies.length === 0) return false
      const filtered = props.message.replies.filter(reply => !reply.unread)
      return filtered[filtered.length - 1].sender === 'Me'
    })

    const replySectionVisible = ref(props.system === 'sys2' && !lastMessageIsFromUser.value);
    const ignoreNewMessages = ref(false);
    const supportSection = ref(null);
    const suggestedActions = ref([]);

    const closeModal = () => {
      emit('close', props.message)
    }

    const handleSendReply = (replyText) => {
      const reply = {
        id: Date.now(),
        sender: 'Me',
        content: replyText,
        timestamp: new Date(),
        unread: false,
      }
      emit('send-reply', props.message, reply)
      scrollToEnd()
      replySectionVisible.value = false

      // Update supportSection in case reply is different from draft in system1
      // emit('send-reply', ...) will call ask-LLM
      if (props.system === 'sys1' && supportSection.value)
        supportSection.value.forceUpdateSuggestedActions();
    }

    const updateFollowUp = () => {
      if (props.system === 'sys2')
        replySectionVisible.value = true

      if (supportSection.value) {
        supportSection.value.forceUpdateSuggestedActions();
      }
      emit('update-followup');
      setTimeout(() => scrollToEnd(), 500)
    }

    const ignoreFollowUp = () => {
      ignoreNewMessages.value = true;
    }


    const llmSupport = () => {
      emit('llm-support');
      setTimeout(() => scrollToEnd(), 500)
    }

    const doAction = (message, action) => {
      if (action['action'] === 'create_draft')
        replySectionVisible.value = true
      emit('action', message, action)
    }

    const toConflict = (event) => {
      emit('conflict-event', event)
    }

    const updateSuggestedAction = (actions) => {
      suggestedActions.value = actions;
    }

    const scrollToEnd = () => {
      nextTick(() => {
        const modalContent = document.querySelector('.modal-content')
        if (modalContent) {
          modalContent.scrollTop = modalContent.scrollHeight
        }
      })
    }

    const unreadMessages = computed(() => {
      return props.message.replies.filter(reply => reply.unread === true);
    })

    const isPopUpVisible = computed(() => {
      return (unreadMessages.value.length > 0) && !ignoreNewMessages.value
    })

    const lastMessage = computed(() => {
      if (props.message.replies.length === 0) return props.message.id
      else {
        const filtered = props.message.replies.filter(reply => !reply.unread)
        return filtered[filtered.length - 1].id
      }
    })



    onMounted(() => {
      scrollToEnd()
      if (!props.message.support)
        llmSupport();
    })

    return {
      replySectionVisible,
      closeModal,
      handleSendReply,
      llmSupport,
      doAction,
      toConflict,
      ignoreFollowUp,
      updateFollowUp,
      unreadMessages,
      ignoreNewMessages,
      isPopUpVisible,
      supportSection,
      lastMessageIsFromUser,
      lastMessage,
      suggestedActions,
      updateSuggestedAction,
      scrollToEnd
    }
  }
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 95%;
  max-height: 90vh;
  border-radius: 8px;
  padding: 24px;
  overflow-y: auto;
  position: relative;
}

.reply-container {
  margin-top: 15px;
}


.reply-content {
  display: flex;
}

.reply-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1a73e8;
  color: white;
  padding: 8px 24px;
  border-radius: 24px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: ease-in-out .05s;
  margin-right: 25px;
}

.action-button-modal {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #e6e6e6;
  color: black;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  margin-right: 5px;
  margin-left: 5px;
  transition: ease-in-out .05s;
}

.action-button-modal:hover {
  transform: scale(1.05);
}


.reply-button:hover {
  transform: scale(1.05);
}

.reply-button.inactive {
  background-color: #c3c3c3;
  color: gray;
  cursor: not-allowed;
  transform: none;
}

.reply-button.inactive:hover {
  transform: none;
}


</style>