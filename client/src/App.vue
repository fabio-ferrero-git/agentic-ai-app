<template>
  <div class="study-container">
    <UuidDisplay :uuid="userUuid" />
    <TimerDisplay v-if="currentPhase === 'interface'"
                  :timerConfig="interfaceTimer"
                  @on-start="startInterfaceTimer(true)"
                  @on-end="clearInterfaceTimer"/>

    <ProgressBar :current-phase="currentPhase" :phases="phases" />

    <component :is="currentPhaseComponent"
               :user-uuid="userUuid"
               :current-phase="currentPhase"
               @next-phase="nextPhase"
               @log-activity="logActivity"
               @completed="endStudy('completed')"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import UuidDisplay from './components/UuidDisplay.vue'
import ProgressBar from './components/ProgressBar.vue'
import IntroductionPhase from './components/phases/IntroductionPhase.vue'
import ConsentPhase from './components/phases/ConsentPhase.vue'
import BeforeInterfacePhase from "@/components/phases/BeforeInterfacePhase.vue";
import InterfacePhase from './components/phases/InterfacePhase.vue'
import GridQuestionnairePhase from './components/phases/GridQuestionnairePhase.vue'
import NasaTLX from './components/phases/NasaTLX.vue'
import FreeTextPhase from './components/phases/FreeTextPhase.vue'
import EndPhase from './components/phases/EndPhase.vue'
import { useActivityLogger } from './composables/activityLogger'
import { useUserCreation } from './composables/userCreation'
import FocusMonitor from "@/FocusMonitor";
import TimerDisplay from "@/components/TimerDisplay.vue";
import TimerDisplayConfig from "@/composables/TimerDisplayConfig.js";
import TiA_PreTask from "@/components/phases/TiAPreTask.vue";
import TiA_PostTask from "@/components/phases/TiAPostTask.vue";
import DesirabilityOfControl from "@/components/phases/DesirabilityOfControl.vue";
import SystemInstruction from "@/components/phases/SystemInstruction.vue";
import Swal from 'sweetalert2'

/**
 * Main component that manages the user study flow through different phases.
 */
export default {

  components: {
    TimerDisplay,
    UuidDisplay,
    ProgressBar,
    Swal,
  },

  setup() {
    const interfaceTimer = TimerDisplayConfig

    /**
     * @const {FocusMonitor} focusMonitor
     * @description Monitors user focus on the page and handles timeouts
     * @param {Function} onBlur - Callback when user loses focus
     * @param {Function} onFocus - Callback when user regains focus
     * @param {Function} onTimeout - Callback when study times out
     */
    const focusMonitor = new FocusMonitor(
        () => {
          stopInterfaceTimer();
          logActivity('focus_monitor', {'focus': false})
        },
        (cnt) => {
          startInterfaceTimer();
          logActivity('focus_monitor', {'focus': true, counter: cnt})
        },
        (cnt) => {
          logActivity('timed_out', {counter: cnt})
          endStudy('timedout')
        }
    )

    const { logActivity, endStudy } = useActivityLogger(focusMonitor)
    const { createUser } = useUserCreation()

    /**
     * @const {Array<string>} phases
     * @description Ordered list of all study phases
     */
    const phases = [
        'consent',
        'introduction',
        'before-interface',
        'desirability-of-control',
        'tia-pre-task',
        'sys-instruction',
        'interface',
        'tia-post-task',
        'nasa-tlx',
        'grid-questionnaire',
        'free-text',
        'end'
    ]
    const currentPhase = ref('consent')
    const userUuid = ref('')


    const currentPhaseComponent = computed(() => {
      const componentMap = {
        introduction: IntroductionPhase,
        consent: ConsentPhase,
        'sys-instruction': SystemInstruction,
        'desirability-of-control' : DesirabilityOfControl,
        'tia-pre-task' : TiA_PreTask,
        'before-interface': BeforeInterfacePhase,
        interface: InterfacePhase,
        'tia-post-task' : TiA_PostTask,
        'nasa-tlx': NasaTLX,
        'grid-questionnaire': GridQuestionnairePhase,
        'free-text': FreeTextPhase,
        end: EndPhase
      }
      return componentMap[currentPhase.value]
    })

    onMounted(async () => {
      userUuid.value = await createUser()

      if (sessionStorage.getItem('sys') === 'sys0') {
        phases.splice(phases.indexOf('grid-questionnaire'), 1)
      }

      await logActivity('study_started', { phase: 'consent' })

      await logActivity('screen_dimension', { w: screen.width, h: screen.height, user_agent: navigator.userAgent})

      // Check if the device's screen is smaller than typical desktop dimensions
      if ((screen.width < 1024 || screen.height < 768) ||
          (/iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i.test(navigator.userAgent))) {
        alert('This study requires a desktop computer. Please switch to a desktop computer to continue.')
        await endStudy('incompatible_device')
      }
    })

    const nextPhase = () => {
      const currentIndex = phases.indexOf(currentPhase.value)
      const nextPhase = phases[currentIndex + 1]
      currentPhase.value = nextPhase
      logActivity('phase_change', { from: phases[currentIndex], to: nextPhase })
      if(nextPhase === 'end') {
        logActivity('study_ended', {})
      }
    }

    const stopInterfaceTimer = () => {
      interfaceTimer.stop();
    }

    const startInterfaceTimer = (start=false) => {
      interfaceTimer.start(start)
    }

    const clearInterfaceTimer = () => {
      interfaceTimer.clear();
      logActivity('interface_timer', {after_alert: false})

      Swal.fire({
        title: 'The time for the simulation is over',
        text: 'You will now be directed to the evaluation phase. Please DO NOT close the page.',
        icon: 'info',
        confirmButtonText: 'Continue',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((res) => {
        if (res.isConfirmed) {
          logActivity('interface_timer', {after_alert: true})
          nextPhase()
        }
      })
    }

    return {
      currentPhase,
      interfaceTimer,
      phases,
      userUuid,
      currentPhaseComponent,
      startInterfaceTimer,
      clearInterfaceTimer,
      nextPhase,
      logActivity,
      endStudy
    }
  }
}
</script>

<style scoped>
.study-container {
  margin: 0;
  padding: 5px 20px 10px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.phase {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 95vh;
}
</style>
