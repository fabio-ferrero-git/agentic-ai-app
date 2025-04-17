<template>
  <div class="todo-form-overlay">
    <div class="todo-form">
      <h3>{{ editingTodo ? 'Edit Task' : 'New Task' }}</h3>
      <input
          v-model="newTodo.title"
          placeholder="Task title"
          class="todo-input"
      />
      <textarea
        v-model="newTodo.description"
        placeholder="Description"
        class="todo-textarea"
      ></textarea>

      <p v-if="title_hint" class="hint-title">Please, add a title</p>

      <div class="form-row">
        <div class="form-group">
          <label>Priority</label>
          <select v-model="newTodo.priority" class="todo-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div v-if="false" class="form-group">
          <label>Due Date</label>
          <div class="datetime-container">
            <input
                type="datetime-local"
                v-model="newTodo.dueDate"
                class="todo-datetime"
                :min="minDateTime"
            >
          </div>
          <button class="no-data-button" @click="clearDate">Remove date</button>
        </div>
      </div>

      <div class="form-actions">
        <button class="cancel-button" @click="$emit('cancel-todo', editingTodo)">Cancel</button>
        <button class="save-button" @click="saveTodo">
          {{ editingTodo ? 'Save' : 'Add' }}
        </button>
      </div>
      </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue'

export default {
  props: {
      editingTodo: {
        required: true
      },
      newTodo: {
          required: true
      }
  },

  setup(props, {emit}) {
    const title_hint = ref(false)

    const clearDate = () => {
      props.newTodo.dueDate = null;
    }

    const saveTodo = () => {
      if(!props.newTodo.title){
        title_hint.value = true
        return
      }

      if(props.editingTodo)
        emit('update-todo')
      else
        emit('save-todo')

      title_hint.value = false
    }


    const minDateTime = computed(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')

      return `${year}-${month}-${day}T${hours}:${minutes}`
    })

    return {
      title_hint,
      clearDate,
      saveTodo,
      minDateTime,
    }
  },


}
</script>

<style scoped>
.todo-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.todo-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 680px;
  box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14),
              0 9px 46px 8px rgba(0,0,0,0.12),
              0 11px 15px -7px rgba(0,0,0,0.2);
}

.todo-input,
.todo-textarea {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-family: inherit;
}

.form-row {
  display: flex;
  gap: 16px;
  margin: 16px 0;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #5f6368;
  font-size: 14px;
}

.todo-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-family: inherit;
  background: white;
}

.todo-select:hover {
  border-color: #1a73e8;
}

.todo-select:focus {
  border-color: #1a73e8;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}


.cancel-button,
.save-button {
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.cancel-button {
  background: none;
  border: none;
  color: #5f6368;
}

.save-button {
  background: #1a73e8;
  color: white;
  border: none;
}

.no-data-button {
  margin-top: 5px;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  background: #e2e2e2;
  color: black;
  border: none;
}
.no-data-button:hover {
  background: #e0e5f6;
}

.todo-textarea {
  min-height: 100px;
  resize: vertical;
}

.hint-title {
  color: rgb(182, 0, 0);
}

.datetime-container {
  display: flex;
  gap: 8px;
  margin-bottom: 5px;
}

.todo-datetime {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  font-family: inherit;
  background: white;
}

.todo-datetime:hover {
  border-color: #1a73e8;
}

.todo-datetime:focus {
  border-color: #1a73e8;
  outline: none;
  box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
}

</style>