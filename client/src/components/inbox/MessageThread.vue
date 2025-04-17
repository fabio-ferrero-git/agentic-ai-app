<template>
  <div class="message-thread">

    <div :style="{borderColor: borderColor(message['sender'])}" class="single-msg-container">
      <div style="width: 100%">
        <div class="message-header">
          <div class="sender-info">
            <div class="avatar" :style="{ backgroundColor: avatarColor(message['sender']) }">
              {{ message['sender'].charAt(0).toUpperCase() }}
            </div>
            <div class="sender-details">
              <div class="sender-name">{{ message.sender }}</div>
              <div class="sender-address">to me</div>
            </div>
            <div class="message-date">{{ formatDate(message['timestamp']) }}</div>
          </div>
        </div>
        <div class="message-content" style="margin-top: 10px">
          {{ message['content'] }}
        </div>
      </div>
    </div>

    <div v-for="reply in readMessages" :key="reply.timestamp"
         class="message-reply single-msg-container"
         :style="{borderColor: borderColor(reply.sender)}">
      <div>
        <div class="sender-info">
          <div class="avatar" :style="{ backgroundColor: avatarColor(reply.sender) }">
            {{ reply.sender.charAt(0).toUpperCase() }}
          </div>
          <div class="sender-details">
            <div class="sender-name">{{ reply.sender }}</div>
          </div>
          <div class="message-date">{{ formatDate(reply.timestamp) }}</div>
        </div>
        <div class="message-content" style="margin-top: 10px">
          {{ reply.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/composables/dateFormatter.js'
import {computed} from "vue";

export default {

  props: {
    message: {
      type: Object,
      required: true
    },
    lastMessage : {
      required: true
    },
    suggestedActionsList : {
      type: Array,
      required: true
    },
    system: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const avatarColor = (sender) => {
      return sender === 'Me' ? '#bc0000' : '#1a73e8'
    }

    const borderColor = (sender) => {
      return sender === 'Me' ? '#ffc8c8' : '#b4dafd'
    }

    const readMessages = computed(() => {
      return props.message.replies.filter(reply => reply.unread === false)
    })

    return {
      formatDate,
      readMessages,
      avatarColor,
      borderColor
    }

  }
}
</script>

<style scoped>
.message-thread {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-header {
  padding-top: 5px;
}

.message-header h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #202124;
}

.sender-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 40px;
  height: 40px;
  /*background: #1a73e8;*/
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}


.sender-details {
  flex-grow: 1;
}

.sender-name {
  font-weight: 500;
  color: #202124;
}

.sender-address {
  font-size: 12px;
  color: #5f6368;
}

.message-reply {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f4;
}

.message-content {
  font-size: 14px;
  color: #202124;
  line-height: 1.5;
  white-space: pre-line;
  /*width: 70%;*/
}

.single-msg-container {
  border: 1px solid;
  padding: 5px 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>