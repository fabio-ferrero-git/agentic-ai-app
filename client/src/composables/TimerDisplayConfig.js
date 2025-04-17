import { reactive } from 'vue'

/**
 * Reactive timer state object that maintains the timer's current state
 * @type {Object}
 * @property {number} duration - Initial timer duration in seconds
 * @property {number} current - Current remaining time in seconds
 * @property {boolean} active - Indicates if the timer is currently running
 * @property {number|null} interval - Reference to the setInterval instance
 * @property {boolean} captcha - Flag indicating if timer is blocked by captcha
 */
const timer = reactive({
    duration: 300, // sec
    current: 300,
    active: false,
    interval: null,
    captcha : false,
})

/**
 * Timer controller with immutable methods to manage timer state
 */
export default Object.freeze({
    /**
     * Get current timer state
     * @returns {Object} Current timer state object
     */
    getState: () => timer,

    /**
     * Start the timer countdown
     * @param {boolean} [start=false]
     * @returns {void}
     */
    start: (start = false) => {
        if (timer.captcha === true)
            return
        if (start === true || timer.active === true) {
            timer.active = true
            timer.interval = setInterval(() => {
                if (timer.current > 0) {
                    timer.current--
                } else {
                    // alert('finish')
                }
            }, 1000)
        }
    },

    /**
     * Stop the timer countdown without resetting state
     * @returns {void}
     */
    stop: () => {
        clearInterval(timer.interval);
    },

    /**
     * Reset the timer to its initial state
     * @returns {void}
     */
    clear: () => {
        clearInterval(timer.interval);

        timer.active = false;
        timer.interval = null;
        timer.captcha = false;
    },

    /**
     * Set the captcha state to block or unblock the timer
     * @param {boolean} captcha - Whether to block the timer with captcha
     * @returns {void}
     */
    setCaptcha : (captcha) => {
        timer.captcha = captcha
    }
})
