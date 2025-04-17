<template>
  <div class="phase">
    <div class="app-container">
      <div class="sidebar" :class="{ collapsed: isSidebarCollapsed && !isHoveredSidebar, expanded: isSidebarCollapsed && isHoveredSidebar }">
        <div class="logo">
          <span class="material-icons hamburger" @click="toggleSidebar">menu</span>
          <span class="logo-text" :class="{ 'fade-out': isSidebarCollapsed }">Mail & Calendar</span>
        </div>
        <nav @mouseenter.stop="hoverSidebar(false)" @mouseleave.stop="hoverSidebar(true)">
          <button @click="changeView('inbox')"
                  :class="{ active: currentView === 'inbox' }" data-tooltip="Inbox">
            <span class="material-icons">mail</span>
            <span class="button-text" :class="{ 'fade-out': isSidebarCollapsed }">Inbox</span>
            <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
          </button>
          <button @click="changeView('calendar')" :class="{ active: currentView === 'calendar' }" data-tooltip="Calendar">
            <span class="material-icons">calendar_today</span>
            <span class="button-text" :class="{ 'fade-out': isSidebarCollapsed }">Calendar</span>
          </button>
          <button @click="changeView('todo')" :class="{ active: currentView === 'todo' }" data-tooltip="Todo">
            <span class="material-icons">task_alt</span>
            <span class="button-text" :class="{ 'fade-out': isSidebarCollapsed }">TO-DO and deadlines</span>
          </button>
        </nav>
      </div>
      <div class="main-content">
        <inbox-view v-if="currentView === 'inbox'"
                    class="inbox-view"
                    :messages="messages"
                    :events="events"
                    :todos="todos"
                    :selectedMsg="llmSelectedItem"
                    :fromOperational="isSupportAsked"
                    :loader="api.loading.value"
                    :system="system"
                    @close-modal="handleCloseMessageModal"
                    @message-click="handleMessageClick"
                    @message-reply="handleMessageReply"
                    @message-delete="handleMessageDelete"
                    @toggle-unread="handleToggleUnread"
                    @conflict-event="handleConflictEvent"
                    @update-followup="markFollowUp"
                    @ignore-followup=""
                    @llm-support="askLLM"
                    @action_create_draft="handleActionCreateDraft"
                    @action_create_todo="handleActionCreateTodo"
                    @action_create_event="handleActionCreateEvent"
                    @action_mark_todo="handleActionMarkTodo"
                    @action_edit_todo="handleActionEditTodo"
                    @action_edit_event="handleActionEditEvent"
                    @action_delete_event="handleActionDeleteEvent"
                    @action="performSupport"
                    @change-view="changeView"
        />
        <calendar-view v-else-if="currentView === 'calendar'"
                       class="calendar-view"
                       :events="events"
                       :selectedEvent="llmSelectedItem"
                       @event-click="handleEventClick"
                       @create-event="handleCreateEvent"
                       @update-event="handleUpdateEvent"
                       @delete-event="handleDeleteEvent"
                       @close-event="handleCloseEvent"
                       @to-parent-email="handleToParentMessage"
        />
        <todo-view v-else-if="currentView === 'todo'"
                   :todos="todos"
                   :todoTemplate="todoTemplate"
                   class="todo-view"
                   @click-create-todo="handleClickCreateTodo"
                   @close-modal-todo="handleCloseModalTodo"
                   @create-todo="handleCreateTodo"
                   @toggle-todo="handleToggleTodo"
                   @edit-todo="handleEditTodo"
                   @update-todo="handleUpdateTodo"
                   @delete-todo="handleDeleteTodo"
                   @to-parent-email="handleToParentMessage">
        </todo-view>
      </div>
    </div>
  </div>
</template>


<script>
import {computed, onMounted, reactive, ref, watch} from 'vue'
import InboxView from '@/components/inbox/InboxContainer.vue'
import CalendarView from '@/components/calendar/CalendarView.vue'
import TodoView from '@/components/todo/TodoContainer.vue'
import TimerDisplay from "@/components/TimerDisplay.vue";
import {useApi} from "@/composables/useApi.js";
import {useFollowUpQueue} from "@/composables/followUpsQueue.js";
import {useCalendarLogic} from "@/composables/useCalendarLogic.js";
import {scenarios, scenariosNames} from '@/composables/simulationScenarios.js'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import {updateTimestamps, preloadedScenarios_fixedTimestamp} from "@/composables/preloadedScenarios.js";


export default {
  setup(props, { emit }) {
    /**
     * Initialize API services for handling different functionalities
     */
    const api = useApi();

    const followUpApi = useFollowUpQueue();
    const calendarLogic = useCalendarLogic();

    const testCaptcha = () => {
      emit('log-activity', 'testCaptcha');
    }

    /*
    * Systems:
    *   sys0 -> without AI-driven automation
    *   sys1 -> partial AI-driven automation
    *   sys2 -> full AI-driven automation
    */
    const system = ref(sessionStorage.getItem('sys'))

    /**
     * Reactive state variables for the simulation
     */
    const currentScenario = ref(null)
    const simulationStartTime = ref(null)
    const pendingFollowUps = ref([])

    /**
     * Main application state
     */
    const currentView = ref('inbox')
    const messages = ref([])
    const events = ref([])
    const todos = ref([])
    const llmSelectedItem = ref(null)
    let firstEmail = true;

    /**
     * UI state variables
     */
    const isSidebarCollapsed = ref(false)
    const isHoveredSidebar = ref(false)
    const isSupportAsked = ref(false)
    const $toast = useToast();


    /**
     * Computes the number of unread messages
     * @returns {number} Count of unread messages
     */
    const unreadCount = computed(() => {
      return messages.value.filter(message => message['unread']).length;
    })


    /**
     * Toggles the sidebar between collapsed and expanded states
     * Logs the activity
     */
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
      emit('log-activity', 'sidebar_toggled', { collapsed: isSidebarCollapsed.value });
    }


    /**
     * Handles mouse enter/leave events for the sidebar
     * @param {boolean} isLeaving - Whether the mouse is leaving the sidebar
     */
    const hoverSidebar = (isLeaving) => {
      if (isSidebarCollapsed.value === true)
        setTimeout(() => isHoveredSidebar.value = !isLeaving, 20);
    }


    /**
     * Initializes the simulation with the selected scenario
     * Schedules the base emails according to their timestamps
     */
    const initializeSimulation = () => {
      const scenario = sessionStorage.getItem('scenario-key')
      const scenario_string = scenario.split('+')[0]
      const scenario_option = scenario.split('+')[1]
      sessionStorage.setItem('scenario', scenariosNames[scenario_string])
      const selectedScenario = scenarios[scenario_string].find(s => s.id === scenario_option)

      currentScenario.value = selectedScenario
      simulationStartTime.value = Date.now()
      messages.value = [] // Clear existing messages
      pendingFollowUps.value = []
      // Schedule base emails
      selectedScenario.baseEmails.forEach(email => {
        setTimeout(() => {
          addNewMessage(email)
        }, email.timestamp * 1000) // Convert to milliseconds
      })
    }


    /**
     * Calculates the simulation progress as a percentage
     * @returns {number} Progress percentage (0-100)
     */
    const getSimulationProgress = () => {
      if (!simulationStartTime.value) return 0
      const elapsed = (Date.now() - simulationStartTime.value) / 1000
      return Math.min(100, (elapsed / 300) * 100) // 300 seconds = 5 minutes
    }


    /**
     * Adds a new message to the inbox
     * @param {Object} messageData - Data for the new message
     */
    const addNewMessage = (messageData) => {
      const newMessage = reactive({
        id: messageData.id || Date.now(),
        subject: messageData.subject,
        sender: messageData.sender,
        content: messageData.content,
        timestamp: new Date(),
        unread: true,
        replies : [],
        requiresResponse: messageData.requiresResponse || false,
      })
      messages.value.unshift(newMessage)
      emit('log-activity', 'new_message', newMessage)
      askLLM(newMessage)
    }

    /**
     * Adds a follow-up reply to an existing message thread
     * @param {Object} message - The parent message
     * @param {Object} followUp - The follow-up data
     * @param {string} followUpId - ID of the follow-up
     */
    const addNewFollowUp = (message, followUp, followUpId) => {
      // Move to first the message thread
      messages.value.splice(messages.value.indexOf(message), 1)
      messages.value.unshift(message)
      message.replies.push(reactive(followUp));
      message.unread = true
      emit('log-activity', 'new_follow_up', {followUp : followUp, followUpId : followUpId})
      askLLM(message)
    }


    /**
     * Handles clicking on a message
     * @param {Object} message - The clicked message
     * @param {boolean} reload - Whether to reload the message
     */
    const handleMessageClick = (message, reload) => {
      emit('log-activity', 'message_opened', message)
      updateConflictEvents(message)
      if (reload) {
        markFollowUp(message)
      }
    }


    /**
     * Log closing the message modal
     * @param {Object} message - The message being closed
     */
    const handleCloseMessageModal = (message) => {
      emit('log-activity', 'message_closed', message)
    }


    /**
     * Log toggling the unread status of a message
     * @param {Object} message - The message to toggle
     */
    const handleToggleUnread = (message) => {
      emit('log-activity', 'message_unread_toggled', message);
    }


    /**
     * Marks a message and its replies as read
     * @param {Object} message - The message to mark as read
     */
    const markFollowUp = (message) => {
      message.unread = false
      const someUnread = message.replies.some(r => r.unread === true)
      if (someUnread) {
        message.replies.forEach((reply) => reply.unread = false)
      }
    }


    /**
     * Handles deletion of a message
     * @param {Object} message - The message to delete
     */
    const handleMessageDelete = (message) => {
      const messageIndex = messages.value.findIndex(msg => msg['id'] === message.id)
      if (messageIndex !== -1) {
        messages.value.splice(messageIndex, 1)
        emit('log-activity', 'message_deleted', message)
      }
    }


    /**
     * Checks if a user's reply matches the draft suggested by support
     * @param {Object} message - The message containing the draft
     * @param {Object} reply - The user's reply
     * @returns {boolean} Whether the reply matches the draft
     */
    const replyEqualsDraft = (message, reply) => {
      const draftAction = message.support.find(a => a['action'] === 'create_draft')
      return draftAction.draft === reply.content.trim()
    }


    /**
     * Adds all suggested actions when in system2 (full automation) mode
     * @param {Object} message - The message containing actions
     * @param {Object} reply - The user's reply
     */
    const system2AddAllActions = (message, reply) => {
        // Sort action with to-do items first
        const actions = message.support
            .filter(a => a.action !== 'create_draft')
            .sort((a, b) => (a.action.includes('todo') ? 1 : 0) - (b.action.includes('todo') ? 1 : 0));

        for (const action of actions) {
          const isTodo = action.action.includes('todo');

          if (isTodo || replyEqualsDraft(message, reply)) {
            actionMapFunctions[action.action](action, message, false);
            if(!action['conflict_events'])
              showToast(action.action, 'success', 'top', 8000, action);
            else {
              showToast(action.action, 'warning', 'top', 8000, action, true);
            }
            continue;
          }

          const toast = showToast('pending_' + action.action, 'warning', 'top', 0);
          const data = api.smallAnalyzeSchedule(action, reply);

          updateAskLLM(data).then(res => {
            toast.dismiss();
            actionMapFunctions[res.action](res, message, false);
            showToast(res.action, 'success', 'top', 8000, action);

          });
        }
    }

    /**
     * Updates event actions when reply differs from draft in system1 mode
     * @param {Object} message - The message containing the event action
     * @param {Object} reply - The user's reply
     */
    const handleReplyEqualsDraft = (message, reply) => {
      const event_action = message.support.find(a => a.action.includes('event') && !a.done)
      if (event_action) {
        message.support = message.support.filter(a => a !== event_action);
        const data = api.smallAnalyzeSchedule(event_action, reply);
        updateAskLLM(data).then(res => {
          message.support.push(res);
        });
      }
    }

    /**
     * Handles a user replying to a message
     * Manages system1/system2 automation behaviors
     * Schedules follow-ups if applicable
     * @param {Object} msg - The message being replied to
     * @param {Object} reply - The reply content
     */
    const handleMessageReply = async (msg, reply) => {
      // If system1 update actions IF draft !== reply
      if (system.value === 'sys1' && !replyEqualsDraft(msg, reply))
        handleReplyEqualsDraft(msg, reply);

      // If system2:
      // add all actions OR update actions IF draft !== reply
      if (system.value === 'sys2') {
        system2AddAllActions(msg, reply);
      }

      emit('log-activity', 'message_replied', {msg, reply})

      showToast('message_sent', 'success', 'top', 8000)
      const message = messages.value.find(m => m['id'] === msg.id)

      // Set done 'create_draft' action
      const draft = msg.support.find(a => a['action'] === 'create_draft');
      if (draft) draft.done = true;

      const received_replies = message.replies.filter(m => m.sender !== 'Me')

      if (received_replies.length < 1) {
        // Check for conditional follow-ups
        const followUps = currentScenario.value.conditionalFollowUps
            .filter(f => f.parentId === message.id)

        for (const followUp of followUps) {
          // Create a new follow-up with generated content
          const followUpResponse = await followUpApi.generateFollowUp(
              api.cleanMessage(message),
              api.currentTime(),
              followUp.possibleReplies
          )
          const newFollowUp = {
            ...followUp,
            content: followUpResponse.response,
            unread : true
          }

          // Schedule the follow-up
          setTimeout(() => {
            newFollowUp.timestamp = new Date();
            addNewFollowUp(message, newFollowUp, followUpResponse.id)
          }, followUp.delayAfterResponse * 1000)
        }
      }
    }



    /**
     * Handles when a user clicks on a conflict event
     * Navigates to calendar view and highlights the event
     * @param {Object} event - The conflict event
     */
    const handleConflictEvent = (event) => {
      if (event) {
        emit('log-activity', 'conflict_event', event);
        changeView('calendar', 'ai_ask_llm');
        event.highlighted = true
      }
    }


    /**
     * Log when a user clicks on an event
     * @param {Object} event - The calendar event that was clicked
     */
    const handleEventClick = (event) => {
      emit('log-activity', 'event_opened', event);
    }

    /**
     * Refreshes the suggested actions if there was a conflicting change to the calendar
     * Checks for potential conflicts between events and refreshes AI suggestions accordingly
     * @param {Object} event - The event that was added/modified that might cause conflicts
     */
    const refreshIfNecessary = (event) => {
      // Iterate through messages
      for (const message of messages.value) {
        if (message.support) { // If a message is read, let's not generate new actions again - it might have already been handled. If a followup is received, it will become unread again.
          const hasCompletedActions = message.support.some(item => item.done);
          for (const action of message.support) {
            if (action.action === 'create_event' || action.action === 'edit_event') {
              if(action.title === event.title || hasCompletedActions)
                continue // Do not regenerate the actions for the email (if any) which triggered the event creation/edit, or if any action was already performed
              const current_evt = eventTemplate(action.title, new Date(action.datetime), action.duration, action.provisional)
              if(calendarLogic.singleEventOverlap(event, current_evt)){
                // Refresh the message's actions
                askLLM(message, true)
              }
            }
          }
        }
      }
    }

    /**
     * Handles the creation of a new calendar event
     * Adds the event to the events array, logs the activity, and checks for potential conflicts
     * @param {Object} event - The event to be created
     * @param {string} [actor='user'] - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleCreateEvent = (event, actor='user') => {
      llmSelectedItem.value = null;
      events.value.push(event);
      emit('log-activity', 'event_created', {event: event, actor: actor});
      refreshIfNecessary(event)
    }


    /**
     * Handles updating an existing calendar event
     * Updates the event in the events array, logs the activity,
     * and checks for potential conflicts
     * @param {Object} event - The updated event data
     * @param {string} [actor='user'] - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleUpdateEvent = (event, actor='user') => {
      llmSelectedItem.value = null;
      const index = events.value.findIndex(e => e['id'] === event.id);
      if (index !== -1) {
        events.value[index] = event
        emit('log-activity', 'event_updated', {event: event, actor: actor});
        refreshIfNecessary(event)
      }
    }


    /**
     * Handles deleting a calendar event
     * Removes the event from the events array and logs the activity
     * Shows a toast notification if deletion was triggered by AI
     * @param {Object} event - The event to delete
     * @param {string} [actor='user'] - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleDeleteEvent = (event, actor='user') => {
      llmSelectedItem.value = null;
      const index = events.value.findIndex(e => e['id'] === event.id);
      if (index !== -1) {
        events.value.splice(index, 1);
        if (actor === 'ai_ask_llm') showToast('event_deleted', event);
        emit('log-activity', 'event_deleted',  {event: event, actor: actor});
      }
    }


    /**
     * Handles closing an event modal
     * Logs the activity and clears the selected item
     * @param {Object} event - The event being closed
     */
    const handleCloseEvent = (event) => {
      emit('log-activity', 'event_closed', event);
      llmSelectedItem.value = null;
    }


    /**
     * Handles clicking the create to-do button
     * Logs the activity for analytics
     */
    const handleClickCreateTodo = () => {
      emit('log-activity', 'click_create_todo');
    }


    /**
     * Logs the closing of the to-do modal
     * @param {Object} todo - The to-do item
     */
    const handleCloseModalTodo = (todo) => {
      emit('log-activity', 'close_modal_todo', todo);
    }


    /**
     * Handles the creation of a new to-do item
     * @param todo - The to-do item to be created
     * @param actor - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleCreateTodo = (todo, actor='user') => {
      todos.value.push(todo);
      emit('log-activity', 'todo_created', {todo: todo, actor : actor});
    }


    /**
     * Handles the action of marking a to-do item
     * @param todo  - The to-do item to be marked
     * @param value - The value to set for the completed status
     * @param actor - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleToggleTodo = (todo, value=!todo.completed, actor='user') => {
      todo.completed = value;
      emit('log-activity', 'todo_toggled', {todo: todo, actor : actor});
    }


    /**
     * Handles updating an existing to-do item
     * Replaces the to-do item with updated data and logs the activity
     * @param {Object} todo - The updated to-do data
     * @param {Object} editingTodo - The original to-do being edited
     * @param {string} [actor='user'] - Who initiated the action ('user' or 'ai_ask_llm')
     */
    const handleUpdateTodo = (todo, editingTodo, actor='user') => {
      const index = todos.value.findIndex(t => t['id'] === editingTodo.id);
      todos.value[index] = todo;
      emit('log-activity', 'todo_updated', {todo: todo, actor : actor});
    }


    /**
     * Logs the action of editing a to-do item
     * @param todo - The to-do item being edited
     */
    const handleEditTodo = (todo) => {
      emit('log-activity', 'edit_todo', todo);
    }


    /**
     * Handles deleting a to-do item
     * Removes the to-do from the todos array and logs the activity
     * @param {Object} todo - The to-do item to delete
     */
    const handleDeleteTodo = (todo) => {
      const index = todos.value.findIndex(t => t['id'] === todo.id);
      if (index !== -1)
        todos.value.splice(index, 1);
      emit('log-activity', 'todo_deleted', todo);
    }


    /**
     * Navigates to the parent message of an item (event or to-do)
     * Sets the selected item to the parent message and changes view to inbox
     * @param {Object} item - The item containing a reference to its parent message
     */
    const handleToParentMessage = (item) => {
      const message = messages.value.find((m) => m['id'] === item['parent_message'])
      if (message) {
        llmSelectedItem.value = message
        changeView('inbox', 'ai_ask_llm');
      }
    }


    /**
     * Wrapper to perform LLM (Language Model) requests
     * Handles sending data to the API, logging requests/responses, and processing results
     *
     * @param {string} type - Type of LLM request to perform
     * @param {string} log - Base name for logging this request
     * @param {Object} options - Configuration options for the request
     * @param {Object} [options.message] - Message to analyze
     * @param {string} [options.userPrompt] - Custom user prompt
     * @param {boolean} [options.excludeTodo=false] - Whether to exclude todos
     * @param {boolean} [options.chunks=false] - Whether to process in chunks
     * @param {Function} [options.onChunk] - Callback for processing chunks
     * @param {number} [log_id=Date.now()] - Unique ID for logging
     * @returns {Promise<Object>} The LLM response
     */
    const performLLMRequest = async (type, log, {message = undefined, userPrompt = undefined, excludeTodo = false, chunks = false, onChunk = null}, log_id = Date.now()) => {
      const dataInput = await api.analyzeSchedule(events.value, messages.value, todos.value, type);
      // Emit request log
      emit('log-activity', `${log}_req`, {
        ctx: dataInput,
        id: log_id,
        ...(userPrompt && { prompt: userPrompt }),
        ...(message && { thread: message })
      });

      // Perform LLM request
      const llmResponse = await api.queuedAskLLMSupport(type, {
        dataInput: dataInput,
        exclude_todo : excludeTodo,
        thread: null,
        ...(message && { thread: api.cleanMessage(message) }),
        ...(userPrompt && { userPrompt: userPrompt }),
      }, chunks, onChunk);

      // Emit response log
      emit('log-activity', `${log}_res`, { llm_response: llmResponse, id: log_id });
      return llmResponse;
    }


    /**
     * Updates AI suggestions based on new data
     * Used to update event actions when message reply differs from draft
     *
     * @param {Object} dataInput - Input data for the update
     * @returns {Promise<Object>} Updated LLM response
     */
    const updateAskLLM = async (dataInput) => {
      const log_id = Date.now();
      // Emit request log
      emit('log-activity', 'update_ask_llm_req', { ctx: dataInput, id: log_id });
      const llmResponse = await api.queuedAskLLMSupport('update-ask-llm', {
        dataInput: dataInput,
      }, false, null);
      emit('log-activity', 'update_ask_llm_res', { llm_response: llmResponse, id: log_id });
      return llmResponse;
    }


    /**
     * Processes chunks of data from the LLM response
     * Handles suggested actions and support actions
     *
     * @param {Array|Object} chunk - Data chunk from LLM
     * @param {Object} message - Message to attach the chunk data to
     * @param {number} [log_id=Date.now()] - Unique ID for logging
     */
    const chunkCallback = (chunk, message, log_id=Date.now()) => {
      if(!Array.isArray(chunk)){
        message.suggested_actions = chunk.items
        emit('log-activity', 'suggested_actions', {id: log_id, actions: chunk.items, message: message})
      }
      else {
        chunk[0].done = false
        message.support.push(chunk[0])
        emit('log-activity', 'support_actions', {id: log_id, action: chunk[0], message: message})
      }
    }


    /**
     * Main function to request AI assistance for a message
     * Handles special case for first email with preloaded scenarios
     * Updates message with suggested actions and support items
     *
     * @param {Object} message - The message to analyze
     * @param {boolean} [keepToDos=false] - Whether to keep existing to-do
     * @returns {Promise<void>}
     */
    const askLLM = async (message, keepToDos = false) => {
      message['ask_llm_completed'] = false
      if(firstEmail){
        const log_id = Date.now();
        firstEmail = false;
        message.suggested_actions = []
        message.support = []

        const job = sessionStorage.getItem('scenario-key').split('+')[0]
        const scenario = currentScenario.value

        // log-activity. To remain consistent with the actual ask-llm call (performLLMRequest)
        emit('log-activity', 'ask_llm_req', {
          ctx: await api.analyzeSchedule(events.value, messages.value, todos.value, 'ask-llm'),
          id: log_id,
          ...(message && { thread: message })
        });

        // Update scenarios with correct time and username
        const preloadedScenarios = updateTimestamps(preloadedScenarios_fixedTimestamp, sessionStorage.getItem('username'));

        for(let i = 0; i < preloadedScenarios[job].length; i++){
          if(Object.keys(preloadedScenarios[job][i])[0] === scenario.id){
            preloadedScenarios[job][i][scenario.id].forEach(chunk => chunkCallback(chunk, message, log_id))
            message['ask_llm_completed'] = true
            if (system.value === 'sys2')
              system2Workflow(message)

            // Same as above.
            // log-activity. To remain consistent with the actual ask-llm call (performLLMRequest)
            emit('log-activity', 'ask_llm_res', { llm_response: true, id: log_id });

            return
          }
        }
      }
      if(keepToDos){
        message.suggested_actions = message.suggested_actions.filter(action => action.includes('todo'))
        message.support = message.support.filter(action => action.action.includes('todo'))
      }
      else{
        message.suggested_actions = []
        message.support = []
      }

      const log_id = Date.now();
      await performLLMRequest('ask-llm', 'ask_llm', {
        message : message,
        userPrompt : undefined,
        excludeTodo : keepToDos,
        chunks : true,
        onChunk : chunk => chunkCallback(chunk, message, log_id)
      }, log_id);

      message['ask_llm_completed'] = true
      updateConflictEvents(message)

      if (system.value === 'sys2')
        system2Workflow(message)
    }


    /**
     * Initiates automatic workflow for system2 (full automation)
     * Automatically creates draft from support actions
     *
     * @param {Object} message - The message to process
     */
    const system2Workflow = (message) => {
      const createDraftAction = message.support.find(action => action.action.includes('create_draft'));
      handleActionCreateDraft(createDraftAction, message)
    }


    /**
     * Updates event actions with conflict information
     * Checks if suggested events would conflict with existing calendar events
     *
     * @param {Object} message - The message containing event actions
     */
    const updateConflictEvents = (message) => {
      if (message.support) {
        message.support.forEach((action) => {
          if (action['action'] === 'create_event') {
            const event = eventTemplate(action.title, new Date(action.datetime), action.duration, action.provisional);
            action['conflict_events'] = calendarLogic.eventOverlap(events.value, event)
          }
        })
      }
    }


    /**
     * Performs navigation to the correct view for a supported action
     * Maps action types to their corresponding data lists and views
     *
     * @param {string} action - The action type ('email', 'to-do', 'calendar_event')
     * @param {string|number} item_id - ID of the item to select
     */
    const performSupport = (action, item_id) => {
      const mappings = {
        email: { list: messages.value, view: 'inbox' },
        todo: { list: todos.value, view: 'todo' },
        calendar_event: { list: events.value, view: 'calendar' }
      };

      const { list, view } = mappings[action] || {};

      if (list) {
        llmSelectedItem.value = list.find(item => item.id === item_id);
        llmSelectedItem.value.highlighted = true;
        changeView(view, 'ai_ask_llm');
      }
    };


    /**
     * Handles creating an email draft from AI suggested action
     * Sets the draft content on the message object and logs the activity
     *
     * @param {Object} action - The action object containing draft text
     * @param {Object} message - The message to attach the draft to
     */
    const handleActionCreateDraft = (action, message) => {
      message.draft = action.draft
      emit('log-activity', 'ai_draft_generated', {draft_text: action.draft})
    }


    /**
     * Handles creating a to-do item from AI suggested action
     * Creates a new to-do, adds it to the to-do list, and optionally
     * navigates to the to-do view
     *
     * @param {Object} action - The action object with to-do details
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to to-do view after creation
     */
    const handleActionCreateTodo = (action, message, view=true) => {
      isSupportAsked.value = false
      const newTodo = todoTemplate(action.title, action.description, new Date(action.datetime))
      newTodo.highlighted = true
      newTodo.parent_message = message.id
      handleCreateTodo(newTodo, 'ai_ask_llm')
      handleCloseMessageModal(message)
      if (view)
        changeView('todo', 'ai_ask_llm')
      action.done = true
    }


    /**
     * Handles creating a calendar event from AI suggested action
     * Creates a new event, adds it to the calendar, and optionally
     * navigates to the calendar view
     *
     * @param {Object} action - The action object with event details
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to calendar view after creation
     */
    const handleActionCreateEvent = (action, message, view=true) => {
      isSupportAsked.value = false
      const newEvent = eventTemplate(action.title, new Date(action.datetime), action.duration, action.provisional);
      newEvent.highlighted = true
      newEvent.parent_message = message.id

      const sameEvent = events.value.find((e) => (e['title'] === newEvent.title) && (e['provisional'] === true))
      if (sameEvent)
        handleDeleteEvent(sameEvent, 'ai_ask_llm')

      handleCreateEvent(newEvent, 'ai_ask_llm')
      handleCloseMessageModal(message)
      if (view) {
        changeView('calendar', 'ai_ask_llm')
        llmSelectedItem.value = newEvent
      }
      action.done = true
    }


    /**
     * Handles marking a to-do item as completed from AI suggested action
     * Finds the to-do by ID, marks it as completed, and optionally
     * navigates to the to-do view
     *
     * @param {Object} action - The action object with to-do ID
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to to-do view after marking
     */
    const handleActionMarkTodo = (action, message, view=true) => {
      isSupportAsked.value = false
      const todo = todos.value.find(t => t['id'] === action.id)
      todo.highlighted = true
      todo.parent_message = message.id
      handleToggleTodo(todo, true, 'ai_ask_llm')
      handleCloseMessageModal(message)
      if (view)
        changeView('todo', 'ai_ask_llm')
      action.done = true
    }


    /**
     * Handles editing a to-do item from AI suggested action
     * Updates an existing to-do with new title/description and optionally
     * navigates to the to-do view
     *
     * @param {Object} action - The action object with to-do updates
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to to-do view after editing
     */
    const handleActionEditTodo = (action, message, view=true) => {
      isSupportAsked.value = false
      const todo = todos.value.find(t => t['id'] === action.id);
      const newTodo = {
        ...todo,
        title : action.title ? action.title : todo['title'],
        description: action.description ? action.description : todo['description'],
        highlighted: true,
        parent_message : message.id
      };
      handleUpdateTodo(newTodo, todo, 'ai_ask_llm');
      handleCloseMessageModal(message)
      if (view)
        changeView('todo', 'ai_ask_llm');
      action.done = true;
    }


    /**
     * Handles editing a calendar event from AI suggested action
     * Updates an existing event with new details and handles the event differently
     * based on the current system mode (sys2 = automatic update, other = show modal)
     *
     * @param {Object} action - The action object with event updates
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to calendar view after editing
     */
    const handleActionEditEvent = (action, message, view=true) => {
      isSupportAsked.value = false
      const event = events.value.find(e => e['id'] === action.id)
      const start = new Date(action.datetime);
      const end = new Date(start.getTime() + (action.duration * 60 * 60 * 1000)); // to milliseconds
      const newEvent = {
        ...event,
        title : action.title ? action.title : event['title'],
        start : action.datetime ? api.dateToLocalISO(start) : event['start'],
        end : action.datetime ? api.dateToLocalISO(end) : event['end'],
        provisional: action.provisional,
        highlighted : true,
        parent_message : message.id
      }
      if (system.value === 'sys2') {
        handleUpdateEvent(newEvent, 'ai_ask_llm');
      }
      else {
        handleCloseMessageModal(message)
        llmSelectedItem.value = newEvent
        llmSelectedItem.value['open_modal'] = true
      }
      if (view)
        changeView('calendar', 'ai_ask_llm');

      action.done = true
    }


    /**
     * Handles deleting a calendar event from AI suggested action
     * Finds the event by ID, deletes it, and optionally navigates to the calendar view
     *
     * @param {Object} action - The action object with event ID to delete
     * @param {Object} message - The parent message
     * @param {boolean} [view=true] - Whether to navigate to calendar view after deletion
     */
    const handleActionDeleteEvent = (action, message, view=true) => {
      isSupportAsked.value = false
      const event = events.value.find(e => e['id'] === action.id)
      handleDeleteEvent(event, 'ai_ask_llm')
      handleCloseMessageModal(message)
      if (view)
        changeView('calendar', 'ai_ask_llm')
      action.done = true
    }


    /**
     * Maps action types to their corresponding handler functions
     * Used to dynamically call the appropriate handler based on action type
     *
     * @type {Object.<string, Function>}
     */
    const actionMapFunctions = {
      'create_draft' : handleActionCreateDraft,
      'create_event' : handleActionCreateEvent,
      'create_todo' : handleActionCreateTodo,
      'edit_event' : handleActionEditEvent,
      'edit_todo' : handleActionEditTodo,
      'delete_event' : handleActionDeleteEvent,
    }


    /**
     * Lifecycle hook that runs when the component is mounted
     * Initializes the simulation and sets up progress tracking
     */
    onMounted(() => {
      // Initialize with sample data
      initializeSimulation()
      const progressInterval = setInterval(() => {
        if (getSimulationProgress() >= 100) {
          clearInterval(progressInterval)
        }
      }, 1000)
    })


    /**
     * Changes the current application view and logs the activity
     * Clears selected item if user-initiated view change
     *
     * @param {string} view - The view to change to ('inbox', 'calendar', 'to-do')
     * @param {string} [actor='user'] - Who initiated the view change ('user' or 'ai_ask_llm')
     */
    const changeView = (view, actor = 'user') => {
      const previous = currentView.value
      currentView.value = view
      if (actor === 'user') llmSelectedItem.value = null
      emit('log-activity', 'view_changed', {current: view, previous: previous, actor: actor})
    }


    /**
     * Creates a to-do item template with default values
     *
     * @param {string} title - The title of the to-do
     * @param {string} [description=''] - The description of the to-do
     * @param {Date|null} [due=null] - The due date of the to-do
     * @param {string} [priority='medium'] - The priority level ('low', 'medium', 'high')
     * @returns {Object} A to-do object with generated ID and default values
     */
    const todoTemplate = (title, description='', due=null, priority='medium') => {
      return {
        id: 'TODO_' + todos.value.length,
        title: title,
        description: description,
        completed: false,
        priority: priority,
        dueDate: null
      }
    }


    /**
     * Creates a calendar event template with calculated start/end times
     *
     * @param {string} title - The title of the event
     * @param {Date} datetime - The start date and time
     * @param {number} duration - The duration in hours
     * @param {boolean} [provisional=false] - Whether the event is provisional
     * @returns {Object} An event object with generated ID and formatted dates
     */
    const eventTemplate = (title, datetime, duration, provisional=false) => {
      const start = new Date(datetime);
      const end = new Date(start.getTime() + (duration * 60 * 60 * 1000)); // to milliseconds
      return {
        id: 'EVENT_' + events.value.length,
        title: title,
        start: api.dateToLocalISO(datetime ? start : null),
        end: api.dateToLocalISO(datetime ? end : null),
        provisional: provisional,
      }
    }

    /**
     * Mapping of toast notification keys to display titles
     *
     * @type {Object.<string, string>}
     */
    const toastTitles = {
      'create_event': 'Calendar Event created',
      'create_event_provisional': 'Calendar Event created (Provisional)',
      'create_todo': 'TODO item created',
      'edit_todo': 'TODO item updated',
      'edit_event': 'Calendar Event updated',
      'delete_event' : 'Calendar Event deleted',
      'message_sent' : 'Message successfully sent',
      'event_deleted' : 'Event successfully deleted',
      'pending_create_event': 'Creating Event...',
      'pending_edit_event': 'Updating Event...',
      'pending_delete_event': 'Deleting Event...',
    }

    /**
     * Displays a toast notification with customized content
     *
     * @param {string} toast_key - Key for the toast title lookup
     * @param {string} [type='success'] - Toast type ('success', 'warning', etc.)
     * @param {string} [position='top'] - Toast position on screen
     * @param {number} [duration=4000] - Duration in milliseconds
     * @param {Object|null} [action=null] - Action data to include in toast
     * @param {boolean} [warning=false] - Whether to show warning text
     * @returns {Object} Toast instance (can be dismissed programmatically)
     */
    const showToast = (toast_key, type='success', position='top', duration=8000, action=null, warning=false) => {
      const text = action ?
          ((': ' + action.title) || '') + (toast_key.includes('event') && action.datetime ? formatDateTimeToast(action.datetime) : '') :
          '';

      const k = toast_key.includes('event') && action['provisional'] === true ? 'create_event_provisional' : toast_key
      return $toast.open({
        message: `<span>${toastTitles[k]}</span>` + `${text}` + (warning ? warningText() : ''),
        type: type,
        duration: duration,
        position: position
      })
    };


    /**
     * Formats date and time for display in toast notifications
     *
     * @param {string} datetime - ISO datetime string
     * @returns {string} Formatted date and time HTML string
     */
    const formatDateTimeToast = (datetime) => {
      const messageDate = new Date(datetime);
      const s = messageDate.toLocaleDateString([], { month: 'long', day: 'numeric' }).split(' ')
      return ` <span>(${s[1]} ${s[0]} - ${datetime.slice(11)})</span>`
    }


    /**
     * Generates HTML warning text for calendar conflict notifications
     *
     * @returns {string} HTML string with warning message and close button
     */
    const warningText = () => {
      return    `<br><br><span style="font-weight: bold">The created event conflicts with your calendar.<span><br>
                </span style="font-weight: bold">Please check your calendar.</span><br>
                <span>Click the button to close this message.</span><br>
                <button class="btn-primary" style="font-size: small">Close</button>`
    }

    return {
      api,
      system,
      currentScenario,
      getSimulationProgress,
      currentView,
      testCaptcha,
      messages,
      events,
      todos,
      isSidebarCollapsed,
      isHoveredSidebar,
      unreadCount,
      isSupportAsked,
      toggleSidebar,
      hoverSidebar,
      handleMessageClick,
      handleCloseMessageModal,
      handleMessageReply,
      handleMessageDelete,
      handleEventClick,
      handleCreateEvent,
      handleUpdateEvent,
      handleDeleteEvent,
      handleCloseEvent,
      handleToggleUnread,
      handleConflictEvent,
      markFollowUp,
      handleClickCreateTodo,
      handleCloseModalTodo,
      handleCreateTodo,
      handleEditTodo,
      handleUpdateTodo,
      handleDeleteTodo,
      handleToParentMessage,
      handleToggleTodo,
      askLLM,
      changeView,
      todoTemplate,
      llmSelectedItem,
      performSupport,
      handleActionCreateDraft,
      handleActionCreateTodo,
      handleActionCreateEvent,
      handleActionMarkTodo,
      handleActionEditTodo,
      handleActionEditEvent,
      handleActionDeleteEvent,
    }
  },

  components: {
    InboxView,
    CalendarView,
    TodoView,
    TimerDisplay
  }
}
</script>


<style scoped>
.app-container {
  display: flex;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 100%;
}

.sidebar {
  width: 256px;
  background-color: #f1f3f4;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar.expanded {
  width: 256px;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  position: relative;
}

.inbox-view,
.calendar-view,
.todo-view {
  flex: 1;
  overflow-y: auto;
}

.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s;
  z-index: 1;
}

.resize-indicator {
  width: 6px;
  height: 20px;
  background-color: #ccc;
  position: fixed;
  right: v-bind(supportSectionWidth);
  top: 50%;
  transform: translate(-50%, -50%);
  transition: scale 1s ease;
}

.resize-indicator:hover, .resize-handle:active {
  height: 60px;
}

.support-section.resizing {
  user-select: none;
}

.logo {
  padding: 40px 16px;
  font-size: 20px;
  font-weight: 400;
  color: #202124;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}

.hamburger {
  color: #5f6368;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.hamburger:hover {
  background-color: #f1f3f4;
}

nav {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
}

button {
  width: calc(100% - 16px);
  padding: 0 12px 0 26px;
  margin: 3px 8px;
  border: none;
  border-radius: 0 16px 16px 0;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  color: #202124;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  white-space: nowrap;
}

.material-icons {
  font-size: 20px;
  color: #5f6368;
  flex-shrink: 0;
}

.toggle-support {
  padding: 5px;
  font-size: 30px !important;
  cursor: pointer;
}

.button-text {
  flex: 1;
  transition: opacity 0.1s ease;
}

.unread-count {
  background-color: #1a73e8;
  color: white;
  padding: 0 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.1s ease;
  position: absolute;
  top: -8px;
  right: -1px;
  z-index: 1;
}

.fade-out {
  opacity: 0;
}

.sidebar.expanded .fade-out {
  opacity: 1;
  visibility: visible;
}

button:hover {
  background: #e8f0fe;
  border-inline: 1px solid #cdcdcd;
}

.active {
  background: #e8f0fe;
  border: 1px solid #cdcdcd;
  color: #1a73e8;
  font-weight: 500;
}

.active .material-icons {
  color: #1a73e8;
}

.collapsed .logo {
  justify-content: center;
  padding: 40px 16px;
}

.collapsed .logo-text {
  display: none;
}

.collapsed button {
  width: 50px;
  padding: 0;
  justify-content: center;
  margin: 0 auto 10px;
  border-radius: 30%;
}

.collapsed .material-icons {
  margin: 0;
}

.collapsed .button-text{
  display: none;
}

.collapsed .unread-count {
  right: -4px;
  transform: scale(0.8);
}

/* Tooltip styles for collapsed state */
.collapsed button:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(32, 33, 36, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  margin-left: 8px;
  z-index: 1000;
}

.material-icons {
  font-size: 20px;
  color: #5f6368;
  flex-shrink: 0;
}

.button-text {
  flex: 1;
  transition: opacity 0.1s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Add smooth transition for size changes */
.modal {
  transition: width 0.3s ease, height 0.3s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.logo-panel {
  height: 40px;
  margin: 5px;
  cursor: pointer;
}
</style>
