import {useApi} from "@/composables/useApi.js";

const defaultUserName = 'John Doe'

/**
 * Adjusts a given ISO date string to the next day while preserving the time.
 *
 * @param {string} dateStr - The ISO date string to adjust.
 * @returns {string} - The adjusted ISO date string in local time.
 */
function getRightDateTime(dateStr){
    const date = useApi().localISOToDate(dateStr)  // Convert ISO string to a Date object.
    const newDate = new Date() // Create a new Date object for the current date.
    newDate.setDate(newDate.getDate() + 1) // Move to the next day.
    newDate.setHours(date.getHours()) // Set the hours from the original date.
    newDate.setMinutes(date.getMinutes()) // Set the minutes from the original date.

    return useApi().dateToLocalISO(newDate);
}


/**
 * Replaces the default username in a draft string with a specified username.
 *
 * @param {string} draftStr - The draft string containing the default username.
 * @param {string} username - The username to replace the default username with.
 * @returns {string} - The updated draft string with the new username.
 */
function getRightDraftSignature(draftStr, username) {
    return draftStr.replace(defaultUserName, username)
}


/**
 * Updates the timestamps and draft signatures in a scenarios object.
 *
 * @param {Object} scenarios - The scenarios object containing categories and actions.
 * @param {string} username - The username to replace the default username in drafts.
 * @returns {Object} - A new scenarios object with updated timestamps and draft signatures.
 */
export function updateTimestamps(scenarios, username) {
    // Deep clone the scenarios object to avoid modifying the original
    const updatedScenarios = JSON.parse(JSON.stringify(scenarios));

    /**
     * Processes an array of scenario actions, updating their timestamps and draft signatures.
     *
     * @param {Array} array - The array of scenario actions to process.
     */
    function processScenarioArray(array) {
        array.forEach(item => {
            if (Array.isArray(item)) {
                // Each item in this array is an action object
                item.forEach(action => {
                    if (action.datetime) {
                        action.datetime = getRightDateTime(action.datetime);
                    }
                    if(action.draft) {
                        action.draft = getRightDraftSignature(action.draft, username);
                    }
                });
            }
        });
    }

    // Iterate through each category (e.g., "sales", "human_resources")
    Object.keys(updatedScenarios).forEach(category => {
        updatedScenarios[category].forEach(scenario => {
            // Each scenario is an object with a single key
            Object.keys(scenario).forEach(scenarioKey => {
                processScenarioArray(scenario[scenarioKey]);
            });
        });
    });

    return updatedScenarios;
}


export const preloadedScenarios_fixedTimestamp = {
    /*
    Sales
     */
    "sales": [
        {
            "sales_pressure_complex": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "CEO",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "draft": "Dear CEO,\n\nThank you for your message regarding the emergency board meeting tomorrow. I am preparing the necessary materials as requested, including the current pipeline status, risk analysis, customer acquisition costs, and churn metrics.\n\nPlease let me know if there are any additional requirements or changes.\n\nBest regards,\nJohn Doe",
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "title": "Emergency Board Meeting",
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "Prepare Q4 Projections for Board Meeting",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "description": "Prepare current pipeline status, risk analysis, customer acquisition costs, and churn metrics for the emergency board meeting.",
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "global_expansion_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "title": "VP International",
                        "action": "create_draft",
                        "draft": "Dear VP International,\n\nThank you for your urgent request regarding the APAC launch status. I am currently preparing the necessary documents, including the market penetration strategy, local partner agreements status, revenue projections, and compliance verification. I will ensure that these are ready for our meeting tomorrow at 9:00 AM.\n\nPlease let me know if there are any additional requirements.\n\nBest regards,\nJohn Doe",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "title": "Prepare APAC Launch Documents",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "description": "Ensure market penetration strategy, local partner agreements status, revenue projections, and compliance verification are ready for the meeting tomorrow.",
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "product_launch_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "title": "Product Launch Meeting",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "duration": null,
                        "description": "Gather personal customer success stories and metrics for the product launch presentation.",
                        "id": null,
                        "action": "create_todo",
                        "title": "Prepare Customer Success Stories and Metrics",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "end_action": true,
                        "provisional": null
                    }
                ],
                [
                    {
                        "draft": "Dear Marketing Director,\n\nThank you for reaching out. I will prepare the necessary customer success stories and metrics for your presentation. Please let me know if there are any specific requirements or additional details needed.\n\nBest regards,\nJohn Doe",
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "title": "Marketing Director",
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        }
    ],


    /*
    Human Resources
     */
    "human_resources": [
        {
            "hr_pressure_complex": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "title": "Discrimination Complaint Meeting",
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "draft": "Dear Legal Team,\n\nThank you for reaching out. I am available for the meeting tomorrow at 10:00 AM to discuss the discrimination complaint. Please let me know if there are any additional materials I need to review beforehand.\n\nBest regards,\nJohn Doe",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "title": "Legal Team",
                        "provisional": null,
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "hr_reorganization": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "title": "Reorganization Planning Meeting",
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "title": "Prepare for Reorganization Meeting",
                        "conflict": null,
                        "end_action": true,
                        "provisional": null,
                        "description": "Prepare department impact analysis, severance packages, communication strategy, and legal compliance review."
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "draft": "Dear CEO,\n\nThank you for inviting me to the reorganization planning meeting tomorrow. I will prepare the necessary materials as requested.\n\nBest regards,\nJohn Doe",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "title": "CEO",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "hr_rapid_expansion": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "title": "Expansion Planning Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "title": "Prepare for Expansion Planning Meeting",
                        "description": "Prepare hiring capacity assessment, space requirements analysis, training infrastructure plan, and budget proposal for the CEO's board presentation.",
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "end_action": true,
                        "provisional": null
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "title": "CEO",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "draft": "Dear CEO,\n\nThank you for inviting me to the expansion planning meeting tomorrow. I am preparing the necessary materials as requested, including the hiring capacity assessment, space requirements analysis, training infrastructure plan, and budget proposal. Please let me know if there are any additional details I should focus on.\n\nBest regards,\nJohn Doe",
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        }
    ],


    /*
    Data Analysis
     */
    "data_analysis": [
        {
            "data_analysis_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "title": "CFO",
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "draft": "Dear CFO,\n\nThank you for reaching out regarding the Q4 financial reports. I will review the discrepancies you mentioned and prepare for our meeting tomorrow at 11:00 AM.\n\nBest regards,\nJohn Doe"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "datetime": "2025-02-18T11:00",
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1",
                        "title": "Q4 Financial Reports Meeting"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "datetime": null,
                        "description": "Analyze revenue vs. costs breakdown, historical trend comparison, and anomaly detection results for Q4 financial reports.",
                        "duration": null,
                        "id": null,
                        "title": "Review Q4 Financial Reports Discrepancies",
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "data_security_incident": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "draft": "Dear Security Team,\n\nThank you for reaching out regarding the urgent data security incident. I will review the data exposure extent, affected records count, and access pattern analysis as requested. I confirm our meeting for tomorrow at 10:00 AM.\n\nBest regards,\nJohn Doe",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "Security Team",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "title": "Data Security Incident Meeting",
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "description": "Analyze data exposure extent, affected records count, and access pattern analysis for the security breach.",
                        "title": "Review Data Security Incident",
                        "action": "create_todo",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "product_analytics_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "draft": "Dear Product Owner,\n\nThank you for reaching out. I will be happy to assist with the analysis of your performance issues during the meeting tomorrow at 9:00 AM. Please let me know if there are any specific data points you would like me to focus on.\n\nBest regards,\nJohn Doe",
                        "title": "Product Owner",
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "title": "Product Performance Degradation Meeting",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ]
            ]
        }
    ],


    /*
    Design creative
     */
    "design_creative": [
        {
            "design_pressure_complex": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "title": "Creative Director",
                        "draft": "Dear Creative Director,\n\nThank you for reaching out. I am preparing the necessary materials for our meeting tomorrow at 10:00 AM, including the brand audit review, design alternatives, timeline proposal, and resource plan. I look forward to discussing these with you.\n\nBest regards,\nJohn Doe",
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "title": "Client Brand Review Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "title": "Prepare Client Brand Review Materials",
                        "conflict": false,
                        "description": "Prepare brand audit review, design alternatives, timeline proposal, and resource plan for the client brand review meeting.",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "agency_rebrand_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "draft": "Dear CEO,\n\nThank you for reaching out. I will be there tomorrow at 9:00 AM to discuss the rebranding strategy and review the materials.\n\nBest regards,\nJohn Doe",
                        "title": "CEO",
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "title": "Agency Rebrand Leak Meeting",
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ]
            ]
        },
        {
            "design_product_launch_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "draft": "Dear Product Team,\n\nThank you for reaching out regarding the urgent review of launch materials. I will be available for the emergency review meeting tomorrow at 9:00 AM to address the issues you've identified, including accessibility violations, brand inconsistencies, and missing mobile layouts.\n\nLooking forward to discussing these matters further.\n\nBest regards,\nJohn Doe",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "Product Team",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "title": "Emergency Review Meeting",
                        "draft": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "description": "Address accessibility violations, brand inconsistencies, and missing mobile layouts in the launch materials.",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "title": "Review and Fix Launch Materials",
                        "end_action": true
                    }
                ]
            ]
        }
    ],


    /*
    Product management
     */
    "product_management": [
        {
            "product_manager_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "title": "Engineering Lead",
                        "end_action": true,
                        "draft": "Dear Engineering Lead,\n\nThank you for bringing this critical issue to my attention. I will be present at the meeting tomorrow at 9:00 AM to discuss the rollback decision.\n\nBest regards,\nJohn Doe"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "description": "Meeting to discuss the critical bug in production and decide on rollback",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1",
                        "title": "Critical Bug Discussion"
                    }
                ]
            ]
        },
        {
            "product_launch_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "draft": "Dear Analytics Lead,\n\nThank you for sharing the early metrics from the feature launch. I am concerned about the drop in conversion rate and user engagement. I agree that we need to discuss the potential rollback during the data review meeting scheduled for 9:00 AM tomorrow.\n\nLooking forward to reviewing the data and making a decision.\n\nBest regards,\nJohn Doe",
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "title": "Analytics Lead",
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "title": "Data Review Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "title": "Review Feature Launch Metrics",
                        "description": "Prepare for the data review meeting by reviewing the feature launch metrics, focusing on conversion rate, user engagement, and error rates.",
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "acquisition_integration_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "title": "Integration Timeline Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "datetime": null,
                        "title": "Integration Lead",
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "draft": "Dear Integration Lead,\n\nThank you for reaching out about the integration timeline issues. I understand the urgency and will be there for the meeting at 9:00 AM tomorrow. Please let me know if there are any specific points you would like to discuss during the meeting.\n\nBest regards,\nJohn Doe",
                        "provisional": null,
                        "end_action": true
                    }
                ]
            ]
        }
    ],


    /*
    Research
     */
    "research": [
        {
            "research_pressure_complex": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "title": "Grant Review Committee Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "duration": null,
                        "title": "Prepare for Grant Review Committee Meeting",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "description": "Review proposal abstract, prepare 5-minute presentation on methodology, and assess budget feasibility.",
                        "provisional": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "draft": "Dear Dr. Department Head,\n\nThank you for inviting me to participate in the grant review committee meeting tomorrow. I am preparing the necessary materials, including the review of your proposal abstract, a 5-minute presentation on methodology, and an assessment of your budget feasibility. I look forward to meeting you at the Faculty Board Room.\n\nBest regards,\nJohn Doe",
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "title": "Dr. Department Head",
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "research_conference_deadline": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "draft": "Dear Papers Team,\n\nThank you for reaching out regarding the extension requests. I would be happy to assist with the meeting tomorrow at 10:00 AM. Please let me know if there are any specific details I need to prepare beforehand.\n\nBest regards,\nJohn Doe",
                        "start_action": true,
                        "title": "Papers Team",
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "description": "Meeting to discuss extension requests",
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "title": "SIGCHI Paper Extension Meeting",
                        "end_action": true,
                        "duration": "1"
                    }
                ]
            ]
        },
        {
            "research_grant_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "draft": "Dear grants@university.edu,\n\nThank you for reaching out regarding the NSF grant budget error. I understand the urgency of correcting the issues with equipment costs, student stipends, and cost sharing discrepancies. Please let me know how I can assist you in resolving these matters before the submission deadline tomorrow at 10:00 AM.\n\nBest regards,\nJohn Doe",
                        "provisional": false,
                        "datetime": null,
                        "title": "grants@university.edu",
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "title": "Assist with NSF Grant Budget Correction",
                        "conflict": false,
                        "description": "Help resolve issues with equipment costs, student stipends, and cost sharing discrepancies for the NSF grant submission by tomorrow at 10:00 AM.",
                        "datetime": null,
                        "provisional": false,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ]
            ]
        }
    ],


    /*
    IT
     */
    "it": [
        {
            "it_security_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "title": "Security Audit Findings Review",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "duration": null,
                        "title": "Prepare Security Audit Materials",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "end_action": true,
                        "provisional": null,
                        "description": "Prepare vulnerability assessment status, patch management metrics, incident response protocols, and compliance gap analysis for the board presentation."
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "title": "CISO",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "draft": "Dear CISO,\n\nThank you for your message. I am preparing the necessary materials for our review tomorrow at 10:00 AM. Please let me know if there are any additional requirements.\n\nBest regards,\nJohn Doe",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "digital_transformation_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_event",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "draft": "Dear system.alerts@company.com,\n\nThank you for your message regarding the review of critical security audit findings. I will ensure that I have my vulnerability assessment status and patch management metrics ready for our meeting tomorrow at 12:00 AM.\n\nBest regards,\nJohn Doe",
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "title": "system.alerts@company.com"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "title": "Security Audit Findings Review",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "datetime": "2025-02-18T12:00",
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "description": "Ensure vulnerability assessment status and patch management metrics are ready for the board presentation.",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "Prepare Security Audit Findings",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "security_incident_response": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1",
                        "title": "Emergency Ransomware Response Meeting"
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "draft": "Dear edr.alerts@company.com,\n\nThank you for reaching out about the emergency ransomware response meeting. I will be there at 9:00 AM tomorrow to assist with the incident response.\n\nBest regards,\nJohn Doe",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null,
                        "title": "edr.alerts@company.com"
                    }
                ]
            ]
        }
    ],


    /*
    Legal
     */
    "legal": [
        {
            "legal_pressure_complex": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "title": "Data Breach Incident Meeting",
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "title": "Prepare Legal Response Strategy for Data Breach",
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "description": "Develop initial legal response strategy, customer notification requirements, and regulatory compliance plan.",
                        "conflict": null,
                        "end_action": true,
                        "provisional": null
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "draft": "Dear CIO,\n\nThank you for reaching out regarding the urgent data breach incident. I am preparing the necessary legal documents and strategies as requested. I will have them ready for our meeting tomorrow at 10:00 AM.\n\nBest regards,\nJohn Doe",
                        "id": null,
                        "start_action": true,
                        "title": "CIO",
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "legal_regulatory_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "title": "Regulatory Audit Meeting",
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "description": "Ensure all necessary documentation for financial compliance, data privacy, and environmental regulations is ready for review.",
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "title": "Prepare Documentation for Audit",
                        "conflict": null,
                        "end_action": true,
                        "provisional": null
                    }
                ],
                [
                    {
                        "draft": "Dear Regulator,\n\nThank you for your notice regarding the surprise regulatory audit. I confirm my availability for the meeting tomorrow at 9:00 AM. I will ensure that all necessary documentation is prepared for your review.\n\nPlease let me know if there are any additional requirements.\n\nBest regards,\nJohn Doe",
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "title": "Regulator",
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "legal_ma_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "title": "Emergency Board Meeting for TechStart Acquisition",
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "description": "Prepare legal analysis of anti-trust implications, revised valuation strategy, and counter-offer options for TechStart acquisition.",
                        "datetime": null,
                        "duration": null,
                        "title": "Prepare Legal Analysis for TechStart Acquisition",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "end_action": true,
                        "provisional": null
                    }
                ],
                [
                    {
                        "action": "create_draft",
                        "title": "ma.director@company.com",
                        "draft": "Dear Director,\n\nThank you for reaching out regarding the urgent situation with the TechStart acquisition. I will prepare the necessary legal analysis and preliminary response strategy for the emergency board meeting tomorrow.\n\nPlease let me know if there are any additional details or materials I need to review beforehand.\n\nBest regards,\nJohn Doe",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        }
    ],


    /*
    Customer experience
     */
    "customer_experience": [
        {
            "cx_support_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft",
                        "create_todo"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "end_action": true,
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "title": "Emergency Response Meeting: System Outage",
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "draft": "Dear Monitoring Team,\n\nThank you for reaching out regarding the urgent meeting. I will be there at 9:00 AM to discuss the customer communication plan, status page update, and emergency response strategy.\n\nLooking forward to it.\n\nBest regards,\nJohn Doe",
                        "duration": null,
                        "title": "monitoring@company.com",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "description": "Review customer communication plan, status page update, and emergency response strategy for the meeting.",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "title": "Prepare for Emergency Response Meeting",
                        "end_action": true
                    }
                ]
            ]
        },
        {
            "cx_product_launch_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_todo",
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "title": "Product Manager",
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "draft": "Dear Product Manager,\n\nThank you for reaching out regarding the product launch preparations. I am working on the following tasks:\n- Knowledge base article updates\n- Support team briefing\n- Automated response review\n- Social media template preparation\n\nI will confirm my readiness by the end of the day.\n\nBest regards,\nJohn Doe"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "description": "Prepare: knowledge base article updates, support team briefing, automated response review, social media template preparation.",
                        "provisional": false,
                        "datetime": null,
                        "title": "Product Launch Support Management",
                        "duration": null,
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ],
            ]
        },
        {
            "cx_platform_migration": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "title": "Legacy Platform Shutdown Meeting",
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "title": "infrastructure@company.com",
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null,
                        "draft": "Dear Infrastructure Team,\n\nThank you for reaching out regarding the legacy platform shutdown. I am available to attend the emergency migration planning meeting tomorrow at 10:00 AM. Please let me know if there are any specific preparations or materials I need to review beforehand.\n\nBest regards,\nJohn Doe"
                    }
                ]
            ]
        }
    ],


    /*
    Finance accounting
     */
    "finance_accounting": [
        {
            "finance_month_end_pressure": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_todo",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "datetime": "2025-02-18T10:00",
                        "title": "Audit Committee Meeting",
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "duration": "1"
                    }
                ],
                [
                    {
                        "datetime": null,
                        "duration": null,
                        "provisional": null,
                        "id": null,
                        "action": "create_todo",
                        "title": "Prepare for Audit Committee Meeting",
                        "start_action": true,
                        "draft": null,
                        "conflict": null,
                        "end_action": true,
                        "description": "Prepare Q3 variance analysis, updated cash flow projections, audit findings response, and internal control updates"
                    }
                ],
                [
                    {
                        "draft": "Dear CFO,\n\nThank you for your message regarding the Audit Committee Meeting tomorrow. I am preparing the necessary materials as requested, including the Q3 variance analysis, updated cash flow projections, audit findings response, and internal control updates. I will be ready to present these at 10:00 AM tomorrow.\n\nBest regards,\nJohn Doe",
                        "action": "create_draft",
                        "datetime": null,
                        "conflict": null,
                        "title": "CFO",
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "provisional": null
                    }
                ]
            ]
        },
        {
            "tax_deadline_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_draft",
                        "create_todo",
                        "create_event"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "draft": "Dear Tax Director,\n\nThank you for bringing this critical error to my attention. I will review the Q3 tax provision calculations and provide my analysis by tomorrow at 9:00 AM for your restatement discussion.\n\nBest regards,\nJohn Doe",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "title": "Tax Director",
                        "description": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "conflict": false,
                        "provisional": false,
                        "description": "Review transfer pricing adjustments, R&D credits, and foreign tax credits for errors and provide analysis by tomorrow at 9:00 AM.",
                        "datetime": null,
                        "duration": null,
                        "title": "Analyze Q3 Tax Provision Error",
                        "id": null,
                        "action": "create_todo",
                        "start_action": true,
                        "draft": null,
                        "end_action": true
                    }
                ],
                [
                    {
                        "title": "Restatement Discussion",
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "id": null,
                        "start_action": true,
                        "draft": null,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ]
            ]
        },
        {
            "merger_crisis": [
                {
                    "start": true,
                    "items": [
                        "create_event",
                        "create_draft"
                    ],
                    "end": true
                },
                [
                    {
                        "conflict": false,
                        "action": "create_event",
                        "provisional": false,
                        "title": "Emergency Meeting with Deal Committee",
                        "id": null,
                        "draft": null,
                        "start_action": true,
                        "description": null,
                        "end_action": true,
                        "datetime": "2025-02-18T09:00",
                        "duration": "1"
                    }
                ],
                [
                    {
                        "conflict": false,
                        "action": "create_draft",
                        "provisional": false,
                        "datetime": null,
                        "duration": null,
                        "id": null,
                        "start_action": true,
                        "title": "Deal Partner",
                        "description": null,
                        "end_action": true,
                        "draft": "Dear Deal Partner,\n\nThank you for reaching out regarding the discrepancies in the target company's financials. I will be present at the emergency meeting tomorrow at 9:00 AM to discuss these issues further.\n\nLooking forward to it.\n\nBest regards,\nJohn Doe"
                    }
                ]
            ]
        }
    ]
}