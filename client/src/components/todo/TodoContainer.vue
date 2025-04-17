<template>
    <div class="todo-container">    
      <div class="todo-header">
        <button class="add-button" @click="createNewTodo">
          <span class="plus-icon">+</span> Add Task
        </button>
      </div>
      <EmptyState v-if="!todos.length"
                  textPrimary="Your Todo section is empty"
                  textSecondary="No todos to display"
                  icon="done_all"/>

       <todo-form v-if="showNewTodoForm" 
                  :editingTodo="editingTodo"
                  :newTodo="newTodo"
                  @cancel-todo="cancelTodo"
                  @save-todo="saveTodo"
                  @update-todo="updateTodo">
      </todo-form>
  
      <div class="todo-grid">
        <todo-card v-for="todo in todos" :key="todo.id" 
                  :todo="todo" 
                  @toggle-todo="$emit('toggle-todo', todo)"
                  @edit-todo="editTodo"
                  @delete-todo="$emit('delete-todo', todo)"
                  @to-parent-email="$emit('to-parent-email', todo)">
        </todo-card>
      </div>
    </div>
  </template>
  
  
  <script>
  import {ref, computed, watch, onMounted} from 'vue'
  import TodoForm from "@/components/todo/TodoForm.vue"
  import TodoCard from "@/components/todo/TodoCard.vue"
  import EmptyState from '../EmptyState.vue'
  import {useApi} from "@/composables/useApi.js";

  export default {
    props: {
      todos: {
          required: true
      },
      selectedTodo : {
        type: Object,
        required: false
      },
      todoTemplate : {
        type: Function,
        required: true
      }

    },
    components: {
      TodoForm,
      TodoCard,
      EmptyState
    },


    setup(props, { emit }) {

      const showNewTodoForm = ref(false)
      const editingTodo = ref(null)
      const newTodo = ref({
        title: '',
        description: '',
        completed: false,
        priority: 'medium',
        // dueDate: useApi().dateToLocalISO(),
        dueDate: null
      })

      const createNewTodo = () => {
        showNewTodoForm.value = true
        emit('click-create-todo', newTodo.value)
      }

      const saveTodo = () => {
        const { title, description, dueDate, priority } = newTodo.value;
        emit('create-todo', props.todoTemplate(title, description, dueDate ? new Date(dueDate) : null, priority));
        resetForm();
      };


      const updateTodo = () => {
        emit('update-todo', newTodo.value, editingTodo.value)
        resetForm()
      }
  
      const editTodo = (todo) => {
        editingTodo.value = {...todo}
        newTodo.value = { ...todo }

        showNewTodoForm.value = true
        emit('edit-todo', newTodo.value)
      }
  
      const cancelTodo = (todo) => {
        resetForm()
        emit('close-modal-todo', todo)
      }
  
      const resetForm = () => {
        showNewTodoForm.value = false
        editingTodo.value = null
        newTodo.value = {
          title: '',
          description: '',
          completed: false,
          priority: 'medium',
          dueDate: null,
        }
      }

      onMounted(() => {
        setTimeout(() => {
          props.todos.forEach(todo => todo.highlighted = false)
        }, 3000)
      })

      return {
        showNewTodoForm,
        newTodo,
        editingTodo,
        createNewTodo,
        saveTodo,
        updateTodo,
        editTodo,
        cancelTodo
      }
    }
  }
  </script>
  
  
  <style scoped>
  .todo-container {
    background: #ffffff;
    font-family: 'Roboto', sans-serif;
    position: relative;
    /* height: 100vh; */
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .todo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    margin-top: 10px;
    margin-left: 5px;
  }
  
  .todo-header h2 {
    color: #202124;
    margin: 0;
  }
  
  .add-button {
    background: #1a73e8;
    color: white;
    border: none;
    padding: 8px 24px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
  
  .plus-icon {
    font-size: 20px;
  }
  
  .todo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 8px;
  }
  </style>