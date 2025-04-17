<template>
  <div style="position: relative;">

    <div v-if="system === 'sys1'" class="ai-support">
      <div v-if="!localSupport || localSuggestedActions.length === 0">
        <support-header text="I'm generating automatic suggestions for your needs..."/>
        <Skeletor width="50%"/>
        <Skeletor width="70%"/>
        <Skeletor width="90%"/>
      </div>

      <!--  Body  -->
      <div v-else>
        <support-header text="I can help you manage this email"/>
        <div class="button-container">
          <div v-for="(action, idx) in localSupport" :key="idx">
            <div class="material-button"
                 :class="{'action-clicked' : action['clicked'], 'button-disabled': action['done']}"
                 @click="doAction(action)">
              <span class="material-icons">{{ iconMap[action['action']] }}</span>
              <div class="button-content">
                <span class="button-title">
                  <span style="font-weight: bold">{{ actionMap[createEventActionName(action)] }} </span>
                </span>
                <span class="button-body">
                  <span>{{titleMap[action['action']]}}</span>
                  <span style="font-weight: bold"> {{action.title}}
                    <span v-if="hasDatetime(action)">{{hasDatetime(action)}}</span>
                  </span>
                </span>
              </div>
            </div>
            <div v-if="action['conflict_events'] && !action['done']">
              <div v-if="action['provisional']" class="conflict-container">
                <span class="material-icons conflict-icon">event_busy</span>
                <span class="conflict">The proposed event conflicts with your calendar. Please, check whether the above alternative solution fits you.</span>
              </div>
              <div v-else>
                <div v-for="c in action['conflict_events']" class="conflict-container">
                  <span class="material-icons conflict-icon">event_busy</span>
                  <span class="conflict" @click="toConflict(c)" style="padding: 0">
                    The proposed event conflicts with the following event on your calendar:
                    <span style="font-weight: bold">{{c.title}}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
          <template v-if="localSuggestedActions.length > (localSupport || []).length">
            <div v-for="i in localSuggestedActions.length - (localSupport || []).length" :key="'skeleton-'+i">
              <Skeletor width="70%"/>
              <Skeletor width="50%"/>
              <Skeletor width="90%"/>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="toolbar-close-btn">
      <p @click="$emit('close')">Close</p>
      <button class="icon-button" @click="$emit('close')">
        <span class="material-icons-outlined">close</span>
      </button>
    </div>
  </div>
</template>



<script>
import SupportHeader from "@/components/inbox/SupportHeader.vue";
import Loading from 'vue-loading-overlay';
import 'vue-skeletor/dist/vue-skeletor.css';
import { Skeletor } from 'vue-skeletor';

export default {
  name: 'SupportSection',

  components : {
    SupportHeader,
    Loading,
    Skeletor
  },

  props : {
    message : {
      type: Object,
      required: true
    },

    events : {
      type: Array,
      required: true
    },

    system : {
      type: String,
      required: true
    }
  },


  data() {
    return {
      localSuggestedActions: [],
      localSupport: [],
      shouldUpdate: true,
      iconMap : {
        'create_draft' : 'text_fields',
        'create_todo' : 'task_alt',
        'create_event' : 'event',
        'mark_todo' : 'done',
        'edit_todo' : 'edit',
        'edit_event' : 'edit',
        'delete_event' : 'delete_forever',
      },
      actionMap : {
        'create_draft' : 'Create a Draft Response',
        'create_todo' : 'Create new Todo',
        'create_event' : 'Create new Event',
        'create_event_provisional' : 'Create new provisional Event',
        'mark_todo' : 'Mark Todo',
        'edit_todo' : 'Edit Todo',
        'edit_event' : 'Edit Event',
        'delete_event' : 'Delete Event',
      },
      titleMap : {
        'create_draft' : 'Response to: ',
        'create_todo' : 'Todo Title: ',
        'create_event' : 'Event Title: ',
        'mark_todo' : 'Todo Title: ',
        'edit_todo' : 'Event Title: ',
        'edit_event' : 'Event Title: ',
        'delete_event' : 'Event Title: ',
      },
    }
  },


  watch: {
    'message.suggested_actions' : {
      immediate: true,
      deep: true,
      handler(newMessageSuggestedAction) {
        if (!this.shouldUpdate) return;
        const newSuggestedActions = newMessageSuggestedAction;

        if (JSON.stringify(this.localSuggestedActions) !== JSON.stringify(newSuggestedActions) && newSuggestedActions && newSuggestedActions.length > 0) {
          this.localSuggestedActions = [...newSuggestedActions];
          this.$nextTick(() => {
            this.$emit('update-suggested-action', this.localSuggestedActions);
          });
        }
      }
    },
    'message.support': {
      immediate: true,
      deep: true,
      handler(newMessageSupport, oldMessageSupport) {
        if (!this.shouldUpdate) return;

        const newSupport = newMessageSupport;

        if (newSupport && JSON.stringify(newSupport) !== JSON.stringify(this.localSupport)) {
          this.localSupport = [...newSupport];
        }

        // Check if we should stop updating
        if (this.localSuggestedActions && this.localSuggestedActions.length > 0 && this.localSuggestedActions.length <= (newSupport || []).length) {
          this.shouldUpdate = false;
        }
      }
    }
  },

  methods : {
    /**
     * Perform support action.
     */
    doAction(action) {
      const actionIndex = this.localSupport.findIndex(a => a === action);
      if (actionIndex !== -1) {
        if (action['action'] !== 'create_draft')
          this.localSupport[actionIndex] = { ...action, clicked: true };
        if (this.localSupport[actionIndex]['conflict_events']) {
          delete this.localSupport[actionIndex]['conflict_events'];
        }
      }

      this.$emit('action', this.$props.message, action);
    },

    toConflict(conflict_event) {
      this.$emit('conflict-event', conflict_event);
    },

    createEventActionName(action) {
      if (action.action === 'create_event' && action.provisional === true)
        return 'create_event_provisional'
      return action.action
    },

    hasDatetime(action) {
      let isEvent =  action['action'].includes('event') && action['datetime']
      if (isEvent) {
        const messageDate = new Date(action['datetime']);
        const s = messageDate.toLocaleDateString([], { month: 'long', day: 'numeric' }).split(' ')
        return ` (${s[1]} ${s[0]} - ${action['datetime'].slice(11)})`
      }
    },

    /**
     * Force update of suggested actions and support
     */
    forceUpdateSuggestedActions() {
      this.shouldUpdate = true;

      if (this.message.suggested_actions) {
        this.localSuggestedActions = [...this.message.suggested_actions];
        this.$emit('update-suggested-action', this.localSuggestedActions);
      }

      if (this.message.support) {
        this.localSupport = [...this.message.support];
      }
    }
  },
}
</script>


<style scoped>

.ai-support {
  margin-top: 10px;
  padding: 10px;
  background-color: #f3f7fd;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  width: 100%;
}

.material-button {
  flex: 1;
  min-width: 180px;
  padding: 10px;
  background: #f8f9fa;
  border: 1px solid #dadce0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s, box-shadow 0.2s;
}

.material-button:hover {
  background: #f1f3f4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.material-button:active {
  background: #e8eaed;
}

.button-disabled {
  pointer-events: none;
  background: #dddddd;
}

.button-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
}

.button-title {
  color: #202124;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 4px;
}

.button-body {
  color: #5f6368;
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
}

.button-body span {
  color: #074aa3;
}

.action-clicked {
  background-color: #dddddd;
}

.toolbar-right {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-close-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.toolbar-close-btn p {
  font-weight: bold;
  padding-right: 5px;
  cursor: pointer;
}

.toolbar-right p {
  font-weight: bold;
  padding-right: 5px;
  cursor: pointer;
}

.icon-button {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 50%;
  color: #5f6368;
  cursor: pointer;
}

.icon-button:hover {
  background: #f1f3f4;
}

.conflict-container {
  background-color: #ffe4e4;
  margin-top: 5px;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.conflict:hover {
  text-decoration: underline;
  cursor: pointer;
}

.conflict {
  font-size: 13px;
}

.conflict-icon {
  font-size: 16px;
}
</style>