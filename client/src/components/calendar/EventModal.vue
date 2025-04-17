<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ event ? 'Edit Event' : 'Create Event' }}</h3>
        <button @click="closeEvent" class="close-btn">
          <i class="material-icons">close</i>
        </button>
      </div>
      <div class="modal-body">
        <p class="action-text" v-if="isAction">
          Here is the updated event! Click “Save” to save the changes
        </p>
        <input v-model="localEventForm.title" placeholder="Event title" class="event-input" />
        <p v-if="showTitleError" class="title-error">Please, add a title</p>
        <div class="datetime-inputs">
          <label>
            Start:
            <input type="datetime-local" :min="minDateTime" v-model="localEventForm.start" class="event-input" />
          </label>
          <label>
            End:
            <input type="datetime-local" :min="minDateTime" v-model="localEventForm.end" class="event-input" />
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="localEventForm.provisional"/>
            Provisional
          </label>
        </div>
        <p v-if="showDateError" class="title-error">
          Please enter a valid start and end date and time for the event
        </p>
      </div>
      <div class="modal-footer">
        <button v-if="event" @click="$emit('delete', event)" class="delete-btn">
          Delete event
        </button>
        <div class="modal-footer-save-close">
          <button @click="closeEvent" class="close">
            Close
          </button>
          <button @click="saveEvent" class="save-btn">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useApi} from "@/composables/useApi.js";


export default {
  props: {
    event: Object,
    eventForm: Object,
    events: Array,
    isAction: Boolean,
  },
  emits: ['close', 'save', 'delete'],

  setup(props, { emit }) {

    const api = useApi();
    const localEventForm = ref({ ...props.eventForm });
    const showTitleError = ref(false);
    const showDateError = ref(false);
    const $toast = useToast();

    watch(() => props.eventForm, (newForm) => {
      localEventForm.value = { ...newForm }
    }, { deep: true });


    const closeEvent = () => {
      emit('close', {... props.event});
    }


    const saveEvent = () => {
      showTitleError.value = showDateError.value = false;
      const eventData = localEventForm.value;

      if (!eventData.title || !eventData.start || !eventData.end || eventData.start > eventData.end) {
        showTitleError.value = !eventData.title;
        showDateError.value = !eventData.start || !eventData.end || eventData.start > eventData.end;
        return;
      }

      emit('save', {
        ...eventData,
      }, props.isAction ? 'ai_ask_llm' : 'user');
    }

    const displayOverlapError = (eventTitle) => {
      $toast.open({
        message: `An event already exists in this slot: ${eventTitle}`,
        type: 'error',
        duration: 5000,
        position: 'top'
      });
    };

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
      localEventForm,
      showTitleError,
      showDateError,
      minDateTime,
      closeEvent,
      saveEvent,
    }
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #e1e1e1;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.modal-footer-save-close {
  display: flex;
  gap: 8px;
}

.event-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
}

.save-btn, .delete-btn, .close {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background: #1a73e8;
}

.close {
  background-color: #d1d1d1;
  color: black;
}

.delete-btn {
  background: #dc3545;
}

.title-error {
  color: rgb(182, 0, 0);
  margin-bottom: 5px;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.action-text {
  font-weight: bold;
  margin-bottom: 10px;
  color: #0d67dd;
}
</style>
