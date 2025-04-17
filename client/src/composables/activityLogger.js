import { ref } from 'vue'
import axios from 'axios'
import { useRecaptcha } from './useRecaptcha'
import {baseURL} from "@/composables/url.js";

// Define the base URL for logging activities
const logs_url = baseURL + "/llm-log"

// reCAPTCHA site keys for v3 and v2
const RECAPTCHA_V3_SITE_KEY = '6Lexbo4qAAAAAIfgmwBYhizzH2GF3U2l5a3ktJou'
const RECAPTCHA_V2_SITE_KEY = '6Lchdo4qAAAAAHE8D3ns9pRJyOj4qT8Jq-Xx9pki'

// URLs for redirecting users based on study status
const completed_url = 'https://app.prolific.com/submissions/complete?cc=CK20N0X5'
const timedout_url = 'https://app.prolific.com/submissions/complete?cc=CCQDMO1Z'
const incompatible_device_url = 'https://app.prolific.com/submissions/complete?cc=C1D79OJV'


/**
 * Composable function to handle activity logging and study completion redirection.
 * @param {Object} focusMonitor - An object to monitor user focus, used for reCAPTCHA v2.
 * @returns {Object} - Contains `logActivity` and `endStudy` functions.
 */
export function useActivityLogger(focusMonitor) {
    const isProcessing = ref(false)
    const requestQueue = ref([])


    const redirectTo = ref(null)

    // Destructure reCAPTCHA functions from the custom composable
    const { executeRecaptchaV3, showRecaptchaV2Dialog } = useRecaptcha(RECAPTCHA_V3_SITE_KEY, RECAPTCHA_V2_SITE_KEY)

    /**
     * Redirects the user to the appropriate Prolific completion URL once the log queue is cleared.
     * @param {string} status - The study status ('completed', 'incompatible_device', or 'timedout').
     * @returns {Promise<void>}
     */
    const endStudy = async (status) => {
        if(requestQueue.value.length === 0 && !isProcessing.value) {
            if(status === 'completed')
                location.href = completed_url
            else if(status === 'timedout')
                location.href = timedout_url
            else if(status === 'incompatible_device')
                location.href = incompatible_device_url
        }
        else if (status === 'completed') {
            redirectTo.value = completed_url;
        } else if (status === 'timedout') {
            redirectTo.value = timedout_url;
        }
        else if (status === 'incompatible_device') {
            redirectTo.value = incompatible_device_url;
        }
    }


    /**
     * Logs user activity by sending data to the server.
     * Adds reCAPTCHA tokens periodically or for specific activity types.
     * @param {string} type - The type of activity being logged.
     * @param {Object} data - Additional data to log.
     * @returns {Promise<void>}
     */
    const logActivity = async (type, data) => {
        let enriched_data = {
            ...data,
            type: type,
            user_id: sessionStorage.getItem("uuid")
        }

        // Get reCAPTCHA token periodically
        if (Math.random() < 0.01 || type === 'answered-questions') {
            try {
                const recaptchaToken = await executeRecaptchaV3('log_activity')
                enriched_data.recaptcha_token = recaptchaToken
                enriched_data.recaptcha_version = 'v3'
            } catch (error) {
                console.error('Failed to get reCAPTCHA v3 token:', error)
            }
        }

        requestQueue.value.push(enriched_data)
        if (!isProcessing.value) {
            await processQueue()
        }
    }


    /**
     * Processes the request queue by sending each log to the server.
     * Handles reCAPTCHA v2 verification if required by the server.
     * @returns {Promise<void>}
     */
    const processQueue = async () => {
        isProcessing.value = true
        while (requestQueue.value.length > 0) {
            const data = requestQueue.value[0] // Don't shift yet, in case we need to retry
            try {
                const response = await axios.post(logs_url, data)
                if (response.data?.requireV2Verification) {
                    try {

                        const v2Token = await showRecaptchaV2Dialog(focusMonitor)
                        // Retry the request with the v2 token
                        await axios.post(logs_url, {
                            ...data,
                            recaptcha_token: v2Token,
                            recaptcha_version: 'v2'
                        })
                        await logActivity('recaptcha_v2', {})
                    } catch (v2Error) {
                        console.error('V2 verification failed:', v2Error)
                        // Maybe show a user-friendly error message here
                    }
                }
                requestQueue.value.shift() // Remove the processed request
            } catch (error) {
                console.error('Error logging data:', error)
            }
        }
        isProcessing.value = false
        if(redirectTo.value){
            location.href = redirectTo.value
        }
    }

    return { logActivity, endStudy }
}
