import axios from 'axios'
import {baseURL} from "@/composables/url.js";
import {scenarios} from '@/composables/simulationScenarios.js'

/**
 * Base URL endpoint for creating a new LLM user
 * @constant {string}
 */
const create_user_url = baseURL + "/create-llm-user"

/**
 * Composable function for user creation operations
 * @returns {Object} Object containing user creation methods
 */
export function useUserCreation() {
    /**
     * Creates a new user based on URL parameters and saves user data to session storage
     *
     * @async
     * @function createUser
     * @returns {Promise<string|null>} The UUID of the created user, or null if an error occurred
     * @description
     * This function:
     * 1. Extracts URL parameters 'prolific_id' and 'job'
     * 2. Makes a GET request to create a user on the server
     * 3. Parses the response to extract uuid, condition, and scenario
     * 4. Stores these values in session storage
     * 5. Returns the uuid on success or null on failure
     */
    const createUser = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const response = await axios.get(create_user_url, {
                params: {
                    prolific_id: urlParams.get('prolific_id'),
                    job: urlParams.get('job')
                }
            })
            const data = response.data.split(",")
            const uuid = data[0]
            const assigned_condition = data[1]
            const assigned_scenario = data[2]
            sessionStorage.setItem("uuid", uuid)
            sessionStorage.setItem("sys", 'sys'+assigned_condition)
            sessionStorage.setItem("scenario-key", urlParams.get('job') + '+' + scenarios[urlParams.get('job')][assigned_scenario].id)
            return uuid
        } catch (error) {
            console.error('Error creating user:', error)
            return null
        }
    }

    return {createUser}
}
