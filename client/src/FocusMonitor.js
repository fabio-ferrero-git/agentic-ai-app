/**
 * FocusMonitor monitors user focus, mouse activity, and tab/window visibility.
 * It displays warning overlays and plays alert sounds when focus is lost or user is inactive.
 */
class FocusMonitor {
    /**
     * Creates a new FocusMonitor instance
     * @param {Function} start_func - Function to call when countdown starts
     * @param {Function} stop_func - Function to call when countdown stops, receives remaining time as parameter
     * @param {Function} timedout_func - Function to call when countdown reaches zero, receives countdown as parameter
     */
    constructor(start_func, stop_func, timedout_func) {
        this.countdown = 60 // seconds of lost focus before automatic return
        this.inactivityThreshold = 50 // seconds before inactivity warning
        this.inactivityCountdown = 25 // seconds to respond to inactivity warning
        this.timer = null
        this.inactivityTimer = null
        this.inactivityWarningTimer = null
        this.lastMouseMoveTime = Date.now()
        this.titleFlashTimer = null
        this.audioContext = null
        this.overlay = this.createOverlay()
        this.inactivityOverlay = this.createInactivityOverlay()
        this.isMouseInWindow = true
        this.isWindowFocused = true
        this.isTabActive = true
        this.originalTitle = document.title
        this.isCounting = false
        this.isInactivityWarning = false
        this.setupEventListeners()
        this.start_func = start_func
        this.stop_func = stop_func
        this.timedout_func = timedout_func

        // Store the initial state
        this.updateFocusState()
        this.startInactivityCheck()
        this.verifying_captcha = false
    }


    /**
     * Sets the captcha verification state
     * @param {boolean} val - Whether captcha verification is in progress
     */
    setVerifyingCaptcha(val) {
        this.verifying_captcha = val
    }


    /**
     * Creates and appends the focus lost overlay to the document
     * @returns {HTMLElement} The created overlay element
     */
    createOverlay() {
        const overlay = document.createElement('div')
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-size: 24px;
        `
        document.body.appendChild(overlay)
        return overlay
    }

    /**
     * Creates and appends the inactivity warning overlay to the document
     * @returns {HTMLElement} The created inactivity overlay element
     */
    createInactivityOverlay() {
        const overlay = document.createElement('div')
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: white;
            font-size: 24px;
        `
        document.body.appendChild(overlay)
        return overlay
    }

    /**
     * Starts flashing the document title with warning messages
     */
    startTitleFlash() {
        if (this.titleFlashTimer) return

        let isOriginal = true
        this.titleFlashTimer = setInterval(() => {
            const message = this.isInactivityWarning
                ? `⚠ Move mouse to continue (${this.formatTime(this.inactivityCountdown)})`
                : `⚠ Discarding in ${this.formatTime(this.countdown)}`
            document.title = isOriginal ? message : this.originalTitle
            isOriginal = !isOriginal
        }, 1000)
    }

    /**
     * Stops the title flashing and restores original document title
     */
    stopTitleFlash() {
        if (this.titleFlashTimer) {
            clearInterval(this.titleFlashTimer)
            this.titleFlashTimer = null
            document.title = this.originalTitle
        }
    }

    /**
     * Updates focus state based on mouse, window, and tab status
     * Starts or stops countdown based on current focus
     */
    updateFocusState() {
        const hasFocus = this.isMouseInWindow && this.isWindowFocused && this.isTabActive

        if (!hasFocus) {
            this.startCountdown()
        } else {
            this.checkAndStopCountdown()
        }
    }

    /**
     * Sets up all event listeners for tracking focus, mouse, and tab state
     */
    setupEventListeners() {
        // Tab visibility change detection
        document.addEventListener('visibilitychange', () => {
            this.isTabActive = !document.hidden
            this.updateFocusState()
        })

        // Mouse tracking with debouncing for reliability
        let mouseOutTimer
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null && e.toElement === null) {
                clearTimeout(mouseOutTimer)
                mouseOutTimer = setTimeout(() => {
                    this.isMouseInWindow = false
                    this.updateFocusState()
                }, 100) // Small delay to prevent false triggers
            }
        })

        document.addEventListener('mouseover', () => {
            clearTimeout(mouseOutTimer)
            this.isMouseInWindow = true
            this.updateFocusState()
        })

        // Track mouse movement for inactivity
        document.addEventListener('mousemove', () => {
            this.lastMouseMoveTime = Date.now()
            if (this.isInactivityWarning) {
                this.stopInactivityWarning()
            }
        })

        // Window focus/blur - using both window and document events for better cross-browser support
        window.addEventListener('blur', () => {
            this.isWindowFocused = false
            this.updateFocusState()
        })

        window.addEventListener('focus', () => {
            this.isWindowFocused = true
            this.updateFocusState()
        })

        // Additional document-level focus events for better detection
        document.addEventListener('blur', () => {
            this.isWindowFocused = false
            this.updateFocusState()
        })

        document.addEventListener('focus', () => {
            this.isWindowFocused = true
            this.updateFocusState()
        })

        // Handle page visibility changes
        document.addEventListener('pagehide', () => {
            this.isTabActive = false
            this.updateFocusState()
        })

        document.addEventListener('pageshow', () => {
            this.isTabActive = true
            this.updateFocusState()
        })
    }

    /**
     * Starts checking for user inactivity
     */
    startInactivityCheck() {
        if (this.inactivityTimer) return

        this.inactivityTimer = setInterval(() => {
            const timeSinceLastMove = (Date.now() - this.lastMouseMoveTime) / 1000
            if (timeSinceLastMove >= this.inactivityThreshold && !this.isInactivityWarning) {
                this.startInactivityWarning()
            }
        }, 1000)
    }

    /**
     * Starts inactivity warning countdown and displays warning overlay
     */
    startInactivityWarning() {
        this.isInactivityWarning = true
        this.inactivityOverlay.style.display = 'flex'
        this.startTitleFlash()

        let remainingTime = this.inactivityCountdown
        this.inactivityWarningTimer = setInterval(() => {
            remainingTime--
            this.inactivityOverlay.textContent = `Are you still there? Move your mouse to prevent automatic return (${this.formatTime(remainingTime)})`

            if (remainingTime <= 0) {
                this.stopInactivityWarning()
                this.timedout_func(this.countdown)
            }
        }, 1000)

        this.playNotification()
    }

    /**
     * Stops inactivity warning and hides overlay
     */
    stopInactivityWarning() {
        if (!this.isInactivityWarning) return

        this.isInactivityWarning = false
        this.inactivityOverlay.style.display = 'none'
        if (this.inactivityWarningTimer) {
            clearInterval(this.inactivityWarningTimer)
            this.inactivityWarningTimer = null
        }
        if (!this.isCounting) {
            this.stopTitleFlash()
        }
    }

    /**
     * Checks if all focus conditions are met and stops countdown if true
     */
    checkAndStopCountdown() {
        if (this.isMouseInWindow && this.isWindowFocused && this.isTabActive) {
            this.stopCountdown()
        }
    }

    /**
     * Formats seconds into MM:SS display format
     * @param {number} seconds - Seconds to format
     * @returns {string} Formatted time string (MM:SS)
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    /**
     * Plays audio notification beeps to alert user
     * @returns {Promise<void>}
     */
    async playNotification() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        }

        const playBeep = () => {
            if (!this.isCounting && !this.isInactivityWarning) return

            const oscillator = this.audioContext.createOscillator()
            const gainNode = this.audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(this.audioContext.destination)

            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime)
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)

            oscillator.start()
            oscillator.stop(this.audioContext.currentTime + 0.1)
        }

        // Play first beep
        playBeep()

        // Only play second beep if still counting or in warning
        if (this.isCounting || this.isInactivityWarning) {
            await new Promise(resolve => setTimeout(resolve, 200))
            playBeep()
        }
    }

    /**
     * Starts countdown when focus is lost, displays overlay, and plays notifications
     */
    startCountdown() {
        if (this.verifying_captcha)
            return;
        if (this.isCounting) return
        this.isCounting = true
        this.overlay.style.display = 'flex'
        this.startTitleFlash()

        // Stop inactivity checking when main overlay is shown
        if (this.inactivityTimer) {
            clearInterval(this.inactivityTimer)
            this.inactivityTimer = null
        }
        this.stopInactivityWarning()

        let soundCounter = 0
        this.timer = setInterval(() => {
            if (!this.isCounting) {
                clearInterval(this.timer)
                this.timer = null
                return
            }

            this.countdown--
            this.overlay.textContent = `Please return to the study. Otherwise, your submission will automatically be returned in: ${this.formatTime(this.countdown)}`

            soundCounter++
            if (soundCounter >= 15) {
                this.playNotification()
                soundCounter = 0
            }

            if (this.countdown <= 0) {
                this.stopCountdown()
                this.timedout_func(this.countdown)
            }
        }, 1000)
        this.start_func()
    }

    /**
     * Stops countdown, hides overlay, and restarts inactivity checking
     */
    stopCountdown() {
        if(!this.isCounting) return
        this.isCounting = false
        this.overlay.style.display = 'none'
        if (!this.isInactivityWarning) {
            this.stopTitleFlash()
        }
        this.stop_func(this.countdown)
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }

        // Restart inactivity checking when focus is regained
        this.lastMouseMoveTime = Date.now() // Reset the timer
        this.startInactivityCheck()
    }
}

export default FocusMonitor;