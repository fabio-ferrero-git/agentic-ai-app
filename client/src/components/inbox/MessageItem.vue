<template>
  <div :class="['message-item', { unread: message.unread, selected: message.lastClicked }]"
       @click.stop="$emit('click-item')">
    <div class="message-sender">{{ message.sender }}</div>
    <div class="message-preview">
      <span class="message-subject">{{ messageSubject }}</span>
      <span class="message-snippet"> - {{ messageSnippet }}</span>
    </div>
    <div class="message-timestamp">
      {{ lastMessageTimeStamp }}
    </div>
    <div class="connected-items">
      <span v-for="event in connectedEventsToMessage" :key="event.id" @click="this.$emit('action', 'calendar_event', event.id)"
            @mouseenter="showTooltip($event, 'Go to EVENT: ' + event.title)"
            @mouseleave="hideTooltip"
          class="material-icons connected-item">calendar_today
      </span>
      <span v-for="todo in connectedTodosToMessage" :key="todo.id" @click="this.$emit('action', 'todo', todo.id)"
            @mouseenter="showTooltip($event, 'Go to TO-DO: ' + todo.title)"
            @mouseleave="hideTooltip"
            class="material-icons connected-item">task_alt
      </span>
    </div>
    <div v-if="tooltipVisible"
         class="tooltip"
         :style="tooltipStyle"
         v-html="tooltipText">
    </div>
  </div>
</template>

<script>
import {computed, nextTick, ref} from 'vue'
import { formatDate } from '@/composables/dateFormatter.js'

export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    connectedEvents: {
      type: Array,
      required: true
    },
    connectedTodos: {
      type: Array,
      required: true
    },
  },

  setup(props) {
    const tooltipVisible = ref(false)
    const tooltipText = ref('')
    const tooltipStyle = ref({})

    const showTooltip = (event, text) => {
      tooltipText.value = text
      tooltipVisible.value = true

      // Get element position
      const rect = event.target.getBoundingClientRect()

      // Get viewport dimensions
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Calculate tooltip position after next tick to get actual tooltip dimensions
      nextTick(() => {
        const tooltip = document.querySelector('.tooltip')
        if (!tooltip) return

        const tooltipWidth = tooltip.offsetWidth
        const tooltipHeight = tooltip.offsetHeight

        // Calculate left position
        let left = rect.left
        if (left + tooltipWidth > viewportWidth) {
          left = viewportWidth - tooltipWidth - 10 // 10px margin from viewport edge
        }
        if (left < 0) {
          left = 10 // 10px margin from viewport edge
        }

        // Calculate top position
        let top = rect.bottom + 5
        if (top + tooltipHeight > viewportHeight) {
          top = rect.top - tooltipHeight - 5 // Show above element if no space below
        }

        tooltipStyle.value = {
          left: `${left}px`,
          top: `${top}px`
        }
      })
    }

    const hideTooltip = () => {
      tooltipVisible.value = false
    }

    const messageSnippet = computed(() => {
      return props.message.content.substring(0, 100) + '...'
    })

    const messageSubject = computed(() => {
      const lastReply = props.message.replies?.at(-1)
      return (lastReply?.sender === props.message.sender)
          ? lastReply.subject
          : props.message.subject
    });

    const lastMessageTimeStamp = computed(() => {
      const timestamps = [props.message.timestamp];
      props.message.replies.forEach(reply => {
        if (reply.sender !== 'Me')
          timestamps.push(reply.timestamp);
      })
      return formatDate(timestamps[timestamps.length - 1])
    })

    const connectedEventsToMessage = computed(() => {
      return props.connectedEvents.filter(e => e.parent_message === props.message.id)
    })

    const connectedTodosToMessage = computed(() => {
      return props.connectedTodos.filter(e => e.parent_message === props.message.id)
    })


    return {
      messageSnippet,
      formatDate,
      messageSubject,
      lastMessageTimeStamp,
      connectedEventsToMessage,
      connectedTodosToMessage,
      tooltipVisible,
      tooltipText,
      tooltipStyle,
      showTooltip,
      hideTooltip
    }
  }
}
</script>

<style scoped>
.message-item {
  padding: 8px 10px 10px 30px;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  display: grid;
  grid-template-columns: minmax(200px, 1fr) minmax(300px, 2fr) 70px 100px;
  gap: 12px;
  height: 40px;
  font-weight: normal;
  background: #fbfcff;
}

.message-item:hover {
  box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgba(60, 64, 67, 0.3);
  z-index: 2;
}

.message-item.selected {
  background-color: #e1efff;
  box-shadow:inset 0px 0px 0px 1.3px #a8ceff;
}

.message-item.unread {
  background: white;
  border-inline-start: 5px solid #5e5e5e;
  writing-mode: horizontal-tb;
}

.message-item.unread .message-sender,
.message-item.unread .message-subject {
  font-weight: bold;
  color: #202124;
}

.message-item.unread .message-preview {
  color: #202124;
}

.message-sender {
  position: relative;
  font-size: 14px;
  color: #4a4b4c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.message-item.unread .message-sender::before {
  content: '•';
  color: #1a73e8;
  position: absolute;
  left: -12px;
  font-size: 20px;
  line-height: 0;
  top: 50%;
}

.message-preview {
  font-size: 14px;
  color: #5f6368;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 2;
}

.message-subject {
  color: #4a4b4c;
}

.message-snippet {
  color: #5f6368;
}

.message-timestamp {
  font-size: 12px;
  color: #5f6368;
  white-space: nowrap;
  width: 80px;
  text-align: center;
}
.connected-items {
  text-align: center;
}
.connected-item {
  margin-right: 10px;
  font-size: 140%;
  transition: ease-out 0.1s;
}

.connected-item:hover {
  color: #1a73e8;
  transform: scale(1.1);
}

.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1000;
  pointer-events: none;
  white-space: nowrap;
}

</style>