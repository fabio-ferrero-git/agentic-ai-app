import { ref, onMounted } from 'vue'
import TimerDisplayConfig from "@/composables/TimerDisplayConfig.js";
import timerDisplay from "@/components/TimerDisplay.vue";
/**
 * Vue composable for handling Google reCAPTCHA v2 and v3 integration.
 * Provides functionality to load reCAPTCHA scripts, execute v3 challenges,
 * and display v2 dialog boxes when needed.
 *
 * @param {string} v3SiteKey - The site key for reCAPTCHA v3
 * @param {string} v2SiteKey - The site key for reCAPTCHA v2
 * @returns {Object} An object containing reCAPTCHA utility functions and state
 */
export function useRecaptcha(v3SiteKey, v2SiteKey) {
    const isLoaded = ref(false)
    const token = ref('')
    const interfaceTimer = TimerDisplayConfig

    /**
     * Loads both reCAPTCHA v2 and v3 scripts on component mount
     */
    onMounted(() => {
        // Load both reCAPTCHA scripts
        const scriptV3 = document.createElement('script')
        scriptV3.src = `https://www.google.com/recaptcha/api.js?render=${v3SiteKey}`

        const scriptV2 = document.createElement('script')
        scriptV2.src = 'https://www.google.com/recaptcha/api.js'

        Promise.all([
            new Promise(resolve => {
                scriptV3.onload = resolve
                document.head.appendChild(scriptV3)
            }),
            new Promise(resolve => {
                scriptV2.onload = resolve
                document.head.appendChild(scriptV2)
            })
        ]).then(() => {
            isLoaded.value = true
        })
    })

    /**
     * Executes a reCAPTCHA v3 challenge with the specified action
     *
     * @param {string} action - The action name to be associated with this verification
     * @returns {Promise<string>} A promise that resolves to the reCAPTCHA token
     * @throws {Error} If reCAPTCHA execution fails
     */
    const executeRecaptchaV3 = async (action) => {
        if (!isLoaded.value) {
            await new Promise(resolve => {
                const checkLoaded = setInterval(() => {
                    if (isLoaded.value) {
                        clearInterval(checkLoaded)
                        resolve()
                    }
                }, 100)
            })
        }

        try {
            token.value = await window.grecaptcha.execute(v3SiteKey, { action })
            return token.value
        } catch (error) {
            console.error('reCAPTCHA v3 execution failed:', error)
            throw error
        }
    }

    /**
     * Displays a modal with reCAPTCHA v2 challenge when explicit verification is needed
     *
     * @param {Object} focusMonitor - Object to track captcha verification state
     * @returns {Promise<string>} A promise that resolves to the reCAPTCHA token when verification completes
     */
    const showRecaptchaV2Dialog = (focusMonitor) => {
        return new Promise((resolve) => {
            interfaceTimer.setCaptcha(true);
            interfaceTimer.stop()
            focusMonitor.setVerifyingCaptcha(true)
            // Create modal for v2 CAPTCHA
            const modal = document.createElement('div')
            modal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                    <div style="background: white; padding: 20px; border-radius: 8px; max-width: 400px; width: 100%;">
                        <h3 style="margin-top: 0;">Please Verify</h3>
                        <p>For security purposes, please complete this quick verification.</p>
                        <div id="recaptcha-container"></div>
                        <p style="font-size: 0.8em; color: #666;">This helps us ensure the quality of our study data. Thank you for your understanding.</p>
                    </div>
                </div>`
            document.body.appendChild(modal)

            // Render the v2 CAPTCHA
            window.grecaptcha.render('recaptcha-container', {
                sitekey: v2SiteKey,
                callback: (response) => {
                    interfaceTimer.setCaptcha(false);
                    interfaceTimer.start()
                    focusMonitor.setVerifyingCaptcha(false)
                    modal.remove()
                    resolve(response)
                }
            })
        })
    }

    return {
        executeRecaptchaV3,
        showRecaptchaV2Dialog,
        isLoaded,
        token
    }
}