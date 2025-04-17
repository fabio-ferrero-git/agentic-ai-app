<template>
  <div class="reply-section">
    <div v-if="message['ask_llm_completed']">
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
      <button v-if="message.gotDraft && message.draft !== replyText"
              class="icon-button get-draft"
              @click="replyText = message.draft; focusTextArea()">Get draft again
      </button>
    </div>
    <div v-else>
      <h3>I am generating a <span>draft response</span> for you...</h3>
      <Skeletor width="70%"/>
      <Skeletor width="40%"/>
      <Skeletor width="90%"/>
      <Skeletor width="60%"/>
    </div>
  </div>
</template>

<script>
import {nextTick, ref, watch} from 'vue'
import { Skeletor } from 'vue-skeletor';

export default {

  components : {
    Skeletor
  },
  props: {
    message: {
      type: Object,
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
    const replyText = ref(props.message.tmpDraft ? props.message.tmpDraft : '');

    const sendReply = () => {
      if (replyText.value.trim()) {
        emit('send-reply', replyText.value)
        replyText.value = ''
        props.message.draft = null
        props.message.gotDraft = false
        props.message.tmpDraft = null
      }
    };

    const focusTextArea = () => {
      setTimeout(() => {
        document.getElementById('textAreaDraft').focus()
      }, 50);
    }

    watch(
        () => replyText.value,
        (newValue, oldValue) => {
          props.message.tmpDraft = newValue
        }
    )


    watch(
        () => props.message.draft,
        async (newValue, oldValue) => {
          if (!props.message.gotDraft && newValue && newValue !== oldValue) {
            replyText.value = newValue || oldValue
            props.message.gotDraft = true
            focusTextArea()
            emit('scrollToEnd')
          }
        },
        { immediate: true }
    )

    return {
      replyText,
      sendReply,
      focusTextArea
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
  padding-top: 16px;
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

.get-draft {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #b8d5ff;
  color: black;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
}

.send-button:hover, .get-draft:hover{
  background: #1557b0;
  box-shadow: 0 1px 2px rgba(60,64,67,0.3);
  color: white;
}

.material-icons-outlined {
  cursor: pointer;
}

h3 span {
  font-weight: bold;
}
</style>