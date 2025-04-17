<template>
  <div class="reply-section" :class="{'reply-box-margin' : system === 'sys0'}">
    <div class="reply-box">
      <span class="material-icons-outlined" @click="$emit('close-reply')">close</span>
      <textarea id="textAreaDraft" v-model="replyText" placeholder="Click here to reply..."></textarea>
      <div class="reply-actions">
        <button class="send-button" @click="sendReply">
          <span class="material-icons-outlined">send</span>
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    system: {
      type: String,
      required: true
    }
  },

  mounted() {
    if (document.getElementById('textAreaDraft'))
      setTimeout(() => {
        document.getElementById('textAreaDraft').focus()
      }, 50);
  },


  setup(props, { emit }) {
    const replyText = ref('');

    const sendReply = () => {
      if (replyText.value.trim()) {
        emit('send-reply', replyText.value)
        replyText.value = ''
        props.message.draft = null
        props.message.tmpDraft = null
      }
    };

    watch(
        () => props.message.draft,
        (newValue, oldValue) => {
          if (newValue)
            replyText.value = newValue
        },
        { immediate: true },
    )


    watch(
        () => replyText.value,
        (newValue, oldValue) => {
          const action = props.message.support.find(a => a['action'] === 'create_draft');
          if (action)
            action.done = action && action.draft === newValue;

          props.message.draft = newValue
        }, { immediate: true },
    )

    return {
      replyText,
      sendReply,
    }
  }
}
</script>

<style scoped>
.reply-section {
  margin-top: 0px;
  margin-bottom: 15px;
  width: 100%;
}

.reply-box {
  border: 2px solid #ddcfb3;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  background-color: #fffcf0;
}

.reply-box-margin {
  margin-top: 15px;
}


textarea {
  width: 100%;
  min-height: 120px;
  border: none;
  font-family: inherit;
  resize: vertical;
  font-size: 14px;
  background-color: #fffcf0;
}

textarea:focus {
  outline: none;
}

.reply-actions {
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
}

.send-button {
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
}

.send-button:hover {
  background: #1557b0;
  box-shadow: 0 1px 2px rgba(60,64,67,0.3);
}

.material-icons-outlined {
  cursor: pointer;
}
</style>