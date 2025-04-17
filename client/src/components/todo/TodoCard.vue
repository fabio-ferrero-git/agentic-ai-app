<template>
  <div class="todo-card"
    :class="{'completed': todo['completed'], 'highlighted': todo['highlighted'] === true,
      [`priority-${todo['priority']}`]: true}">

    <div class="todo-card-header">
      <h3 :class="{ 'completed-text': todo['completed'] }">{{ todo['title'] }}</h3>
    </div>

    <p class="todo-description">{{ todo['description'] }}</p>

    <div class="todo-metadata">
      <span class="priority-badge" :class="`priority-${todo['priority']}`">
        {{ todo['priority'] }}
      </span>
      <span v-if="false" class="due-date" :class="{ 'overdue': isOverdue(todo) }">
        {{ formatDate(todo['dueDate']) }}
      </span>
    </div>

    <div class="todo-actions">
      <button v-if="todo['parent_message']" class="icon-button button-parent" @click="$emit('to-parent-email')">
        Back to email
      </button>
      <button class="icon-button" @click="emitTodo(todo, 'edit-todo')">
        <span class="material-icons icon-sm">edit</span> Edit
      </button>
      <button class="icon-button delete" @click="emitTodo(todo, 'delete-todo')">
        <span class="material-icons icon-sm">delete</span> Delete
      </button>
    </div>
  </div>
</template>

<script>

import {ref} from "vue";
import {useApi} from "@/composables/useApi.js";

export default {
  props: {
    todo: {
      type: Object,
        required: true
    },
  },

  setup(props, {emit}) {
    const api = useApi();
    const isPressing = ref(false)
    const pressTimer = ref(null)
    const counter = ref(null);
    const pressCounter = ref(null)

    const isOverdue = (todo) => {
      if (!todo.dueDate || todo.completed) return false
      return new Date(todo.dueDate) < new Date()
    }

    const formatDate = (date) => {
      return date ? api.formatMessageTime(new Date(date)) : 'No Due datetime'
    }

    const emitTodo = (todo, str) => {
        emit(str, todo)
    }

    const startPress = () => {
      isPressing.value = true;
      counter.value = 5
      pressCounter.value = setInterval(() => {
        counter.value--;
      }, 1000);
      pressTimer.value = setTimeout(() => {
        isPressing.value = false;
        counter.value = null
        clearInterval(pressCounter.value);
        emitTodo(props.todo, 'toggle-todo')
      }, 5000);
    }

    const endPress = () =>  {
      clearTimeout(pressTimer.value);
      clearInterval(pressCounter.value);
      isPressing.value = false;
      counter.value = null
    }

    return {
        isOverdue,
        formatDate,
        emitTodo,
        isPressing,
        counter,
        endPress,
        startPress
    }
  }
}
</script>

<style scoped>
.todo-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3),
              0 1px 3px 1px rgba(60,64,67,0.15);
  transition: box-shadow 0.2s;
}

.todo-card:hover {
  box-shadow: 0 1px 3px 0 rgba(60,64,67,0.3),
              0 4px 8px 3px rgba(60,64,67,0.15);
}

.todo-card.completed {
  background: #f8f9fa;
}

.todo-card.highlighted {
  box-shadow: 0 0 7px rgba(255, 0, 0, 0.8)
}

.todo-card-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.todo-card-header h3 {
  margin: 0;
  color: #202124;
  font-size: 16px;
  font-weight: 500;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  padding-top: 2px;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 2px;
  border: 2px solid #5f6368;
  cursor: pointer;
}

.completed-text {
  text-decoration: line-through;
  color: #5f6368 !important;
}

.todo-description {
  color: #5f6368;
  font-size: 14px;
  margin: 8px 0;
  line-height: 1.4;
}

.todo-metadata {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e1e1e1;
}

.priority-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
}

.priority-badge.priority-low {
  background: #e6f4ea;
  color: #34a853;
}

.priority-badge.priority-medium {
  background: #fef7e0;
  color: #f9ab00;
}

.priority-badge.priority-high {
  background: #fce8e6;
  color: #ea4335;
}

.due-date {
  font-size: 12px;
  color: #5f6368;
}

.due-date.overdue {
  color: #ea4335;
  font-weight: 500;
}

.todo-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.icon-button {
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  color: #5f6368;
}

.button-parent {
  background-color: #d4e8ff;
}


.button-hold {
  transition: transform 0.3s ease;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 8px;
  color: #5f6368;
  margin-right: 25px;
  margin-left: 1%;
  box-shadow: 2px 2px 5px #b8b8b8;
}

.button-hold:hover {
  background-color: #e4ffea;
}

.button-hold.pressing {
  animation: pulseAnimation 1s infinite;
}

.todo-complete {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

@keyframes pulseAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.button-parent:hover {
  color: black;
}

.icon-button:hover {
  background: #f1f3f4;
}

.icon-button.delete:hover {
  color: #d93025;
}


.material-icons.icon-sm {
  font-size: 20px;
  vertical-align: middle;
}
</style>