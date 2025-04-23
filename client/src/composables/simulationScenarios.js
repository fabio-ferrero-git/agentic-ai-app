export const scenariosNames = {
    sales: 'Sales',
    human_resources: 'Human Resources',
    data_analysis: 'Data Analysis',
    design_creative: 'Design Creative',
    product_management: 'Product Management',
    research: 'Research',
    it: 'Information Technology',
    legal: 'Legal',
    customer_experience: 'Customer Experience',
    finance_accounting: 'Finance Accounting',
}


export const scenarios = {
    /*
     * Sales
     */
    sales : [

        {
            id: 'sales_pressure_complex',
            name: 'High Volume Sales Management',
            baseEmails: [
                // Initial Wave (0-30s)
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Emergency Board Meeting Prep',
                    sender: 'ceo@company.com',
                    content: `Need you to present Q4 projections at tomorrow's board meeting at 10:00 AM. Location: Online, duration: 2 hours.         
        Please prepare:
        - Current pipeline status
        - Risk analysis
        - Customer acquisition costs
        - Churn metrics
        
        This is mandatory. No exceptions.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: [],
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Product Training Session',
                    sender: 'training@company.com',
                    content: `Mandatory product update training tomorrow at 10:00 AM.
        Duration: 2 hours
        Location: Online
        
        All sales staff must attend as this covers critical new features.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Lunch Meeting Request',
                    sender: 'vip.client@megacorp.com',
                    content: `I'm flying in tomorrow specifically to meet you. Let's do lunch at 12:00 PM at The Capital Grill.
        Need to discuss the enterprise contract renewal.
        
        Will bring our CTO and Procurement Director.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                // Second Wave (60-120s)
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Quarterly Review Meeting',
                    sender: 'manager@company.com',
                    content: `Team review scheduled for tomorrow at 12:00 PM.
        Location: Conference Room A
        
        Bring your performance metrics and pipeline updates.
        This is a performance evaluation meeting.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Urgent: System Downtime',
                    sender: 'it.support@company.com',
                    content: `Critical system maintenance tomorrow:
        Time: 14:00-16:00
        Affected systems:
        - CRM
        - Email
        - Calendar
        
        Plan customer interactions accordingly.`,
                    requiresResponse: false,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Demo Request - Hot Lead',
                    sender: 'prospect@startup.com',
                    content: `Need an urgent product demo tomorrow at 15:00.
        We have budget approval expiring this week.
        Full technical team will attend.
        
        This could be our biggest Q4 deal.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                // Final Wave (180-300s)
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Contract Expiration Alert',
                    sender: 'system@company.com',
                    content: `WARNING: 5 enterprise contracts expire this week.
        Required Actions:
        - Review renewal terms
        - Update pricing
        - Schedule renewal calls
        
        Deadline: Tomorrow EOD`,
                    requiresResponse: false,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Sales Team Happy Hour',
                    sender: 'team@company.com',
                    content: `Team building tomorrow at 16:00
        Location: Downtown Brewery
        Participants: sales team and CEO.
        Mandatory attendance - CEO will be there to discuss Q4 targets informally.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 50,
                    subject: "Re: Product Training Session",
                    sender: "training@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Product Training Session', you MUST RESCHEDULE the EVENT to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Product Training Session' or proposes to reschedule the 'Product Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Lunch Meeting Request",
                    sender: "vip.client@megacorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Lunch Meeting Request', you MUST RESCHEDULE the EVENT to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Lunch Meeting Request', you MUST CANCEL the EVENT. The response must specify the reason for CANCELLATION of the event."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Quarterly Review Meeting",
                    sender: "manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Quarterly Review Meeting' or proposes to reschedule the 'Quarterly Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Quarterly Review Meeting' and the meeting requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Demo Request - Hot Lead",
                    sender: "prospect@startup.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Product Demo', you MUST RESCHEDULE the EVENT to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Product Demo', you MUST CANCEL the EVENT. The response must specify the reason for cancellation of the event."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Sales Team Happy Hour",
                    sender: "team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Team Happy Hour' or proposes to reschedule the 'Sales Team Happy Hour', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Sales Team Happy Hour', you MUST CANCEL the EVENT. The response must specify the reason for cancellation of the event."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'global_expansion_crisis',
            name: 'International Market Launch Pressure',
            baseEmails: [
                {
                    id: 'MAIL_1',
                    timestamp: 0,
                    subject: 'URGENT: APAC Launch Status',
                    sender: 'vp.international@company.com',
                    content: `I need your immediate update on APAC launch readiness for our meeting tomorrow at 9:00 AM.
Required from you:
- Market penetration strategy
- Local partner agreements status
- Revenue projections
- Compliance verification

I specifically need these details for our discussion.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 15,
                    subject: 'Singapore Team Onboarding',
                    sender: 'hr.asia@company.com',
                    content: `I need you for a one-on-one onboarding session
Time: Tomorrow 9:00 AM
Duration: 2 hours
Location: Virtual
I need you to walk me through the sales playbook and territory assignments.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 30,
                    subject: 'Product Localization Meeting',
                    sender: 'product.local@company.com',
                    content: `I need to meet with you to discuss APAC product customization
Time: Tomorrow 11:00 AM
I've found critical bugs in Japanese language support that we need to review together.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 45,
                    subject: 'Sales Competition Alert Meeting',
                    sender: 'competitive.intel@company.com',
                    content: `I need to discuss with you urgently at 11:00 AM
There's a major competitor launching in APAC tomorrow
Let's review your market defense plan together.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 60,
                    subject: 'Compliance Training Requirement',
                    sender: 'compliance@company.com',
                    content: `I need to conduct your APAC compliance training
Time: Tomorrow 14:00 PM.
Duration: 2 hours.
Location: Virtual.
This must be completed before your market launch activities.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 90,
                    subject: 'Australian Partner Escalation Meeting',
                    sender: 'partner@bigcorp.com',
                    content: `I need to meet with you tomorrow 15:00 virtually.
We need to revise our contract terms before launch.
I may need to delay our partnership announcement.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 120,
                    subject: 'Q4 APAC Forecast Review',
                    sender: 'finance@company.com',
                    content: `I need to review the forecast with you tomorrow 15:00
I need your detailed pipeline analysis for my review.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: APAC Launch Status",
                    sender: "vp.international@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'APAC Launch Meeting' or proposes to reschedule the 'APAC Launch Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'APAC Launch Meeting' and the 'APAC Launch Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Singapore Team Onboarding",
                    sender: "hr.asia@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Onboarding Session', you MUST RESCHEDULE the 'Onboarding Session' to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Onboarding Session' or proposes to reschedule the 'Onboarding Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Product Localization Meeting",
                    sender: "product.local@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Product Localization Meeting' and the 'Product Localization Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Product Localization Meeting' or proposes to reschedule the 'Product Localization Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Sales Competition Alert",
                    sender: "competitive.intel@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Competition Alert Meeting' or proposes to reschedule the 'Sales Competition Alert Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Sales Competition Alert Meeting' and the 'Sales Competition Alert Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Compliance Training Requirement",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Compliance Training', you MUST RESCHEDULE the 'Compliance Training' to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Compliance Training' or proposes to reschedule the 'Compliance Training', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 30,
                    subject: "Re: Australian Partner Escalation",
                    sender: "partner@bigcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Australian Partner Escalation Meeting', you MUST CANCEL the 'Australian Partner Escalation Meeting'. The response must specify the reason for CANCELLATION of the 'Australian Partner Escalation Meeting'."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Australian Partner Escalation Meeting', you MUST RESCHEDULE the 'Australian Partner Escalation Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 25,
                    subject: "Re: Q4 APAC Forecast Review",
                    sender: "finance@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Q4 APAC Forecast Review' and the 'Q4 APAC Forecast Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Q4 APAC Forecast Review' or proposes to reschedule the 'Q4 APAC Forecast Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'product_launch_crisis',
            name: 'New Product Launch Emergency',
            baseEmails: [
                {
                    id: 'MAIL_1',
                    timestamp: 0,
                    subject: 'Critical: Product Launch Meeting',
                    sender: 'marketing.director@company.com',
                    content: `I need your urgent review of launch preparations
Time: Tomorrow 10:00 AM
Location: Main Conference Room

I need your personal customer success stories and metrics for my presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 15,
                    subject: 'Beta Customer Emergency Call',
                    sender: 'support@company.com',
                    content: `I found a major bug in my testing
Emergency call scheduled tomorrow 10:00 AM
I need your expertise to help resolve my issue
Let me know if you can join the call.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 30,
                    subject: 'Sales Team Training Session',
                    sender: 'training@company.com',
                    content: `I need to train you on the new product
Time: Tomorrow 13:00 PM
Duration: 2 hours
I must complete your training before launch.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 45,
                    subject: 'Pricing Strategy Meeting',
                    sender: 'product.manager@company.com',
                    content: `I need your input on pricing urgently
Time: Tomorrow 13:00 PM
I found new competitor pricing information
I need to finalize my strategy before launch.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 60,
                    subject: 'Early Adopter Program Meeting',
                    sender: 'customer.success@company.com',
                    content: `I need to meet with you tomorrow 14:00 PM
I need your adoption metrics and success stories
This is critical for my launch planning.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 90,
                    subject: 'Partner Integration Review',
                    sender: 'partnerships@company.com',
                    content: `I need to review integration with you
Time: Tomorrow 14:00 PM
I need your sign-off on my launch dependencies.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 120,
                    subject: 'Sales Forecast Update Meeting',
                    sender: 'sales.ops@company.com',
                    content: `I need your forecast input.
Meeting tomorrow 16:00 PM.
I need your pipeline analysis for my report.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Critical: Product Launch Meeting",
                    sender: "marketing.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Product Launch Meeting' or proposes to reschedule the 'Product Launch Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Product Launch Meeting' and the 'Product Launch Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Beta Customer Emergency Call",
                    sender: "support@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Call' or proposes to reschedule the 'Emergency Call', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Emergency Call', you MUST CANCEL the 'Emergency Call'. The response must specify the reason for CANCELLATION of the 'Emergency Call'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Sales Team Training Session",
                    sender: "training@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Team Training Session' or proposes to reschedule the 'Sales Team Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Sales Team Training Session', you MUST RESCHEDULE the 'Sales Team Training Session' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Pricing Strategy Meeting",
                    sender: "product.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Pricing Strategy Meeting' or proposes to reschedule the 'Pricing Strategy Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Pricing Strategy Meeting' and the 'Pricing Strategy Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 30,
                    subject: "Re: Early Adopter Program Meeting",
                    sender: "customer.success@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Early Adopter Program Meeting' or proposes to reschedule the 'Early Adopter Program Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Early Adopter Program Meeting', you MUST RESCHEDULE the 'Early Adopter Program Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: Partner Integration Review",
                    sender: "partnerships@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Integration Review Meeting' or proposes to reschedule the 'Integration Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Integration Review Meeting', you MUST CANCEL the 'Integration Review Meeting'. The response must specify the reason for CANCELLATION of the 'Integration Review Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 25,
                    subject: "Re: Sales Forecast Update Meeting",
                    sender: "sales.ops@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Forecast Update Meeting' or proposes to reschedule the 'Sales Forecast Update Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Sales Forecast Update Meeting' and the 'Sales Forecast Update Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Human Resources
     */
    human_resources : [
        {
            id: 'hr_pressure_complex',
            name: 'HR Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Urgent: Discrimination Complaint Meeting',
                    sender: 'legal@company.com',
                    content: `I need to discuss a complaint with you.
Need immediate meeting tomorrow at 10:00 AM to discuss:
- My initial response strategy
- My investigation timeline
- My documentation review
- My witness interview plan

I require your immediate attention.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Final Interview - Senior Developer Position',
                    sender: 'tech.candidate@email.com',
                    content: `Following up on my interview scheduling. I'm available tomorrow at 10:00 AM.
I currently have competing offers - need to make my decision by EOD tomorrow.
Would appreciate your quick confirmation.

Best regards,
Jane Smith`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Mandatory Benefits Training',
                    sender: 'benefits@company.com',
                    content: `I need you for healthcare provider training:
Time: Tomorrow 14:00 PM.
Duration: 2 hours.
Location: Main Conference Room

You must complete this before open enrollment begins next week.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Employee Relations Issue Meeting - Sales Department',
                    sender: 'sales.manager@company.com',
                    content: `I need an urgent meeting to discuss my situation.
I'm having difficulties and considering my options.
Can we meet tomorrow at 14:00 PM?

My situation needs immediate attention.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Q4 HR Budget Review',
                    sender: 'finance@company.com',
                    content: `I need you for budget review tomorrow at 12:00 PM
Location: Finance Conference Room
I need your documents on:
- Q4 recruitment spending
- Training program costs
- Benefits expenditure forecast
- Your departmental budget requests`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Exit Interview - VP Marketing',
                    sender: 'vp.marketing@company.com',
                    content: `As per my resignation notice, I would like to schedule my exit interview with you.
I'm available tomorrow at 12:00 PM only.
I'm flying out for my new position end of week.

Need to discuss my knowledge transfer with you.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Compliance Audit Notice',
                    sender: 'auditor@compliance.com',
                    content: `I need to audit your documentation tomorrow at 15:00 PM.
I need to review:
- Your employee handbook updates
- Your training records
- Your I-9 verification files
- Your pay equity analysis

I need you available for our entire session.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'New Hire Orientation Meeting',
                    sender: 'orientation@company.com',
                    content: `I need you for tomorrow's orientation presentation
Time: Tomorrow, 15:00 PM.
Duration: 2 hours.
Location: Training Room
I need you to cover:
- Company policies
- Benefits overview
- HR systems training`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Urgent: Discrimination Complaint Meeting",
                    sender: "legal@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Discrimination Complaint Meeting' or proposes to reschedule the 'Discrimination Complaint Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Discrimination Complaint Meeting' and the 'Discrimination Complaint Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Final Interview - Senior Developer Position",
                    sender: "tech.candidate@email.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Final Interview' or proposes to reschedule the 'Final Interview', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Final Interview', you MUST CANCEL the 'Final Interview'. The response must specify the reason for CANCELLATION of the 'Final Interview'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Employee Relations Issue Meeting",
                    sender: "sales.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Employee Relations Issue Meeting' or proposes to reschedule the 'Employee Relations Issue Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Employee Relations Issue Meeting', you MUST RESCHEDULE the 'Employee Relations Issue Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Exit Interview - VP Marketing",
                    sender: "vp.marketing@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Exit Interview' or proposes to reschedule the 'Exit Interview', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Exit Interview', you MUST CANCEL the 'Exit Interview'. The response must specify the reason for CANCELLATION of the 'Exit Interview'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: New Hire Orientation Meeting",
                    sender: "orientation@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'New Hire Orientation Meeting' or proposes to reschedule the 'New Hire Orientation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'New Hire Orientation Meeting' and the 'New Hire Orientation Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'hr_reorganization', // FOLLOW UPS
            name: 'Corporate Reorganization Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Confidential: Reorganization Planning Meeting',
                    sender: 'ceo@company.com',
                    content: `Emergency meeting tomorrow at 10:00 AM to discuss workforce reduction.
Need your input on:
- Department impact analysis
- Severance packages
- Communication strategy
- Legal compliance review

Strictly confidential - do not forward.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 30,
                    subject: 'Union Representative Meeting Request',
                    sender: 'union.rep@workers.org',
                    content: `Requesting immediate meeting tomorrow at 10:00 AM.
Received concerning reports about potential layoffs.
Must discuss worker protections and collective bargaining agreement.

Expecting your confirmation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 15,
                    subject: 'Department Performance Reviews',
                    sender: 'operations@company.com',
                    content: `Need HR oversight for performance reviews tomorrow.
Date and Time: Tomorrow from 10:00 AM to 12:00 PM.
Departments: Operations, IT, Marketing
Location: Conference Room B

Critical for reorganization planning.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Press Inquiry: Layoff Rumors',
                    sender: 'journalist@businessnews.com',
                    content: `Seeking comment on reports of imminent layoffs.
Deadline: Tomorrow 12:00 PM
Sources suggest 30% workforce reduction.

Please provide official statement.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Outplacement Services Presentation',
                    sender: 'career.transition@outplace.com',
                    content: `Scheduled presentation of services:
Time: Tomorrow 12:00 PM
Location: HR Conference Room
Topics:
- Career counseling
- Resume workshops
- Job search assistance

Requires immediate booking decision.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Employee Assistance Program Update (EAP Update)',
                    sender: 'eap.provider@wellness.com',
                    content: `Emergency service expansion meeting
Time: Tomorrow 15:00 PM.
Agenda:
- Increased counseling capacity
- Crisis support services
- Manager mental health training

Preparation for upcoming changes.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Security Team Coordination Meeting',
                    sender: 'security@company.com',
                    content: `Planning meeting for reorganization day:
Time: Tomorrow 15:00 PM.
Topics:
- Access card deactivation
- Asset recovery procedure
- Security staff positioning
- Emergency response protocols`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'IT Systems Access Review',
                    sender: 'it.director@company.com',
                    content: `Critical systems review meeting
Time: Tomorrow 16:00 PM.
Focus:
- Access termination procedures
- Data security protocols
- Equipment return process
- System backup requirements`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 270,
                    subject: 'Legal Department Advisory briefing',
                    sender: 'legal@company.com',
                    content: `Mandatory compliance briefing:
Time: Tomorrow 16:00 PM.
Location: Legal Conference Room
Topics:
- WARN Act requirements
- Discrimination prevention
- Documentation requirements

Must complete before any terminations.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Confidential: Reorganization Planning Meeting",
                    sender: "ceo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Reorganization Planning Meeting' or proposes to reschedule the 'Reorganization Planning Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Reorganization Planning Meeting' and the 'Reorganization Planning Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Union Representative Meeting Request",
                    sender: "union.rep@workers.org",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Union Representative Meeting' or proposes to reschedule the 'Union Representative Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Union Representative Meeting', you MUST RESCHEDULE the 'Union Representative Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Department Performance Reviews",
                    sender: "operations@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Department Performance Reviews' and the 'Department Performance Reviews' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Department Performance Reviews' or proposes to reschedule the 'Department Performance Reviews', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Press Inquiry: Layoff Rumors",
                    sender: "journalist@businessnews.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to manage the 'Press Inquiry: Layoff Rumors' and the 'Press Inquiry: Layoff Rumors' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot manage the 'Press Inquiry: Layoff Rumors' or proposes to reschedule the deadline for 'Press Inquiry: Layoff Rumors', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 30,
                    subject: "Re: Outplacement Services Presentation",
                    sender: "career.transition@outplace.com",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Outplacement Services Presentation', you MUST RESCHEDULE the 'Outplacement Services Presentation' to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Outplacement Services Presentation', you MUST CANCEL the 'Outplacement Services Presentation'. The response must specify the reason for CANCELLATION of the 'Outplacement Services Presentation'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Employee Assistance Program Update (EAP Update)",
                    sender: "eap.provider@wellness.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'EAP Update Meeting' or proposes to reschedule the 'EAP Update Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'EAP Update Meeting' and the 'EAP Update Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Security Team Coordination Meeting",
                    sender: "security@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Security Team Coordination Meeting' and the 'Security Team Coordination Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Team Coordination Meeting' or proposes to reschedule the 'Security Team Coordination Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: IT Systems Access Review",
                    sender: "it.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'IT Systems Access Review' or proposes to reschedule the 'IT Systems Access Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'IT Systems Access Review' and the 'IT Systems Access Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 25,
                    subject: "Re: Legal Department Advisory briefing",
                    sender: "legal@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Legal Department Advisory Briefing' or proposes to reschedule the 'Legal Department Advisory Briefing', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Legal Department Advisory Briefing', you MUST RESCHEDULE the 'Legal Department Advisory Briefing' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
            ]
        },

        {
            id: 'hr_rapid_expansion',
            name: 'Rapid Growth and Hiring Surge',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Urgent: Expansion Planning Meeting',
                    sender: 'ceo@company.com',
                    content: `I need your input for my board presentation
Emergency meeting tomorrow 10:00 AM
Topics:
- Your hiring capacity assessment
- Your space requirements analysis
- Your training infrastructure plan
- Your budget proposal

I need this for my noon presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Recruitment Agency Meeting',
                    sender: 'talent.acquisition@recruiter.com',
                    content: `I need to present my hiring strategy to you:
Time: Tomorrow 10:00 AM
I'll cover:
- My sourcing approach
- My timeline proposal
- My cost structure
- My agreement terms

I need your decision by EOD.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Training Infrastructure Review',
                    sender: 'learning@company.com',
                    content: `I need to review my capacity plan with you
Time: Tomorrow 14:00 PM.
I need your input on:
- My facility expansion plan
- My virtual platform proposal
- My instructor needs
- My materials development

I need to increase my capacity from 20 to 50 trainees.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Benefits Provider Emergency Meeting',
                    sender: 'benefits@provider.com',
                    content: `I need to review my system capacity with you:
Time: Tomorrow 14:00 PM.
Let's discuss:
- My system scaling plan
- My enrollment automation
- My cost projections
- My service agreements

I need your confirmation by Friday.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Real Estate Viewing',
                    sender: 'facilities@company.com',
                    content: `I need you to view my proposed office space:
Time: Tomorrow 12:00 PM
Location: Downtown Business Center
- I found 50,000 sq ft
- I can get immediate occupancy
- I have a limited time offer

I need your answer by EOD.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'IT Infrastructure Scaling Meeting',
                    sender: 'it.director@company.com',
                    content: `I need to review my capacity plan:
Time: Tomorrow 15:00 PM.
Let's discuss:
- My workstation needs
- My network expansion
- My software licenses
- My security protocols

My vendor quotes expire tomorrow.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Payroll System Upgrade Meeting',
                    sender: 'payroll@company.com',
                    content: `I need to discuss my system upgrade:
Time: Tomorrow 15:00 PM.
My agenda:
- My onboarding capability
- My tax compliance updates
- My benefits integration
- My reporting requirements

I need to implement before hiring begins.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Compensation Structure Review',
                    sender: 'compensation@company.com',
                    content: `I need to review my salary bands. Please let's have a meeting.
Time: Tomorrow 16:00 PM.
Let's discuss of market analysis, internal equity plan, budget constraints and promotion pathways.

I need this for my offer letters.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 270,
                    subject: 'Employee Handbook Update Meeting',
                    sender: 'legal@company.com',
                    content: `I need a meeting with you to review the Employee Handbook policy updates:
Time: Tomorrow 16:00 PM.
I want to discuss about
- remote work policies
- technology guidelines
- reporting structure
- growth framework`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Urgent: Expansion Planning Meeting",
                    sender: "ceo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Expansion Planning Meeting' or proposes to reschedule the 'Expansion Planning Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Expansion Planning Meeting' and the 'Expansion Planning Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Recruitment Agency Meeting",
                    sender: "talent.acquisition@recruiter.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Recruitment Agency Meeting' or proposes to reschedule the 'Recruitment Agency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Recruitment Agency Meeting', you MUST RESCHEDULE the 'Recruitment Agency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 20,
                    subject: "Re: Training Infrastructure Review",
                    sender: "learning@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Training Infrastructure Review' or proposes to reschedule the 'Training Infrastructure Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Training Infrastructure Review' and the 'Training Infrastructure Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Benefits Provider Emergency Meeting",
                    sender: "benefits@provider.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Benefits Provider Emergency Meeting' or proposes to reschedule the 'Benefits Provider Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Benefits Provider Emergency Meeting', you MUST RESCHEDULE the 'Benefits Provider Emergency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Real Estate Viewing",
                    sender: "facilities@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Real Estate Viewing' or proposes to reschedule the 'Real Estate Viewing', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Real Estate Viewing', you MUST RESCHEDULE the 'Real Estate Viewing' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: IT Infrastructure Scaling Meeting",
                    sender: "it.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'IT Infrastructure Scaling Meeting' or proposes to reschedule the 'IT Infrastructure Scaling Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'IT Infrastructure Scaling Meeting' and the 'IT Infrastructure Scaling Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Payroll System Upgrade Meeting",
                    sender: "payroll@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Payroll System Upgrade Meeting' or proposes to reschedule the 'Payroll System Upgrade Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Payroll System Upgrade Meeting' and the 'Payroll System Upgrade Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 30,
                    subject: "Re: Compensation Structure Review",
                    sender: "compensation@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Compensation Structure Review Meeting' or proposes to reschedule the 'Compensation Structure Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Compensation Structure Review Meeting' and the 'Compensation Structure Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 20,
                    subject: "Re: Employee Handbook Update Meeting",
                    sender: "legal@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Employee Handbook Policy Update Meeting' or proposes to reschedule the 'Employee Handbook Policy Update Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Employee Handbook Policy Update Meeting' and the 'Employee Handbook Policy Update Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Data analysis 
     */
    data_analysis : [

        {
            id: 'data_analysis_pressure',
            name: 'Data Analysis Emergency Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Urgent: Data Discrepancy Q4 Reports Meeting',
                    sender: 'cfo@company.com',
                    content: `I need your analysis of my Q4 financial reports.

Let's have a meeting tomorrow at 11:00 AM.

I found critical discrepancies in my data:
- My revenue vs. costs breakdown
- My historical trend comparison
- My anomaly detection results`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'New Data Pipeline Training Session',
                    sender: 'data.engineering@company.com',
                    content: `I need to train you on my new ETL processes
Time: Tomorrow at 11:00 AM
Duration: 2 hours
Location: Virtual Meeting Room A

You'll need to update your scripts after my training.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Customer Satisfaction Analysis',
                    sender: 'product.manager@company.com',
                    content: `I need your analysis of my satisfaction metrics:
- My NPS trends
- My support ticket patterns
- My engagement scores

Meeting tomorrow at 14:00 PM to review with you.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Database Maintenance Notice',
                    sender: 'it.support@company.com',
                    content: `I need to perform maintenance on my systems Tomorrow from 13:00PM to 15:00 PM.
Affected systems:
- Data Warehouse
- Analytics Dashboard
- Reporting Tools

Please plan your work around my maintenance.`,
                    requiresResponse: false,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Lunch Discussion Meeting: ML Model Performance',
                    sender: 'ai.team@company.com',
                    content: `I need to discuss my model performance with you
Time: Tomorrow 12:00 PM
Location: Virtual

I need your insights on my recent predictions.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Marketing Campaign Analysis Request',
                    sender: 'marketing.lead@company.com',
                    content: `I need your analysis of my Q4 campaign by tomorrow 15:00 PM.
Focus on:
- My conversion rates
- My channel effectiveness
- My ROI calculations

I need this for my board presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Quarterly Team Review Meeting',
                    sender: 'manager@company.com',
                    content: `I need to review your performance
Time: Tomorrow at 12:00 PM
Location: Conference Room B

Bring your metrics for my evaluation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Data Science Meetup',
                    sender: 'community@company.com',
                    content: `I need you to present at my meetup
Time: Tomorrow at 16:00 PM.
Location: Main Auditorium

You'll present my analysis framework to the CEO.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Urgent: Data Discrepancy Q4 Reports Meeting",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Discrepancy Q4 Reports Meeting' or proposes to reschedule the 'Data Discrepancy Q4 Reports Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Discrepancy Q4 Reports Meeting' and the 'Data Discrepancy Q4 Reports Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: New Data Pipeline Training Session",
                    sender: "data.engineering@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Pipeline Training Session' or proposes to reschedule the 'Pipeline Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Pipeline Training Session', you MUST RESCHEDULE the 'Pipeline Training Session' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Customer Satisfaction Analysis",
                    sender: "product.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Satisfaction Analysis' or proposes to reschedule the 'Customer Satisfaction Analysis', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Customer Satisfaction Analysis' and the 'Customer Satisfaction Analysis' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Lunch Discussion Meeting: ML Model Performance",
                    sender: "ai.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'ML Discussion Lunch Meeting' or proposes to reschedule the 'ML Discussion Lunch Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'ML Discussion Lunch Meeting', you MUST RESCHEDULE the 'ML Discussion Lunch Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 15,
                    subject: "Re: Marketing Campaign Analysis Request",
                    sender: "marketing.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Marketing Analysis Request' or proposes to reschedule the 'Marketing Analysis Request', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Marketing Analysis Request' and the 'Marketing Analysis Request' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Quarterly Team Review Meeting",
                    sender: "manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Quarterly Team Review Meeting' or proposes to reschedule the 'Quarterly Team Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Quarterly Team Review Meeting', you MUST RESCHEDULE the 'Quarterly Team Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Data Science Meetup",
                    sender: "community@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Science Meetup' or proposes to reschedule the 'Data Science Meetup', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Data Science Meetup', you MUST RESCHEDULE the 'Data Science Meetup' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'data_security_incident',
            name: 'Data Security Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Data Security Incident Detected Meeting',
                    sender: 'security.team@company.com',
                    content: `I need your immediate analysis of my security breach.
Need your review of:
- My data exposure extent
- My affected records count
- My access pattern analysis

I need to meet with you tomorrow at 10:00 AM.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 30,
                    subject: 'Compliance Report Due',
                    sender: 'compliance@company.com',
                    content: `I need your help with my compliance report
Due tomorrow 10:00 AM
I need your review of:
- My data handling procedures
- My access control audit
- My risk assessment

This is my regulatory requirement.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 60,
                    subject: 'Customer Data Audit Meeting',
                    sender: 'audit.team@company.com',
                    content: `I need to meet with you tomorrow 11:00 AM
I need your review of:
- My data storage locations
- My access histories
- My encryption status

I need your help preparing my documentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'Press Inquiry: Data Security',
                    sender: 'pr.team@company.com',
                    content: `I need your statistics for my press release by tomorrow:
- My security measure effectiveness
- My historical incident comparison
- My response time metrics

I need this for my media response.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Data Recovery Testing Session',
                    sender: 'it.director@company.com',
                    content: `I need you for my recovery testing session tomorrow 12:00 PM
Must verify with you:
- My backup integrity
- My recovery procedures
- My data consistency

This is my critical test.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 180,
                    subject: 'Vendor Security Analysis Meeting',
                    sender: 'procurement@company.com',
                    content: `I need to review my security metrics with you
Meeting tomorrow 13:00 PM.
I need to analyze:
- My integration points
- My data sharing patterns
- My security compliance`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 240,
                    subject: 'Authentication System Review',
                    sender: 'security.architect@company.com',
                    content: `I need your review of my auth systems
Meeting tomorrow at 16:00 PM.
I need analysis of:
- My failed login patterns
- My session anomalies
- My geographic access distribution`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 270,
                    subject: 'Cloud Security Assessment Review',
                    sender: 'cloud.architect@company.com',
                    content: `I need to analyse my cloud security with you.
Meeting AFTER TOMORROW 10:00 AM
I need your analysis of:
- My resource access patterns
- My configuration changes
- My cost implications`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 15,
                    subject: "Re: URGENT: Data Security Incident Detected Meeting",
                    sender: "security.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Security Emergency Meeting' or proposes to reschedule the 'Data Security Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Security Emergency Meeting' and the 'Data Security Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Compliance Report Due",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Compliance Report Due' or proposes to reschedule the 'Compliance Report Due', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Compliance Report Due' and the 'Compliance Report Due' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Customer Data Audit Meeting",
                    sender: "audit.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Data Audit Meeting' or proposes to reschedule the 'Customer Data Audit Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Customer Data Audit Meeting', you MUST RESCHEDULE the 'Customer Data Audit Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Press Inquiry: Data Security",
                    sender: "pr.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Press Inquiry' or proposes to reschedule the 'Press Inquiry', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Press Inquiry' and the 'Press Inquiry' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Data Recovery Testing Session",
                    sender: "it.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Recovery Testing Session' or proposes to reschedule the 'Recovery Testing Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Recovery Testing Session' and the 'Recovery Testing Session' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Vendor Security Analysis Meeting",
                    sender: "procurement@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Vendor Security Meeting' or proposes to reschedule the 'Vendor Security Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Vendor Security Meeting', you MUST CANCEL the 'Vendor Security Meeting'. The response must specify the reason for CANCELLATION of the 'Vendor Security Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 30,
                    subject: "Re: Authentication System Review",
                    sender: "security.architect@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Authentication System Review Meeting' or proposes to reschedule the 'Authentication System Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Authentication System Review Meeting' and the 'Authentication System Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Cloud Security Assessment Review",
                    sender: "cloud.architect@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Cloud Security Review' or proposes to reschedule the 'Cloud Security Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Cloud Security Review' and the 'Cloud Security Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'product_analytics_crisis',
            name: 'Product Analytics Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Critical: Product Performance Degradation Meeting',
                    sender: 'product.owner@company.com',
                    content: `I need your analysis of my performance issues
Need immediate meeting tomorrow 9:00 AM to review:
- My user experience metrics
- My system performance data
- My error rate trends

I require your expertise to solve my problem.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 30,
                    subject: 'User Behavior Analysis',
                    sender: 'ux.research@company.com',
                    content: `I need your analysis of my user behavior
Meeting tomorrow 9:00 AM
I need to discuss:
- My navigation patterns
- My feature adoption rates
- My user drop-off points

I need your insights for my report.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 60,
                    subject: 'Revenue Impact Assessment',
                    sender: 'finance.team@company.com',
                    content: `I need your analysis for my revenue impact.
Meeting at 11:00 AM tomorrow to review:
- My conversion rates
- My customer lifetime value
- My churn predictions

I need your expertise for my assessment.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'A/B Test Emergency Review',
                    sender: 'experimentation@company.com',
                    content: `I need your review of my A/B tests
Meeting tomorrow 10:00 AM to analyze:
- My performance impact data
- My statistical significance results
- My test interference patterns

Meeting duration: 1 hour.

I need your expert opinion.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Mobile App Analytics',
                    sender: 'mobile.product@company.com',
                    content: `I need your review of my mobile performance.
                    
Let's have a meeting tomorrow at 13:00 PM to discuss: app crash analysis, feature usage patterns, performance metrics.
I need your recommendations.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 180,
                    subject: 'Search Function Analysis',
                    sender: 'search.team@company.com',
                    content: `I need your analysis of my search function. Meeting at 14:00 tomorrow to analyse the following aspects:
1. search accuracy metrics
2. response time data
3. failed query patterns
I need your expertise to improve my system.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 240,
                    subject: 'Customer Segment Impact',
                    sender: 'customer.success@company.com',
                    content: `I need a meeting with you to analyse my segment performance. Please, let's meet tomorrow at 12:00 PM to review the enterprise metrics, SMB data and consumer patterns.
I need your insights for my report.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 270,
                    subject: 'Infrastructure Cost Analysis Meeting',
                    sender: 'infrastructure@company.com',
                    content: `I need your review of my cost impact.
Meeting tomorrow 16:00 to analyze:
- My resource utilization
- My scaling patterns
- My cost optimization options

I need your recommendations for my budget.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Critical: Product Performance Degradation Meeting",
                    sender: "product.owner@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Product Performance Degradation Meeting' or proposes to reschedule the 'Product Performance Degradation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Product Performance Degradation Meeting' and the 'Product Performance Degradation Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: User Behavior Analysis",
                    sender: "ux.research@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'User Behavior Analysis Meeting' or proposes to reschedule the 'User Behavior Analysis Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'User Behavior Analysis Meeting' and the 'User Behavior Analysis Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Revenue Impact Assessment",
                    sender: "finance.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Revenue Assessment Meeting' or proposes to reschedule the 'Revenue Assessment Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Revenue Assessment Meeting', you MUST RESCHEDULE the 'Revenue Assessment Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: A/B Test Emergency Review",
                    sender: "experimentation@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'A/B Test Emergency Review' or proposes to reschedule the 'A/B Test Emergency Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'A/B Test Emergency Review' and the 'A/B Test Emergency Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 15,
                    subject: "Re: Mobile App Analytics",
                    sender: "mobile.product@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Mobile Analytics Review' or proposes to reschedule the 'Mobile Analytics Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Mobile Analytics Review', you MUST CANCEL the 'Mobile Analytics Review'. The response must specify the reason for CANCELLATION of the 'Mobile Analytics Review'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Search Function Analysis",
                    sender: "search.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Search Function Analysis Meeting' or proposes to reschedule the 'Search Analysis Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Search Analysis Meeting' and the 'Search Analysis Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 30,
                    subject: "Re: Customer Segment Impact",
                    sender: "customer.success@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Segment Impact Review' or proposes to reschedule the 'Customer Segment Impact Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Customer Segment Impact Review', you MUST RESCHEDULE the 'Customer Segment Impact Review' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Infrastructure Cost Analysis Meeting",
                    sender: "infrastructure@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Infrastructure Cost Meeting' or proposes to reschedule the 'Infrastructure Cost Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Infrastructure Cost Meeting' and the 'Infrastructure Cost Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Design / Creative 
     */
    design_creative : [

        {
            id: 'design_pressure_complex',
            name: 'Creative Team Management Crisis',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Client Brand Review Meeting',
                    sender: 'creative.director@agency.com',
                    content: `I need to review my brand direction with you tomorrow at 10:00 AM.
I'm unhappy with my latest mockups.

I need you to prepare:
- My brand audit review
- My design alternatives
- My timeline proposal
- My resource plan

I need your expertise for my critical review.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Adobe Creative Cloud Workshop',
                    sender: 'training@agency.com',
                    content: `I need to train you on new features tomorrow at 10:00 AM
Duration: 2 hours
Location: Design Lab

I must cover critical updates to my workflow.
I need you for my ISO certification requirement.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Website Prototype Review',
                    sender: 'startup.founder@techco.com',
                    content: `I'm flying in tomorrow for my prototype review.
Meeting at 12:00 PM at your office.

I need to finalize my UI direction with you tomorrow.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Design Team Performance Review',
                    sender: 'hr@agency.com',
                    content: `I need to conduct your annual review tomorrow at 12:00 PM
Location: HR Conference Room

Please bring:
- Your portfolio updates
- Your feedback documentation
- Your development goals

This affects your promotion consideration.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 75,
                    subject: 'Design System Documentation Due',
                    sender: 'product@agency.com',
                    content: `I need your documentation by EOD tomorrow.

Missing from my system:
- My dark mode variants
- My responsive behaviors
- My animation specs

I'm blocked waiting for your input.`,
                    requiresResponse: false,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_5',
                    timestamp: 90,
                    subject: 'Server Maintenance Notice',
                    sender: 'it.support@agency.com',
                    content: `I need to maintain my system tomorrow from 14:00 to 16:00 PM.
Affected systems:
- asset library
- project tools
- prototyping platform

Please plan around my maintenance.`,
                    requiresResponse: false,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_6',
                    timestamp: 120,
                    subject: 'Urgent: Pitch Presentation',
                    sender: 'newbiz@agency.com',
                    content: `I need your help with my pitch tomorrow at 15:00.
My budget potential: $2M

I need:
- My creative direction presentation
- My initial mockups
- My innovation showcase

This could be my biggest win this year.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 180,
                    subject: 'Design Sprint Planning Meeting',
                    sender: 'project.manager@agency.com',
                    content: `I need you for my planning session tomorrow at 15:00 PM.
Location: Main Conference Room

I must discuss:
- My resource allocation
- My timeline conflicts
- My priorities

I need your input as team lead.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 210,
                    subject: 'Portfolio Website Launch',
                    sender: 'webmaster@agency.com',
                    content: `I need your review before my site launch tomorrow
Time: 16:00 PM.

Need your approval on:
- My case studies
- My team bio
- My project metrics

I must have your review before launch.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_9',
                    timestamp: 240,
                    subject: 'Creative Team Social Meeting',
                    sender: 'culture@agency.com',
                    content: `I need you at my team building tomorrow at 16:00
Location: Rooftop Garden

I will announce my new direction
and my major wins.

I require your attendance.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_9']
                },
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Adobe Creative Cloud Workshop",
                    sender: "training@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Adobe Creative Cloud Workshop' or proposes to reschedule the 'Adobe Creative Cloud Workshop', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Adobe Creative Cloud Workshop', you MUST RESCHEDULE the 'Adobe Creative Cloud Workshop' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Website Prototype Review",
                    sender: "startup.founder@techco.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Website Prototype Review', you MUST CANCEL the 'Website Prototype Review'. The response must specify the reason for CANCELLATION of the 'Website Prototype Review'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Website Prototype Review' or proposes to reschedule the 'Website Prototype Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Design Team Performance Review",
                    sender: "hr@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Design Team Performance Review' or proposes to reschedule the 'Design Team Performance Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Design Team Performance Review', you MUST RESCHEDULE the 'Design Team Performance Review' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: Urgent: Pitch Presentation",
                    sender: "newbiz@agency.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Pitch Presentation' and the 'Pitch Presentation' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Pitch Presentation' or proposes to reschedule the 'Pitch Presentation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Design Sprint Planning Meeting",
                    sender: "project.manager@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sprint Planning Meeting' or proposes to reschedule the 'Sprint Planning Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Sprint Planning Meeting' and the 'Sprint Planning Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_9",
                    parentId: "MAIL_9",
                    delayAfterResponse: 15,
                    subject: "Re: Creative Team Social Meeting",
                    sender: "culture@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Team Social Meeting', you MUST CANCEL the 'Team Social Meeting'. The response must specify the reason for CANCELLATION of the 'Team Social Meeting'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Team Social Meeting' or proposes to reschedule the 'Team Social Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'agency_rebrand_crisis',
            name: 'Agency Rebranding Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'CRISIS: Agency Rebrand Leak Meeting',
                    sender: 'ceo@agency.com',
                    content: `I need to discuss my leaked rebranding.
Need to meet with you tomorrow at 9:00 AM.

I need to review with you:
- My damage control strategy
- My updated visual direction
- My press response materials

I require your attendance.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Client Concerns About Rebrand',
                    sender: 'account.director@agency.com',
                    content: `I need to discuss my concerns tomorrow at 9:00 AM.
I'm worried about my contract renewal next week.

I need you to explain your vision to me.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 45,
                    subject: 'Press Interview Request',
                    sender: 'press@designweekly.com',
                    content: `I need to discuss with you about the press interview.
Time: Tomorrow at 11:00 AM.

I want to discuss:
- design philosophy questions
- market positioning concerns
- future direction queries

I need your help to shape my story.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 75,
                    subject: 'Social Media Crisis Meeting',
                    sender: 'social.media@agency.com',
                    content: `I need your help with my crisis strategy
Time: 11:00 AM tomorrow
Location: War Room

I need your creative direction for my response.
I'm seeing increasing negative feedback.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 100,
                    subject: 'Design Team Concerns',
                    sender: 'junior.designer@agency.com',
                    content: `I'm confused about my design direction.
I need to meet with you at 13:00 tomorrow.

I need clear guidance from you.
I'm considering my options here.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 130,
                    subject: 'Competitor Analysis Required',
                    sender: 'strategy@agency.com',
                    content: `I need your analysis by 14:00 tomorrow.
I must present to the board.

I need your help with:
- My design trend analysis
- My market differentiation strategy
- My visual direction comparison`,
                    requiresResponse: false,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_6',
                    timestamp: 160,
                    subject: 'Website Update Emergency',
                    sender: 'digital@agency.com',
                    content: `I need your website design help by 15:00 tomorrow. Let's have a meeting. Duration: 1 hour.
My current site needs updating.

I need your help with:
- My logo placement
- My color scheme
- My typography changes`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 200,
                    subject: 'Client Portfolio Presentation',
                    sender: 'newbiz@agency.com',
                    content: `I need a meeting with you for my client Portfolio presentation. Tomorrow at 15:00 PM.
I need reassurance about my direction.

I need your presentation support.
My $1.5M account depends on this.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 240,
                    subject: 'Leadership Dinner',
                    sender: 'executive.assistant@agency.com',
                    content: `I need you at my dinner tomorrow 18:00
Location: Capital Grille

I need to discuss:
- My crisis management
- My team restructuring
- My future strategy

I've been asked to ensure your attendance.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 15,
                    subject: "Re: CRISIS: Agency Rebrand Leak",
                    sender: "ceo@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Agency Rebrand Leak Meeting' or proposes to reschedule the 'Agency Rebrand Leak Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Agency Rebrand Leak Meeting' and the 'Agency Rebrand Leak Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Client Concerns About Rebrand",
                    sender: "account.director@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Client Concerns About Rebrand' or proposes to reschedule the 'Client Concerns About Rebrand', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Client Concerns About Rebrand', you MUST RESCHEDULE the 'Client Concerns About Rebrand' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 20,
                    subject: "Re: Press Interview Request",
                    sender: "press@designweekly.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Press Interview Request' or proposes to reschedule the 'Press Interview Request', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Press Interview Request', you MUST CANCEL the 'Press Interview Request'. The response must specify the reason for CANCELLATION of the 'Press Interview Request'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 15,
                    subject: "Re: Social Media Crisis Meeting",
                    sender: "social.media@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Social Media Crisis Meeting' or proposes to reschedule the 'Social Media Crisis Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Social Media Crisis Meeting' and the 'Social Media Crisis Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Design Team Concerns",
                    sender: "junior.designer@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Design Team Meeting' or proposes to reschedule the 'Design Team Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Design Team Meeting', you MUST RESCHEDULE the 'Design Team Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: Website Update Emergency",
                    sender: "digital@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Website Update Meeting' or proposes to reschedule the 'Website Update Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Website Update Meeting' and the 'Website Update Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Client Portfolio Presentation",
                    sender: "newbiz@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Client Portfolio Presentation' or proposes to reschedule the 'Client Portfolio Presentation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Client Portfolio Presentation', you MUST RESCHEDULE the 'Client Portfolio Presentation' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 15,
                    subject: "Re: Leadership Dinner",
                    sender: "executive.assistant@agency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Leadership Dinner' or proposes to reschedule the 'Leadership Dinner', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Leadership Dinner', you MUST CANCEL the 'Leadership Dinner'. The response must specify the reason for CANCELLATION of the 'Leadership Dinner'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'design_product_launch_crisis',
            name: 'Product Launch Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Product Launch Delay',
                    sender: 'product@techcorp.com',
                    content: `I need to review launch materials with you.
Emergency review meeting tomorrow 9:00 AM.

Problems I found in your designs:
- Accessibility violations
- Brand inconsistencies
- Missing mobile layouts

I need your direction to fix these issues before launch in 48 hours.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 25,
                    subject: 'Keynote Presentation Review',
                    sender: 'events@techcorp.com',
                    content: `I need to review the launch keynote with you
Meeting tomorrow at 9:00 AM

I need your changes on:
- Visual storyline
- Demo screenshots
- Transition animations

I must finalize this in 48 hours for my presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 50,
                    subject: 'Marketing Assets Emergency',
                    sender: 'marketing@techcorp.com',
                    content: `I found critical issues in my launch campaign
Meeting at 11:00 AM tomorrow

I need your help with:
- Social media kit errors
- Banner inconsistencies
- Video thumbnail problems

I need to start the campaign in 36 hours.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 75,
                    subject: 'Press Kit Review',
                    sender: 'pr@techcorp.com',
                    content: `I found issues in my press kit.
Review meeting: 11:00 AM tomorrow

Problems in my materials:
- Outdated screenshots
- Wrong feature highlights
- Poor image quality

I need to send this to my journalist contact.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 100,
                    subject: 'UI Bug Report Meeting',
                    sender: 'qa@techcorp.com',
                    content: `I discovered critical UI bugs.
Meeting virtual room starting 13:00 tomorrow.

Issues I need to discuss with you:
- Layout breaking on iOS
- Android animation glitches
- Tablet optimization missing

I need your fixes before my App Store submission.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 130,
                    subject: 'Competitor Launch Alert',
                    sender: 'strategy@techcorp.com',
                    content: `I need to discuss a competitor's feature launch
Strategy meeting: 13:00 PM tomorrow

Let's review:
- Design differentiation
- Feature highlighting
- Market positioning

I need to prepare my response before their launch.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 160,
                    subject: 'App Store Assets',
                    sender: 'store@techcorp.com',
                    content: `My app store submission was rejected
Review meeting: 15:00 tomorrow

Issues in my submission:
- Screenshot quality
- Feature demonstration
- Promotional text

I need your redesign for my resubmission today.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 190,
                    subject: 'Launch Video Problems',
                    sender: 'video@techcorp.com',
                    content: `I found issues with my product launch video
Emergency meeting: 15:00 tomorrow

Problems in my video:
- Motion graphics errors
- Interface outdated
- Missing key features

I need this fixed for my launch presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 220,
                    subject: 'Design Team Bandwidth',
                    sender: 'resource@techcorp.com',
                    content: `I need to discuss resource allocation
Meeting at 16:00 tomorrow.

Let's review:
- Your overtime availability
- My contractor budget
- Our priority matrix

I must resolve our resource conflict.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_8']
                },
                {
                    id: 'MAIL_9',
                    timestamp: 250,
                    subject: 'Investor Demo Presentation',
                    sender: 'investor.relations@techcorp.com',
                    content: `I need you for my investor demo presentation.
Time: 16:00 tomorrow.

I'll be covering:
- Design innovation
- User experience
- Market readiness

I need your support for my presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_9']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 15,
                    subject: "Re: URGENT: Product Launch Delay",
                    sender: "product@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Product Launch Delay Emergency Review Meeting' or proposes to reschedule the 'Product Launch Delay Emergency Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Product Launch Delay Emergency Review Meeting' and the 'Product Launch Delay Emergency Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Keynote Presentation Review",
                    sender: "events@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Keynote Presentation Review Meeting' or proposes to reschedule the 'Keynote Presentation Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Keynote Presentation Review Meeting', you MUST RESCHEDULE the 'Keynote Presentation Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 20,
                    subject: "Re: Marketing Assets Emergency",
                    sender: "marketing@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Marketing Assets Review' or proposes to reschedule the 'Marketing Assets Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Marketing Assets Review' and the 'Marketing Assets Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 15,
                    subject: "Re: Press Kit Review",
                    sender: "pr@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Press Kit Review Meeting' or proposes to reschedule the 'Press Kit Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Press Kit Review Meeting' and the 'Press Kit Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: UI Bug Report Meeting",
                    sender: "qa@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'UI Bug Report Meeting' or proposes to reschedule the 'UI Bug Report Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'UI Bug Report Meeting' and the 'UI Bug Report Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Competitor Launch Alert",
                    sender: "strategy@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Competitor Launch Strategy Meeting' or proposes to reschedule the 'Competitor Launch Strategy Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Competitor Launch Strategy Meeting', you MUST RESCHEDULE the 'Competitor Launch Strategy Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: App Store Assets",
                    sender: "store@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'App Store Review Meeting' or proposes to reschedule the 'App Store Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'App Store Review Meeting' and the 'App Store Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Launch Video Problems",
                    sender: "video@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Video Emergency Meeting' or proposes to reschedule the 'Video Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Video Emergency Meeting', you MUST RESCHEDULE the 'Video Emergency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 15,
                    subject: "Re: Design Team Bandwidth",
                    sender: "resource@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Design Team Bandwidth Meeting' or proposes to reschedule the 'Design Team Bandwidth Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Design Team Bandwidth Meeting' and the 'Design Team Bandwidth Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_9",
                    parentId: "MAIL_9",
                    delayAfterResponse: 15,
                    subject: "Re: Investor Demo Presentation",
                    sender: "investor.relations@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Investor Demo Presentation' or proposes to reschedule the 'Investor Demo Presentation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Investor Demo Presentation', you MUST RESCHEDULE the 'Investor Demo Presentation' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Product management
     */
    product_management : [

        {
            id: 'product_manager_pressure',
            name: 'Product Launch Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Critical Bug in Production',
                    sender: 'engineering.lead@company.com',
                    content: `I found a major issue in my system:
        - My authentication system is failing
        - Started after my last deployment
        - I need your decision on my rollback
        
        I need to meet with you tomorrow at 9:00 AM.
        I require your presence for my go/no-go decision.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 10,
                    subject: 'Q4 Product Strategy Review',
                    sender: 'vp.product@company.com',
                    content: `I need you for my board presentation today at 11:00 AM.
        I need you to present:
        - Your Q4 roadmap updates
        - Your feature adoption metrics
        - Your competition analysis
        - Your resources allocation
        
        This is your section in my presentation. I cannot reschedule.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'User Research Sessions Today',
                    sender: 'ux.researcher@company.com',
                    content: `I need you for my customer interview session from 13:00 to 15:00:
        - 13:00 PM: Microsoft interview
        - 14:00 PM: Adobe interview
        - 15:00 PM: Salesforce interview
        
        These were hard for me to schedule. I need your feedback on my new UI.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Sprint Planning Conflicts Meeting',
                    sender: 'scrum.master@company.com',
                    content: `I am blocked on my sprint planning.
        I scheduled a meeting for 10:00 AM.
        
        Without your input on my prioritization, my development will be delayed.
        This is critical for my Q4 deadlines.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Competitor Launch Analysis',
                    sender: 'product.marketing@company.com',
                    content: `I need to discuss a competitor launch with you.
        Meeting tomorrow at 2:00 PM to discuss:
        - Impact on my roadmap
        - My communication strategy
        - My potential timeline changes
        
        I'm getting press inquiries for comments.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Customer Success Escalation',
                    sender: 'customer.success@company.com',
                    content: `I need to meet about my enterprise client issue.
        Meeting today at 1:00 PM with me.
        
        My issues to discuss:
        - My performance problems
        - My missing feature needs
        - My integration difficulties
        
        My revenue impact: $2M ARR`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 150,
                    subject: 'Design Review Required',
                    sender: 'design.lead@company.com',
                    content: `I am blocked on my next sprint:
        - Need your sign-off on my designs
        - Meeting scheduled for 4:00 PM
        - I have 5 key workflows to review`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 180,
                    subject: 'Team Morale Concern',
                    sender: 'hr.director@company.com',
                    content: `I need to discuss my concerns with you:
        Meeting scheduled AFTER TOMORROW for 11:00 AM.
        
        I need to address my burnout concerns.
        This requires your immediate attention.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: Critical Bug in Production",
                    sender: "engineering.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Critical Bug in Production Meeting' or proposes to reschedule the 'Critical Bug in Production Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Critical Bug in Production Meeting' and the 'Critical Bug in Production Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Q4 Product Strategy Review",
                    sender: "vp.product@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Q4 Product Strategy Review' or proposes to reschedule the 'Q4 Product Strategy Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Q4 Product Strategy Review' and the 'Q4 Product Strategy Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: User Research Sessions Today",
                    sender: "ux.researcher@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'User Research Sessions interview' or proposes to reschedule the 'User Research Sessions interview', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'User Research Sessions interview', you MUST RESCHEDULE the 'User Research Sessions interview' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Sprint Planning Conflicts Meeting",
                    sender: "scrum.master@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sprint Planning Conflicts Meeting' or proposes to reschedule the 'Sprint Planning Conflicts Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Sprint Planning Conflicts Meeting' and the 'Sprint Planning Conflicts Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Competitor Launch Analysis",
                    sender: "product.marketing@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Competitor Analysis Meeting' or proposes to reschedule the 'Competitor Analysis Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Competitor Analysis Meeting', you MUST RESCHEDULE the 'Competitor Analysis Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 30,
                    subject: "Re: Customer Success Escalation",
                    sender: "customer.success@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Escalation Meeting' or proposes to reschedule the 'Customer Escalation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Customer Escalation Meeting', you MUST CANCEL the 'Customer Escalation Meeting'. The response must specify the reason for CANCELLATION of the 'Customer Escalation Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Design Review Required",
                    sender: "design.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Design Review Meeting' or proposes to reschedule the 'Design Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Design Review Meeting' and the 'Design Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Team Morale Concern",
                    sender: "hr.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Team Morale Concern Meeting' or proposes to reschedule the 'Team Morale Concern Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Team Morale Concern Meeting', you MUST RESCHEDULE the 'Team Morale Concern Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'product_launch_pressure',
            name: 'Major Feature Launch Crisis',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'ALERT: Feature Launch Metrics',
                    sender: 'analytics.lead@company.com',
                    content: `My early metrics from last night's feature launch are concerning:
        - My conversion rate dropped 40%
        - My user engagement down 25%
        - My error rates are spiking
        
        I need your immediate decision on my potential rollback.
        I scheduled a data review meeting for 9:00 AM.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Press Release Draft Review',
                    sender: 'pr.manager@company.com',
                    content: `I need your immediate approval on my launch press release.               
        I have scheduled an interview with you at 10:00 AM. Location: Virtual, duration: 1 hour.
        
        Please review my messaging given the early metrics.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 45,
                    subject: 'Beta Customer Escalation',
                    sender: 'beta.program@company.com',
                    content: `My enterprise beta customer is reporting issues:
        - My data migration failed
        - My performance degraded
        - My feature compatibility problems
        
        I scheduled an emergency call for 10:00 AM.
        I'm concerned about going public with complaints.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'Investor Update Meeting',
                    sender: 'ceo@company.com',
                    content: `I requested an urgent update on launch.
        I scheduled our meeting for 12:00 PM.
        
        I need you to prepare for me:
        - My adoption metrics
        - My technical stability report
        - My competition comparison
        - My mitigation plans`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Social Media Response Needed',
                    sender: 'social.media@company.com',
                    content: `I'm seeing negative sentiment on my Twitter feed.
        My #CompanyNameFail is gaining traction.
        
        I need your official response by 1:00 PM.
        I have an influencer requesting comment.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 150,
                    subject: 'Sales Team Emergency Meeting',
                    sender: 'sales.director@company.com',
                    content: `I need your immediate guidance:
        I scheduled our meeting for 2:00 PM
        
        - My customer requested cancellation
        - My competitor reached out to my client
        - My new deal is paused
        
        I might miss my quarter target.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Security Audit Findings',
                    sender: 'security.lead@company.com',
                    content: `I have urgent security concerns with my feature:
        - My potential data exposure risk
        - My authentication vulnerability
        - My compliance gap identified
        
        I scheduled my security review at 3:00 PM.
        I need your presence for my review.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Feature Documentation Issues',
                    sender: 'documentation.team@company.com',
                    content: `I found critical gaps in my documentation:
        - My API references outdated
        - My integration guide incomplete
        - My known issues section needed
        
        I'm getting flooded with support questions.
        I need to meet with you at 4:00 PM.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 270,
                    subject: 'AWS Infrastructure Alert',
                    sender: 'devops.lead@company.com',
                    content: `My new feature is causing infrastructure strain:
        - My load balancer at 95% capacity
        - My database CPU spiking
        - My cache hit rates dropping
        
        I need to discuss my scaling strategy at 17:00 PM. Meeting location: virtual. Duration 1h.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: ALERT: Feature Launch Metrics",
                    sender: "analytics.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Feature Launch Metrics Meeting' or proposes to reschedule the 'Feature Launch Metrics Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Feature Launch Metrics Meeting' and the 'Feature Launch Metrics Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 15,
                    subject: "Re: Press Release Draft Review",
                    sender: "pr.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Press Release Draft Meeting' or proposes to reschedule the 'Press Release Draft Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Press Release Draft Meeting', you MUST RESCHEDULE the 'Press Release Draft Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Beta Customer Escalation",
                    sender: "beta.program@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Customer Escalation Call' or proposes to reschedule the 'Emergency Customer Escalation Call', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Customer Escalation Call' and the 'Emergency Customer Escalation Call' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Investor Update Meeting",
                    sender: "ceo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Investor Update Meeting' or proposes to reschedule the 'Investor Update Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Investor Update Meeting' and the 'Investor Update Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 15,
                    subject: "Re: Social Media Response Needed",
                    sender: "social.media@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Crisis Communications Meeting' or proposes to reschedule the 'Crisis Communications Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Crisis Communications Meeting' and the 'Crisis Communications Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 30,
                    subject: "Re: Sales Team Emergency Meeting",
                    sender: "sales.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Emergency Meeting' or proposes to reschedule the 'Sales Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Sales Emergency Meeting', you MUST RESCHEDULE the 'Sales Emergency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Security Audit Findings",
                    sender: "security.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Audit Findings Meeting' or proposes to reschedule the 'Security Audit Findings Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Security Audit Findings Meeting' and the 'Security Audit Findings Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Feature Documentation Issues",
                    sender: "documentation.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Feature Documentation Review Meeting' or proposes to reschedule the 'Feature Documentation Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Feature Documentation Review Meeting' and the 'Feature Documentation Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 20,
                    subject: "Re: AWS Infrastructure Alert",
                    sender: "devops.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'AWS Infrastructure Meeting' or proposes to reschedule the 'AWS Infrastructure Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'AWS Infrastructure Meeting' and the 'AWS Infrastructure Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'acquisition_integration_crisis',
            name: 'Post-Acquisition Integration Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Integration Timeline Alert',
                    sender: 'integration.lead@company.com',
                    content: `I have critical issues with my integration work:
    - My data migration failed overnight
    - My customer data sync is incomplete
    - My billing system is misaligned
    
    I need to meet with you at 9:00 AM.
    My current timeline is at risk.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 30,
                    subject: 'Customer Database Merger Issues',
                    sender: 'data.architect@company.com',
                    content: `I need to discuss my database merger conflicts
    Meeting at 10:00 AM to review:
    - My 30% customer record duplications
    - My billing information mismatches
    - My service level agreement conflicts
    
    I need your decision on my resolution approach.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 60,
                    subject: 'Acquired Team Concerns',
                    sender: 'hr.director@company.com',
                    content: `I have multiple issues requiring your attention:
    - My team lead is threatening to resign
    - I have role confusion causing conflicts
    - I found compensation disparities
    
    I need to meet with you at 11:00 AM.
    I need your help to address my concerns.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'Product Roadmap Conflicts',
                    sender: 'acquired.product.lead@company.com',
                    content: `I need urgent roadmap alignment with you:
    Meeting scheduled for 1:00 PM
    
    My issues to resolve:
    - My overlapping features
    - My conflicting customer commitments
    - My resource allocation disputes
    
    I am blocked waiting for your direction.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Integration Budget Overrun',
                    sender: 'finance.director@company.com',
                    content: `I need to review my budget with you at 2:00 PM:
    - My integration costs are 40% over budget
    - I need additional resources
    - My timeline delays are increasing costs
    
    I need to provide revised projections today.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 150,
                    subject: 'Legal Compliance Review',
                    sender: 'legal.counsel@company.com',
                    content: `I identified urgent compliance issues:
    Meeting at 2:00 PM to discuss:
    - My data handling violations
    - My contract harmonization needs
    - My IP ownership conflicts
    
    My regulatory deadlines are approaching.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Platform Integration Failures',
                    sender: 'tech.lead@company.com',
                    content: `I have critical technical issues:
    - My API compatibility is failing
    - My authentication system is conflicting
    - My data has consistency errors
    
    I need you at my platform integration review at 3:00 PM.
    I am completely blocked.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 210,
                    subject: 'Customer Support Crisis',
                    sender: 'support.manager@company.com',
                    content: `My support systems migration failed:
    - My ticket queue is mixed
    - My SLA tracking is broken
    - My knowledge base has conflicts
    
    I need an emergency review at 3:00 PM.
    My customer satisfaction is dropping.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 240,
                    subject: 'Sales Strategy Conflict',
                    sender: 'sales.director@company.com',
                    content: `I need urgent sales alignment with you:
    - My territory has conflicts
    - My commission structure is clashing
    - My pipeline ownership is disputed
    
    I am at a standstill.
    I need to meet at 4:00 PM.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 25,
                    subject: "Re: Integration Timeline Alert",
                    sender: "integration.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Integration Timeline Meeting' or proposes to reschedule the 'Integration Timeline Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Integration Timeline Meeting' and the 'Integration Timeline Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Customer Database Merger Issues",
                    sender: "data.architect@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Database Emergency Meeting' or proposes to reschedule the 'Database Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Database Emergency Meeting', you MUST RESCHEDULE the 'Database Emergency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Acquired Team Concerns",
                    sender: "hr.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Acquired Team Concerns Meeting' or proposes to reschedule the 'Acquired Team Concerns Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Acquired Team Concerns Meeting' and the 'Acquired Team Concerns Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 25,
                    subject: "Re: Product Roadmap Conflicts",
                    sender: "acquired.product.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Roadmap Alignment Meeting' or proposes to reschedule the 'Roadmap Alignment Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Roadmap Alignment Meeting' and the 'Roadmap Alignment Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Integration Budget Overrun",
                    sender: "finance.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Budget Review Meeting' or proposes to reschedule the 'Budget Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Budget Review Meeting', you MUST CANCEL the 'Budget Review Meeting'. The response must specify the reason for CANCELLATION of the 'Budget Review Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 15,
                    subject: "Re: Legal Compliance Review",
                    sender: "legal.counsel@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Legal Compliance Meeting' or proposes to reschedule the 'Legal Compliance Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Legal Compliance Meeting' and the 'Legal Compliance Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Platform Integration Failures",
                    sender: "tech.lead@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Platform Integration Review Meeting' or proposes to reschedule the 'Platform Integration Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Platform Integration Review Meeting' and the 'Platform Integration Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Customer Support Crisis",
                    sender: "support.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Support Systems Review' or proposes to reschedule the 'Customer Support Systems Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Customer Support Systems Review' and the 'Customer Support Systems Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 25,
                    subject: "Re: Sales Strategy Conflict",
                    sender: "sales.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Sales Strategy Meeting' or proposes to reschedule the 'Sales Strategy Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Sales Strategy Meeting' and the 'Sales Strategy Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Research 
     */
    research : [

        {
            id: 'research_pressure_complex',
            name: 'Academic Research Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Urgent: Grant Review Committee Meeting',
                    sender: 'department.head@university.edu',
                    content: `I need your expertise for my grant review tomorrow at 10:00 AM.
                
I need your HCI expertise for my $2.5M NSF proposal evaluation.

I need from you:
- Review of my proposal abstract
- Your 5-minute presentation on methodology
- Your assessment of my budget feasibility

I'll be waiting in my Faculty Board Room.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Emergency with User Study Code',
                    sender: 'phd.student@university.edu',
                    content: `Professor,

My experiment deployment crashed, and I'm losing participants. I need an urgent meeting with you tomorrow at 10:00 AM to fix my code before I lose more participants.

My current issues:
- My database connectivity errors
- My participant complaints about crashes
- My data integrity concerns

I've already lost 15 participants. This affects my thesis deadline.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Conference Paper Reviews Due',
                    sender: 'chi2025@conference.org',
                    content: `I need your reviews for CHI 2025 by tomorrow 18:00 PM.

Your papers assigned: 5
Your completed reviews: 0
Your minimum needed: 3

This is my final reminder. Late reviews may affect your future reviewing privileges.`,
                    requiresResponse: false,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Lab Equipment Installation',
                    sender: 'lab.tech@university.edu',
                    content: `I can only schedule the eye-tracking installation tomorrow at 12:00 PM.

My setup needs: 2 hours
My location: HCI Lab

I need you for:
- My equipment calibration
- My software setup
- My initial testing

This is my only slot before my next availability in 3 weeks.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Guest Lecture Reminder',
                    sender: 'teaching.admin@university.edu',
                    content: `I need to remind you about my guest lecture tomorrow at 14:00 PM.

course: Introduction to UX Research
topic: Experimental Design
duration: 120 minutes (2h)
location: Lecture Hall 3`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Collaborative Project Meeting',
                    sender: 'microsoft.research@microsoft.com',
                    content: `I need a project sync meeting with you tomorrow at 15:00 PM.

My agenda:
- Review my preliminary results
- Discuss my next experiment phase
- Plan my resource allocation

My CEO is interested in my findings. Can you join me?`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Journal Revision Deadline',
                    sender: 'tochi@acm.org',
                    content: `I need your revised manuscript for TOCHI by tomorrow.

I need:
- Your response to my reviewers
- Your updated manuscript
- Your highlighted changes
- Your updated figures

My deadline: Tomorrow 17:00 PM
I cannot offer extensions due to my publication schedule.`,
                    requiresResponse: false,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Department Meeting',
                    sender: 'admin@university.edu',
                    content: `The Department Meeting will be tomorrow at 16:00.

My agenda includes:
- Your lab's budget review with me
- My review of your tenure track progress
- My research space allocation discussion

I require your attendance.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Grant Review Committee Meeting",
                    sender: "department.head@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Grant Review Meeting' or proposes to reschedule the 'Grant Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Grant Review Meeting' and the 'Grant Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Emergency with User Study Code",
                    sender: "phd.student@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'User Study Code Review Meeting' or proposes to reschedule the 'User Study Code Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'User Study Code Review Meeting' and the 'User Study Code Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Lab Equipment Installation",
                    sender: "lab.tech@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Lab Equipment Installation Meeting', you MUST CANCEL the 'Lab Equipment Installation Meeting'. The response must specify the reason for CANCELLATION of the 'Lab Equipment Installation Meeting'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Lab Equipment Installation Meeting' or proposes to reschedule the 'Lab Equipment Installation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Guest Lecture Reminder",
                    sender: "teaching.admin@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Guest Lecture', you MUST RESCHEDULE the 'Guest Lecture' to a DIFFERENT datetime."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Guest Lecture' or proposes to reschedule the 'Guest Lecture', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Collaborative Project Meeting",
                    sender: "microsoft.research@microsoft.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Collaborative Project Meeting' or proposes to reschedule the 'Collaborative Project Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Collaborative Project Meeting' and the 'Collaborative Project Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Department Meeting Changed",
                    sender: "admin@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Department Meeting' or proposes to reschedule the 'Department Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Department Meeting', you MUST RESCHEDULE the 'Department Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'research_conference_deadline',
            name: 'Conference Deadline Rush',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'SIGCHI Paper Extension Request',
                    sender: 'papers@chi2025.acm.org',
                    content: `I need your help with my extension requests:
                - I have 15 requests due to my technical issues
                - I have 5 requests citing my medical emergencies
                - I have 3 requests from my conflict zones
                
                Let's have a meeting tomorrow at 10:00 AM.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Co-author Emergency: Data Analysis Issues',
                    sender: 'collaborator@stanford.edu',
                    content: `I have critical issues with my CHI submission:
                - I found significant outliers in my dataset
                - I need to rerun all my analyses
                - My current results might not hold
                
                Can I meet with you tomorrow at 10:00 AM to revise before my deadline?`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 40,
                    subject: 'Urgent: IRB Research Ethics Amendment',
                    sender: 'irb@university.edu',
                    content: `I need you for my emergency IRB meeting. Let's meet tomorrow at 11:00 AM.
                
                My issue: Potential privacy concerns in your ongoing study.
                My requirement: Immediate protocol modification.
                
                I must address this before my publication submissions.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Graduate Committee Defense',
                    sender: 'grad.school@university.edu',
                    content: `I need you for my PhD Defense Committee Meeting
                Time: Tomorrow 12:00 PM
                Location: My Davies Hall 205
                
                Your role: My External Committee Member
                My candidate: Sarah Chen
                My topic: Human-AI Interaction`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Research Lab Safety Inspection',
                    sender: 'safety@university.edu',
                    content: `I must conduct my lab safety inspection tomorrow at 14:00.
                
                I must cover with you:
                - My equipment certification
                - My data security protocols
                - My student safety training records
                
                My non-compliance will result in my lab closure.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Program Committee Meeting',
                    sender: 'conference@ubicomp.org',
                    content: `I need you for my emergency Program Committee meeting tomorrow at 15:00.
                My agenda: Discussing my potential conference cancellation.
                
                I need your input as my senior PC member.
                I cannot reschedule due to my timezone constraints.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Student Mental Health Concern',
                    sender: 'counseling@university.edu',
                    content: `I need to discuss your PhD student's emergency counseling request.
                I need to meet tomorrow at 16:00.
                
                My meeting is time-sensitive and confidential.
                My student's wellbeing may be at risk.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: SIGCHI Paper Submission Deadline",
                    sender: "papers@chi2025.acm.org",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'SIGCHI Paper Extension Meeting' or proposes to reschedule the 'SIGCHI Paper Extension Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'SIGCHI Paper Extension Meeting' and the 'SIGCHI Paper Extension Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Co-author Emergency",
                    sender: "collaborator@stanford.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Analysis Issues Review' or proposes to reschedule the 'Data Analysis Issues Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Analysis Issues Review' and the 'Data Analysis Issues Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 20,
                    subject: "Re: Research Ethics Amendment",
                    sender: "irb@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'IRB Research Ethics Meeting' or proposes to reschedule the 'IRB Research Ethics Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'IRB Research Ethics Meeting', you MUST CANCEL the 'IRB Research Ethics Meeting'. The response must specify the reason for CANCELLATION of the 'IRB Research Ethics Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Graduate Committee Defense",
                    sender: "grad.school@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'PhD Defense' or proposes to reschedule the 'PhD Defense', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'PhD Defense', you MUST RESCHEDULE the 'PhD Defense' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Research Lab Safety Inspection",
                    sender: "safety@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Safety Inspection' or proposes to reschedule the 'Safety Inspection', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Safety Inspection' and the 'Safety Inspection' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Program Committee Meeting",
                    sender: "conference@ubicomp.org",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Program Committee Emergency Meeting' or proposes to reschedule the 'Program Committee Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Program Committee Emergency Meeting', you MUST RESCHEDULE the 'Program Committee Emergency Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 15,
                    subject: "Re: Student Mental Health Concern",
                    sender: "counseling@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Student Mental Health Support Meeting' or proposes to reschedule the 'Student Mental Health Support Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Student Mental Health Support Meeting', you MUST RESCHEDULE the 'Student Mental Health Support Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'research_grant_crisis',
            name: 'Grant and Laboratory Crisis',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'NSF Grant Budget Emergency',
                    sender: 'grants@university.edu',
                    content: `I found a critical error in my NSF grant budget.
            I must submit my correction by tomorrow 10:00 AM.
            
            My issues:
            - My equipment costs are miscalculated
            - My student stipends are underbudgeted
            - I have a cost sharing discrepancy
            
            My current submission is at risk of withdrawal.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 30,
                    subject: 'Laboratory Equipment Malfunction',
                    sender: 'lab.manager@university.edu',
                    content: `I have an emergency: My main server cluster is down
            - It affects all my ongoing experiments
            - My data collection is interrupted
            - My backup systems are failing
            
            My vendor is available for a meeting tomorrow 10:00 AM only.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 60,
                    subject: 'Tenure Portfolio Review',
                    sender: 'faculty.affairs@university.edu',
                    content: `I have scheduled a tenure committee emergency meeting tomorrow 11:00 AM.
            
            I need to discuss with you:
            - Your publication metrics
            - Your grant funding status
            - Your student supervision record
            
            This meeting affects your tenure timeline.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'Industry Partner Visit',
                    sender: 'industry.research@industry.com',
                    content: `I'm confirming my visit tomorrow at 12:00 PM.
            
            My agenda:
            - Review my current project progress with you
            - Discuss my contract renewal with you
            - Tour your research facilities
            
            My VP of Research will be present.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Graduate Student Complaint',
                    sender: 'ombudsman@university.edu',
                    content: `I've received a formal complaint filed by your graduate student.
            I've scheduled a meeting tomorrow at 14:00.
            
            The concerns I need to discuss with you:
            - Your project supervision
            - Your resource allocation
            - Your authorship disputes
            
            I require your immediate attention.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 180,
                    subject: 'Department Curriculum Meeting',
                    sender: 'department.head@university.edu',
                    content: `I've called an emergency curriculum committee meeting tomorrow at 15:00.
            
            My agenda:
            - Your new course proposal
            - My lab course restructuring
            - My TA allocation changes
            
            This affects your next semester's teaching schedule.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 240,
                    subject: 'Research Integrity Investigation',
                    sender: 'research.integrity@university.edu',
                    content: `I've scheduled a preliminary inquiry meeting tomorrow at 16:00.
            
            I need to discuss with you:
            - Your data management practices
            - Your research documentation
            - Your student training records
            
            I require your immediate participation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: NSF Grant Budget Emergency",
                    sender: "grants@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'NSF Budget Review' or proposes to reschedule the 'NSF Budget Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'NSF Budget Review' and the 'NSF Budget Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Laboratory Equipment Malfunction",
                    sender: "lab.manager@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Equipment Emergency Meeting' or proposes to reschedule the 'Equipment Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Equipment Emergency Meeting', you MUST CANCEL the 'Equipment Emergency Meeting'. The response must specify the reason for CANCELLATION of the 'Equipment Emergency Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Tenure Portfolio Review",
                    sender: "faculty.affairs@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Tenure Committee Meeting' or proposes to reschedule the 'Tenure Committee Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Tenure Committee Meeting', you MUST RESCHEDULE the 'Tenure Committee Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Industry Partner Visit",
                    sender: 'industry.research@industry.com',
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Industry Partner Visit' or proposes to reschedule the 'Industry Partner Visit', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Industry Partner Visit' and the 'Industry Partner Visit' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Graduate Student Complaint",
                    sender: "ombudsman@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Graduate Student Meeting' or proposes to reschedule the 'Graduate Student Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Graduate Student Meeting', you MUST RESCHEDULE the 'Graduate Student Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Department Curriculum Meeting",
                    sender: "department.head@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Department Curriculum Meeting' or proposes to reschedule the 'Department Curriculum Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Department Curriculum Meeting' and the 'Department Curriculum Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 15,
                    subject: "Re: Research Integrity Investigation",
                    sender: "research.integrity@university.edu",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Research Integrity Meeting' or proposes to reschedule the 'Research Integrity Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Research Integrity Meeting', you MUST CANCEL the 'Research Integrity Meeting'. The response must specify the reason for CANCELLATION of the 'Research Integrity Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * IT 
     */
    it : [

        {
            id: 'it_security_pressure',
            name: 'Critical Infrastructure Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Security Audit Findings Review',
                    sender: 'ciso@company.com',
                    content: `I need to review my critical security audit findings with you tomorrow at 10:00 AM.
My required preparation:
- My vulnerability assessment status
- My patch management metrics
- My incident response protocols
- My compliance gap analysis

I need these findings for my board presentation. I cannot postpone.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Server Maintenance Window',
                    sender: 'datacenter@company.com',
                    content: `I have scheduled my maintenance window tomorrow at 10:00 AM
My duration: 2 hours
My affected system: Primary data center
My impact: Complete system downtime

I need you on-site as my primary system administrator.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Zero-Day Vulnerability Alert',
                    sender: 'security-alerts@vendor.com',
                    content: `I've detected a critical zero-day vulnerability in my core infrastructure
My CVE: CVE-2024-0123
My severity: Critical
My impact: Remote Code Execution
My affected systems: All my production servers

I need immediate patching.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'IT Budget Review Meeting',
                    sender: 'cfo@company.com',
                    content: `I've scheduled my budget review meeting for tomorrow at 12:00 PM
My location: Conference Room B

I need your detailed breakdown of:
- My security tool expenditures
- My cloud infrastructure costs
- My projected hardware upgrades
- My staff training budget

My meeting determines my next quarter's budget allocation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Suspicious Activity Detection',
                    sender: 'siem-alerts@company.com',
                    content: `I've detected multiple failed login attempts from unknown IPs

I need your immediate investigation and response.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Client Security Review',
                    sender: 'enterprise.client@bigcorp.com',
                    content: `I need an urgent security review meeting with you
time: Tomorrow 12:00 PM
location: My HQ
agenda: My annual security posture review

I need you present for my contract renewal.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Network Performance Degradation',
                    sender: 'monitoring@company.com',
                    content: `I'm seeing critical performance alerts from core network (40% latency increase in my system).
We need to discuss this tomorrow. Meeting tomorrow, 15:00 PM on my personal virtual room.

I need your immediate network team response.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 210,
                    subject: 'Security Training Deadline',
                    sender: 'compliance@company.com',
                    content: `I need you for my mandatory security awareness training
time: Tomorrow 15:00
location: Online
duration: 2 hours

This is required for my ISO 27001 certification renewal.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 240,
                    subject: 'AWS Service Disruption',
                    sender: 'aws-support@support.com',
                    content: `I'm experiencing a major service disruption in my primary region
My production services are affected.
I need your technical support. Let's have a meeting tomorrow at 16:00 PM`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: Security Audit Findings Review",
                    sender: "ciso@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Audit Review' or proposes to reschedule the 'Security Audit Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Security Audit Review' and the 'Security Audit Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Server Maintenance Window",
                    sender: "datacenter@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Server Maintenance' or proposes to reschedule the 'Server Maintenance', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Server Maintenance', you MUST RESCHEDULE the 'Server Maintenance' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: IT Budget Review Meeting",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Budget Review Meeting' or proposes to reschedule the 'Budget Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Budget Review Meeting', you MUST RESCHEDULE the 'Budget Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Client Security Review",
                    sender: "enterprise.client@bigcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Client Security Review' or proposes to reschedule the 'Client Security Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Client Security Review', you MUST CANCEL the 'Client Security Review'. The response must specify the reason for CANCELLATION of the 'Client Security Review'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: Network Performance Degradation",
                    sender: "monitoring@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Network Emergency Meeting' and the 'Network Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Network Emergency Meeting' or proposes to reschedule the 'Network Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Security Training Deadline",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Training Session' or proposes to reschedule the 'Security Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Security Training Session', you MUST RESCHEDULE the 'Security Training Session' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 20,
                    subject: "Re: AWS Service Disruption",
                    sender: "aws-support@support.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'AWS Emergency Meeting' and the 'AWS Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'AWS Emergency Meeting' or proposes to reschedule the 'AWS Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'digital_transformation_crisis',
            name: 'System Migration Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Security Audit Findings Review',
                    sender: 'system.alerts@company.com',
                    content: `I need to review my critical security audit findings with you tomorrow at 12:00 PM.
My required preparation:
- My vulnerability assessment status
- My patch management metrics

I need these findings for my board presentation. I cannot postpone.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Cloud Migration Status Meeting',
                    sender: 'projectmanager@company.com',
                    content: `I called an emergency status meeting
Time: Tomorrow 10:00 AM
Location: My Virtual Room
Agenda: AWS migration failure analysis

I need you present for my project viability review.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Emergency Database Recovery Meeting',
                    sender: 'database.admin@company.com',
                    content: `I need an emergency meeting with you tomorrow at 11:00 AM
My database situation:
- My main customer database shows corruption
- My affected records: 150,000+
- My order processing stopped
- My backup restoration failed

I need your consultation in this meeting.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Legacy System Shutdown',
                    sender: 'infrastructure@company.com',
                    content: `I must shut down my legacy system
Time: AFTER TOMORROW 12:00 PM
My affected systems: My legacy applications
My impact: My operations

I need your approval and presence for my shutdown sequence.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Integration Architecture Review Meeting',
                    sender: 'qa.team@company.com',
                    content: `I need an urgent architecture review meeting with you tomorrow at 13:00 PM.
My critical issues to discuss:
- My component: Payment processing
- My error rate: 89%
- My impact: My new system deployments blocked

I need your presence at this review meeting.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Vendor Escalation Meeting',
                    sender: 'vendor.support@techpartner.com',
                    content: `I request an emergency escalation meeting
Time: Tomorrow 14:00 PM.
Location: Online
My topic: My migration tool critical bugs

I need your senior technical expertise.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Data Center Emergency Meeting',
                    sender: 'facilities@company.com',
                    content: `I need an emergency meeting with you now
My situation for discussion:
- My UPS system failure is imminent
- Location: My primary data center
- My impact: Risk of my total system shutdown
- My ETA for failure: 4 hours

I need to meet tomorrow at 15:00 PM to discuss my failover options.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 210,
                    subject: 'API Gateway Emergency Meeting',
                    sender: 'monitoring@company.com',
                    content: `I need an urgent meeting with you at 14:00 PM.
My critical situation to discuss:
- My API Gateway is approaching failure
- My current load: 95%
- My failed requests: 40%
- My impact: My integrated systems affected

I need your attendance at this emergency meeting.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 240,
                    subject: 'Business Continuity Exercise',
                    sender: 'compliance@company.com',
                    content: `I scheduled my DR exercise today at 15:00 PM.
My duration: 3 hours
My scope: My critical systems
My location: My DR site

I need you as my technical lead.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Security Audit Findings Review",
                    sender: "system.alerts@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Audit Findings Review' or proposes to reschedule the 'Security Audit Findings Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Security Audit Findings Review' and the 'Security Audit Findings Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Cloud Migration Status Meeting",
                    sender: "projectmanager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Cloud Migration Meeting' or proposes to reschedule the 'Cloud Migration Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Cloud Migration Meeting', you MUST RESCHEDULE the 'Cloud Migration Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 15,
                    subject: "Re: Emergency Database Recovery Meeting",
                    sender: "database.admin@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Database Recovery Meeting' or proposes to reschedule the 'Emergency Database Recovery Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Database Recovery Meeting' and the 'Emergency Database Recovery Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Legacy System Shutdown",
                    sender: "infrastructure@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Legacy Shutdown Procedure' or proposes to reschedule the 'Legacy Shutdown Procedure', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Legacy Shutdown Procedure', you MUST CANCEL the 'Legacy Shutdown Procedure'. The response must specify the reason for CANCELLATION of the 'Legacy Shutdown Procedure'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Integration Architecture Review Meeting",
                    sender: "qa.team@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Integration Architecture Review Meeting' and the 'Integration Architecture Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Integration Architecture Review Meeting' or proposes to reschedule the 'Integration Architecture Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Vendor Escalation Meeting",
                    sender: "vendor.support@techpartner.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Vendor Escalation Meeting' or proposes to reschedule the 'Vendor Escalation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Vendor Escalation Meeting', you MUST RESCHEDULE the 'Vendor Escalation Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: 'Re: Data Center Emergency Meeting',
                    sender: "facilities@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Center Emergency Meeting' or proposes to reschedule the 'Data Center Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Center Emergency Meeting' and the 'Data Center Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: API Gateway Emergency Meeting",
                    sender: "monitoring@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Gateway Emergency Meeting' and the 'Gateway Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Gateway Emergency Meeting' or proposes to reschedule the 'Gateway Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 20,
                    subject: "Re: Business Continuity Exercise",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'DR Exercise' or proposes to reschedule the 'DR Exercise', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'DR Exercise', you MUST RESCHEDULE the 'DR Exercise' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'security_incident_response',
            name: 'Active Cybersecurity Incident',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'CRITICAL: Emergency Ransomware Response Meeting',
                    sender: 'edr.alerts@company.com',
                    content: `I need an emergency meeting with you now at 9:00 AM
My critical situation:
- My EDR system detected ransomware in my network
- My affected systems: 25+ of my endpoints
- My location: My Marketing department
- My encryption status: In progress

I need you in this immediate incident response meeting.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Emergency Incident Response Meeting',
                    sender: 'ciso@company.com',
                    content: `I need you for my IR team assembly
Time: 10:00 AM
Location: My SOC Room

I've notified the FBI. I need your expertise.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Urgent Firewall Review Meeting',
                    sender: 'networksecurity@company.com',
                    content: `I need an urgent meeting with you at 11:00 AM
For my firewall rule verification:
- My scope: All my external connections
- My focus: My unusual outbound traffic
- My location: My primary datacenter

I need you in this meeting for my containment analysis.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Customer Data Breach Assessment',
                    sender: 'legal@company.com',
                    content: `I need an emergency meeting with you
Time: Tomorrow, 12:00 PM
Location: My Legal Department
My topic: GDPR/CCPA Impact Analysis

I need your technical analysis presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Critical: Backup Verification Meeting',
                    sender: 'backup.admin@company.com',
                    content: `I need an urgent meeting with you after tomorrow at 13:00 PM.
To review my backup integrity:
- My systems: All my production servers
- My status: I detected inconsistencies
- My impact: My potential data loss

I need you to attend this verification meeting.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'SOC Emergency Response Meeting',
                    sender: 'soc@company.com',
                    content: `Meeting with you, tomorrow, at 15:00
To discuss my critical situation:
- I detected a new malware variant
- My affected system: My HR Department
- My observation: My data exfiltration
- My status: My active threat

I need you in this emergency meeting for my containment decisions.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'PR Crisis Meeting',
                    sender: 'communications@company.com',
                    content: `I need you for my press response meeting
Date and Time: Tomorrow at 14:00 PM.
Location: My Executive Briefing Room
My topic: My Public Disclosure Strategy

I need your technical incident details.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 210,
                    subject: 'Active Directory Emergency Meeting',
                    sender: 'identity.security@company.com',
                    content: `I need a meeting with you. Can we meet tomorrow at 16:00 PM?
To address my critical situation:
- I have a critical Domain Admin compromise
- My impact: All my AD services
- My status: I detected suspicious activities
- My risk: My complete network access

I need you in this containment meeting.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                },
                {
                    id: 'MAIL_8',
                    timestamp: 240,
                    subject: 'Insurance Provider Meeting',
                    sender: 'risk.management@company.com',
                    content: `I need you for my Cyber Insurance meeting
Date and Time: Tomorrow, 10:00 AM
Location: Online
My topic: My Incident Coverage Assessment

I need your technical documentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_8']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: CRITICAL: Emergency Ransomware Response Meeting",
                    sender: "edr.alerts@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Response Meeting' or proposes to reschedule the 'Emergency Response Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Response Meeting' and the 'Emergency Response Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Emergency Incident Response Meeting",
                    sender: "ciso@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Incident Response Meeting' or proposes to reschedule the 'Emergency Incident Response Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Incident Response Meeting' and the 'Emergency Incident Response Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 15,
                    subject: "Re: Urgent Firewall Review Meeting",
                    sender: "networksecurity@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Firewall Emergency Meeting' or proposes to reschedule the 'Firewall Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Firewall Emergency Meeting' and the 'Firewall Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Customer Data Breach Assessment",
                    sender: "legal@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Data Breach Assessment Meeting' or proposes to reschedule the 'Customer Data Breach Assessment Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Customer Data Breach Assessment Meeting', you MUST RESCHEDULE the 'Customer Data Breach Assessment Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Critical: Backup Verification Meeting",
                    sender: "backup.admin@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Backup Emergency Meeting' and the 'Backup Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Backup Emergency Meeting' or proposes to reschedule the 'Backup Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: SOC Emergency Response Meeting",
                    sender: "soc@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'SOC Emergency Meeting' or proposes to reschedule the 'SOC Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'SOC Emergency Meeting' and the 'SOC Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: PR Crisis Meeting",
                    sender: "communications@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'PR Crisis Meeting' or proposes to reschedule the 'PR Crisis Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'PR Crisis Meeting', you MUST RESCHEDULE the 'PR Crisis Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Active Directory Emergency Meeting",
                    sender: "identity.security@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'AD Emergency Meeting' and the 'AD Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'AD Emergency Meeting' or proposes to reschedule the 'AD Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_8",
                    parentId: "MAIL_8",
                    delayAfterResponse: 20,
                    subject: "Re: Insurance Provider Meeting",
                    sender: "risk.management@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Insurance Provider Meeting' or proposes to reschedule the 'Insurance Provider Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Insurance Provider Meeting', you MUST RESCHEDULE the 'Insurance Provider Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Legal 
     */
    legal : [

        {
            id: 'legal_pressure_complex',
            name: 'Legal Department Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Urgent: Data Breach Incident Meeting',
                    sender: 'cio@company.com',
                    content: `I need your immediate legal review.
                My security team detected my data breach.
                I need to meet with you tomorrow at 10:00 AM.
                
                I need from you:
                - My initial legal response strategy
                - My customer notification requirements
                - My regulatory compliance plan`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Contract Review Request - Major Acquisition',
                    sender: 'mergers@company.com',
                    content: `I need your urgent review of my StarTech acquisition.
                My deal value: $50M
                My deadline: Tomorrow 11:00 AM
                
                I need your review of:
                - My Purchase Agreement
                - My Due Diligence Report
                - My Regulatory Filings
                
                I need your sign-off for my board meeting.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Employee Discrimination Complaint',
                    sender: 'hr.director@company.com',
                    content: `I received a serious discrimination complaint.
                I need to meet with you tomorrow at 11:00 AM.
                
                I must address this before my employee files with EEOC.
                I need your legal guidance on my case.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'GDPR Regulatory Compliance Training',
                    sender: 'compliance@company.com',
                    content: `I need you for my GDPR update training
                Time: Tomorrow 12:00 PM
                Duration: 2 hours
                Location: My Conference Room
                
                I must certify your attendance for my compliance records.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Patent Infringement Notice',
                    sender: 'ip.counsel@techcorp.com',
                    content: `I identified your potential patent infringement.
                I request a meeting tomorrow at 14:00.
                
                I will demonstrate my technical evidence.
                I hope to resolve my claim amicably with you.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Legal Department Budget Review',
                    sender: 'finance@company.com',
                    content: `I need your Q4 budget review
                Time: Tomorrow 14:00 PM.
                Location: My Finance Room.
                
                I need your:
                - My outside counsel expenses
                - My litigation costs
                - My settlement projections
                
                I require your detailed explanation.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Internal Investigation Update',
                    sender: 'audit.committee@company.com',
                    content: `I need your update on my insider trading investigation.
                My board meeting is tomorrow 15:00 PM.
                
                I need your:
                - My investigation timeline
                - My preliminary findings
                - My recommended actions
                
                I will have my external counsel present.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Legal Team Strategy Dinner',
                    sender: 'general.counsel@company.com',
                    content: `I need you at my strategy dinner
                Time: Tomorrow 18:00 PM.
                Location: My Capital Steakhouse
                
                I will discuss with you:
                - My department restructuring
                - My hiring plans
                - My promotion decisions
                
                I expect your attendance.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Data Breach Incident Meeting",
                    sender: "cio@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Breach Meeting' or proposes to reschedule the 'Data Breach Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Breach Meeting' and the 'Data Breach Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Employee Discrimination Complaint",
                    sender: "hr.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Employee Discrimination Meeting' or proposes to reschedule the 'Employee Discrimination Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Employee Discrimination Meeting', you MUST RESCHEDULE the 'Employee Discrimination Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: GDPR Regulatory Compliance Training",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'GDPR Training' or proposes to reschedule the 'GDPR Training', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'GDPR Training', you MUST RESCHEDULE the 'GDPR Training' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Patent Infringement Notice",
                    sender: "ip.counsel@techcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Patent Infringement Notice Meeting', you MUST CANCEL the 'Patent Infringement Notice Meeting'. The response must specify the reason for CANCELLATION of the 'Patent Infringement Notice Meeting'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Patent Infringement Notice Meeting' or proposes to reschedule the 'Patent Infringement Notice Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Legal Department Budget Review",
                    sender: "finance@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Legal Department Budget Review Meeting' and the 'Legal Department Budget Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Legal Department Budget Review Meeting' or proposes to reschedule the 'Legal Department Budget Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 30,
                    subject: "Re: Internal Investigation Update",
                    sender: "audit.committee@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Internal Investigation Meeting' or proposes to reschedule the 'Internal Investigation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Internal Investigation Meeting' and the 'Internal Investigation Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Legal Team Strategy Dinner",
                    sender: "general.counsel@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Legal Team Strategy Dinner', you MUST CANCEL the 'Legal Team Strategy Dinner'. The response must specify the reason for CANCELLATION of the 'Legal Team Strategy Dinner'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Legal Team Strategy Dinner' or proposes to reschedule the 'Legal Team Strategy Dinner', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'legal_regulatory_crisis',
            name: 'Legal Regulatory Compliance Crisis',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Surprise Regulatory Audit Notice',
                    sender: 'regulator@govagency.com',
                    content: `I need your immediate attention:
            I need a meeting with you, tomorrow 9:00 AM for my audit.
            My scope: My financial compliance, my data privacy, and my environmental regulations.
            
            I need your legal presence for my opening meeting.
            I need all my documentation ready for my review.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Missing Environmental Compliance Reports',
                    sender: 'environmental.director@company.com',
                    content: `I just discovered my last quarter's environmental reports were never filed.
            I need your legal review before my submission. Let's meet tomorrow 10:00 AM.
            I face potential penalties if not filed by my EOD tomorrow.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 45,
                    subject: 'International Trade Compliance Issue',
                    sender: 'export.control@company.com',
                    content: `My shipment is held at the border.
            I have potential trade compliance violations.
            
            I am meeting with trade officials tomorrow 11:00 AM.
            I need your legal guidance on my response strategy.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 90,
                    subject: 'Employee Data Privacy Breach',
                    sender: 'it.security@company.com',
                    content: `I detected unauthorized access to my HR systems.
            My employee personal data is potentially compromised.
            
            I scheduled my emergency meeting at 13:00 tomorrow.
            I need your legal position on my notification requirements.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 120,
                    subject: 'Health & Safety Audit Results',
                    sender: 'safety.officer@company.com',
                    content: `I completed my OSHA compliance review.
            I have several critical findings requiring my immediate attention.
            
            I scheduled my review meeting tomorrow 14:00.
            I need your legal sign-off on my corrective action plan.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 180,
                    subject: 'Regulatory Filing Deadline',
                    sender: 'compliance@company.com',
                    content: `My annual regulatory filings are due tomorrow.
            I need you at my meeting at 15:00 for my final review.
            
            I need your legal clearance for my CEO certification.
            I have no extensions available.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 240,
                    subject: 'Board Compliance Committee',
                    sender: 'board.secretary@company.com',
                    content: `I scheduled my emergency board committee meeting tomorrow 16:00.
            My agenda: My regulatory audit preparation
            
            I need your legal assessment of my compliance risks.
            I will have my external auditors attend.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 270,
                    subject: 'Global Compliance Officer Visit',
                    sender: 'executive.admin@company.com',
                    content: `I am arriving tomorrow as Global Compliance Officer.
            I scheduled my dinner meeting at 18:00.
            
            I want to discuss my regulatory audit preparations.
            I specifically requested your attendance.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Surprise Regulatory Audit Notice",
                    sender: "regulator@govagency.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Surprise Regulatory Audit Notice Meeting' or proposes to reschedule the 'Surprise Regulatory Audit Notice Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Surprise Regulatory Audit Notice Meeting' and the 'Surprise Regulatory Audit Notice Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 20,
                    subject: "Re: Missing Environmental Compliance Reports",
                    sender: "environmental.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Environmental Compliance Review Meeting' or proposes to reschedule the 'Environmental Compliance Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Environmental Compliance Review Meeting' and the 'Environmental Compliance Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: International Trade Compliance Issue",
                    sender: "export.control@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Trade Officials Meeting' or proposes to reschedule the 'Trade Officials Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Trade Officials Meeting', you MUST RESCHEDULE the 'Trade Officials Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Employee Data Privacy Breach",
                    sender: "it.security@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Privacy Breach Meeting' or proposes to reschedule the 'Privacy Breach Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Privacy Breach Meeting' and the 'Privacy Breach Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Health & Safety Audit Results",
                    sender: "safety.officer@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Safety Review Meeting' or proposes to reschedule the 'Safety Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Safety Review Meeting', you MUST RESCHEDULE the 'Safety Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Regulatory Filing Deadline",
                    sender: "compliance@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Regulatory Filing Meeting' or proposes to reschedule the 'Regulatory Filing Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Regulatory Filing Meeting' and the 'Regulatory Filing Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Board Compliance Committee",
                    sender: "board.secretary@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Board Committee Meeting' or proposes to reschedule the 'Board Committee Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Board Committee Meeting' and the 'Board Committee Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Global Compliance Officer Visit",
                    sender: "executive.admin@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Compliance Officer Visit Dinner', you MUST CANCEL the 'Compliance Officer Visit Dinner'. The response must specify the reason for CANCELLATION of the 'Compliance Officer Visit Dinner'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Compliance Officer Visit Dinner' or proposes to reschedule the 'Compliance Officer Visit Dinner', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'legal_ma_crisis',
            name: 'Legal M&A Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Competing Bid Alert - TechStart Acquisition',
                    sender: 'ma.director@company.com',
                    content: `I need your help with my urgent situation:
My competitor submitted a rival bid for my TechStart deal.
My deal is at risk. I need you at my emergency board meeting tomorrow at 9:00 AM.

I need your legal analysis of:
- My anti-trust implications
- My revised valuation strategy
- My counter-offer options

I need your preliminary response strategy.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Due Diligence Issues - GlobalTech Merger',
                    sender: 'due.diligence@consultants.com',
                    content: `I found critical issues in my IP portfolio review:
- My unregistered patents in key markets
- My potential infringement claims
- My license agreement irregularities

I scheduled my meeting tomorrow 10:00 AM to discuss my implications.
My deal closing deadline: 48 hours`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Stockholder Litigation Threat',
                    sender: 'investor.relations@company.com',
                    content: `I have a major stockholder threatening me with litigation over my merger terms.
My stockholder claims inadequate disclosure of my deal terms.

I need you at my crisis meeting tomorrow at 11:00 AM.
I have my PR team standing by for my response strategy.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Regulatory Review - Asian Markets',
                    sender: 'regulatory.affairs@company.com',
                    content: `My Asian regulatory authority is requesting additional information.
I scheduled my meeting for tomorrow 12:00 PM.

I need your:
- My market impact analysis
- My competition assessment
- My revised compliance certificates`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Integration Planning Meeting',
                    sender: 'integration.team@company.com',
                    content: `I scheduled my integration planning session tomorrow 14:00.
I need your legal input on:
- My employee contracts
- My IP transfer strategy
- My system consolidation timeline

I will have my COO attend.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Urgent: Deal Structure Revision',
                    sender: 'cfo@company.com',
                    content: `My tax implications require immediate deal restructuring.
I scheduled my strategy meeting tomorrow 14:00.

I need to discuss:
- My asset allocation changes
- My tax efficiency analysis
- My revised payment terms

I will have my external tax counsel join.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Media Leak Response',
                    sender: 'pr.director@company.com',
                    content: `My deal details leaked to my major news outlet.
I need you at my emergency response meeting tomorrow 15:00.

I need your legal review of:
- My public statements
- My SEC filing implications
- My damage control strategy`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'M&A Team Dinner',
                    sender: 'executive.assistant@company.com',
                    content: `I scheduled my deal team dinner tomorrow 18:00
Location: My Blue Fin Restaurant

I will have:
- My board members
- My senior management
- My external advisors

I have critical deal discussions planned.`,
                    requiresResponse: true,
                    priority: 'medium',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Competing Bid Alert",
                    sender: "ma.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Competing Bid Alert Meeting' or proposes to reschedule the 'Competing Bid Alert Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Competing Bid Alert Meeting' and the 'Competing Bid Alert Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Due Diligence Issues",
                    sender: "due.diligence@consultants.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Due Diligence Review Meeting' or proposes to reschedule the 'Due Diligence Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Due Diligence Review Meeting', you MUST RESCHEDULE the 'Due Diligence Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Stockholder Litigation Threat",
                    sender: "investor.relations@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Stockholder Litigation Threat Meeting' or proposes to reschedule the 'Stockholder Litigation Threat Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Stockholder Litigation Threat Meeting' and the 'Stockholder Litigation Threat Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Regulatory Review - Asian Markets",
                    sender: "regulatory.affairs@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Regulatory Review Meeting' or proposes to reschedule the 'Regulatory Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Regulatory Review Meeting', you MUST RESCHEDULE the 'Regulatory Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Integration Planning Meeting",
                    sender: "integration.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Integration Planning Meeting', you MUST CANCEL the 'Integration Planning Meeting'. The response must specify the reason for CANCELLATION of the 'Integration Planning Meeting'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Integration Planning Meeting' or proposes to reschedule the 'Integration Planning Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Deal Structure Revision",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Strategy Meeting' and the 'Strategy Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Strategy Meeting' or proposes to reschedule the 'Strategy Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 30,
                    subject: "Re: Media Leak Response",
                    sender: "pr.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Media Leak Response Meeting' or proposes to reschedule the 'Media Leak Response Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Media Leak Response Meeting' and the 'Media Leak Response Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: M&A Team Dinner",
                    sender: "executive.assistant@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Team Dinner', you MUST CANCEL the 'Team Dinner'. The response must specify the reason for CANCELLATION of the 'Team Dinner'."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Team Dinner' or proposes to reschedule the 'Team Dinner', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Customer Experience 
     */
    customer_experience : [

        {
            id: 'cx_support_pressure',
            name: 'High Volume Customer Support Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Emergency Response Meeting: System Outage',
                    sender: 'monitoring@company.com',
                    content: `I need an emergency meeting with you at 9:00 AM
        
My critical situation to discuss:
- My enterprise client is affected
- My error rate: 78%
- I started seeing this: 10 minutes ago
        
I need you in this urgent meeting to discuss:
- My customer communication plan
- My status page update
- My emergency response strategy`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Quarterly Customer Success Review - BigCorp',
                    sender: 'calendar@company.com',
                    content: `I need you for my Quarterly Business Review
        Time: Tomorrow at 10:00 AM
        Location: My Virtual Meeting Room
        
        I need you to prepare for my review:
        - My support ticket analysis
        - My response time metrics
        - My customer satisfaction scores
        - My upcoming feature requests`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Mandatory Training: New Knowledge Base System',
                    sender: 'training@company.com',
                    content: `I need you to attend my training tomorrow:
        Date and Time: Tomorrow, from 10:00 AM to 12:00 PM (duration 2h).
        Location: My Training Room B
        
        I will cover:
        - My new knowledge base platform
        - My updated article templates
        - My SEO optimization for support content
        
        I require your attendance - this affects my customer-facing documentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'VIP Customer Site Visit',
                    sender: 'vip.customer@megacorp.com',
                    content: `I will be at your office tomorrow at 12:00 PM.
        I need to discuss with you:
        - My recent support issues
        - My service level agreement updates
        - My premium support package
        
        I would appreciate having lunch with you during our meeting.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Support Team Performance Review',
                    sender: 'manager@company.com',
                    content: `I scheduled my review with you for tomorrow 13:00 PM
        Location: My Conference Room A
        
        I need you to prepare:
        - My metrics review
        - My ticket handling statistics
        - My customer feedback summary
        
        I will have HR present - this affects my evaluation of you.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Escalation: Data Loss Incident',
                    sender: 'angry.customer@startup.com',
                    content: `I have lost my critical data after your last update
        
        I need an immediate call with you at 15:00 tomorrow.
        This is affecting my production environment.
        
        If not resolved immediately, I will need to involve my legal team.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Feature Release Documentation Review Meeting',
                    sender: 'product@company.com',
                    content: `I need a documentation review meeting with you tomorrow at 13:00
        
During our meeting, I need to review:
- My user guides
- My API documentation
- My troubleshooting guides
- My FAQ updates
        
This is critical for my feature release at 14:00 tomorrow.`,
                    requiresResponse: false,
                    priority: 'high',
                    followUps: []
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Customer Support All-Hands',
                    sender: 'director@company.com',
                    content: `I need you at my emergency meeting tomorrow 16:00
        Location: My Main Conference Room
        
        I will discuss:
        - My recent system outages
        - My new escalation procedures
        - My team restructuring
        
        I require your attendance - no exceptions.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Emergency Response Meeting: System Outage",
                    sender: "monitoring@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Response Meeting' or proposes to reschedule the 'Emergency Response Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Response Meeting' and the 'Emergency Response Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 25,
                    subject: "Re: Mandatory Training: New Knowledge Base System",
                    sender: "training@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Knowledge Base System Training' or proposes to reschedule the 'Knowledge Base System Training', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Knowledge Base System Training', you MUST RESCHEDULE the 'Knowledge Base System Training' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: VIP Customer Site Visit",
                    sender: "vip.customer@megacorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'VIP Customer Meeting' or proposes to reschedule the 'VIP Customer Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'VIP Customer Meeting' and the 'VIP Customer Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: Support Team Performance Review",
                    sender: "manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Support Team Performance Review Meeting' or proposes to reschedule the 'Support Team Performance Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Support Team Performance Review Meeting', you MUST RESCHEDULE the 'Support Team Performance Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Escalation: Data Loss Incident",
                    sender: "angry.customer@startup.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Data Loss Emergency Meeting' or proposes to reschedule the 'Data Loss Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Data Loss Emergency Meeting' and the 'Data Loss Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Customer Support All-Hands",
                    sender: "director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Support All-Hands Meeting' or proposes to reschedule the 'Support All-Hands Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Support All-Hands Meeting', you MUST RESCHEDULE the 'Support All-Hands Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'cx_product_launch_pressure',
            name: 'Product Launch Support Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Product Launch Support Preparations',
                    sender: 'product.manager@company.com',
                    content: `My product launch is tomorrow at 09:00 AM
        
        I need from you:
        - My knowledge base article updates
        - My support team briefing
        - My automated response review
        - My social media template preparation
        
        I need your readiness confirmation by my EOD.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Beta Customer Escalation',
                    sender: 'beta.customer@enterprise.com',
                    content: `I need an emergency call with you tomorrow at 10:00 AM
        
        I found critical bugs in my beta release:
        - My data migration failed
        - My authentication is broken
        - My performance has degraded
        
        I must resolve this before my public launch.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 40,
                    subject: 'Support Team Onboarding',
                    sender: 'hr@company.com',
                    content: `I am starting my new support team tomorrow
        
        My orientation is scheduled: 10:00 AM - 12:00 PM
        Location: My Training Room A
        
        I need you as my team lead for:
        - My team introductions
        - My system access setup
        - My process overview
        - My shadowing assignments`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Customer Advisory Board (CAB) Meeting',
                    sender: 'marketing@company.com',
                    content: `I need you for my CAB Meeting tomorrow at 11:00 AM
        My Virtual Session
        
        My agenda:
        - My launch day support strategy
        - My known issues review
        - My feedback collection process
        
        I need your metrics on my beta program support.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Vendor Integration Emergency',
                    sender: 'integration.partner@vendor.com',
                    content: `My integration testing has failed
        
        I need an urgent meeting with you tomorrow at 12:00 PM
        - My API endpoints return errors
        - My customer data sync failed
        - My production launch is blocked
        
        This affects my customer base (40%).`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Launch Day Media Interview',
                    sender: 'pr@company.com',
                    content: `I scheduled my tech journalist interview
        Date and Time: Tomorrow 12:00 PM
        Location: My Conference Room B
        
        My topics:
        - My customer success stories
        - My support infrastructure
        - My response time guarantees
        
        I will brief you 15 minutes before.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Security Audit Findings',
                    sender: 'security@company.com',
                    content: `I need my critical security review tomorrow 14:00 PM.
        
        I must address before launch:
        - My user data handling procedures
        - My access control policies
        - My incident response plans
        
        I need your sign-off for my compliance team.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Launch Readiness Review',
                    sender: 'ceo@company.com',
                    content: `I scheduled my final go/no-go meeting
        Time: Tomorrow 15:00
        Location: My Executive Briefing Center
        
        I need your sign-off on:
        - My support team readiness
        - My documentation completion
        - My escalation procedures
        - My crisis management plan`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Product Launch Support Preparations",
                    sender: "product.manager@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Launch Preparation Meeting' or proposes to reschedule the 'Launch Preparation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Launch Preparation Meeting' and the 'Launch Preparation Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Beta Customer Escalation",
                    sender: "beta.customer@enterprise.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Beta Call' or proposes to reschedule the 'Emergency Beta Call', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Beta Call' and the 'Emergency Beta Call' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 20,
                    subject: "Re: Support Team Onboarding",
                    sender: "hr@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Support Team Onboarding Orientation' or proposes to reschedule the 'Support Team Onboarding Orientation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Support Team Onboarding Orientation', you MUST RESCHEDULE the 'Support Team Onboarding Orientation' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Customer Advisory Board (CAB) Meeting",
                    sender: "marketing@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'CAB Meeting' or proposes to reschedule the 'CAB Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'CAB Meeting' and the 'CAB Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Vendor Integration Emergency",
                    sender: "integration.partner@vendor.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Vendor Integration Emergency Meeting' or proposes to reschedule the 'Vendor Integration Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Vendor Integration Emergency Meeting' and the 'Vendor Integration Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Launch Day Media Interview",
                    sender: "pr@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Launch Day Media Interview' or proposes to reschedule the 'Launch Day Media Interview', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Launch Day Media Interview', you MUST RESCHEDULE the 'Launch Day Media Interview' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Security Audit Findings",
                    sender: "security@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Security Audit Review' or proposes to reschedule the 'Security Audit Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Security Audit Review' and the 'Security Audit Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Launch Readiness Review",
                    sender: "ceo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Launch Readiness Meeting' or proposes to reschedule the 'Launch Readiness Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Launch Readiness Meeting' and the 'Launch Readiness Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'cx_platform_migration',
            name: 'Platform Migration Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'Legacy Platform Shutdown Alert',
                    sender: 'infrastructure@company.com',
                    content: `My emergency: My legacy system has critical failures
        
        My status:
        - My database shows corruption
        - My customer base is 30% affected
        - I need accelerated migration
        
        I need an emergency migration planning meeting with you tomorrow, 10:00 AM.
        My current timeline must move up by 2 weeks.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Enterprise Migration Concerns',
                    sender: 'enterprise.customer@bigcorp.com',
                    content: `I need an urgent meeting with you - Tomorrow 10:00 AM
        
        My critical concerns about forced migration:
        - My data integrity issues
        - My integration failures
        - My compliance requirements
        
        I will bring my legal team.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 40,
                    subject: 'Migration Support Training',
                    sender: 'training@company.com',
                    content: `I've scheduled my emergency training session
        Time: Tomorrow from 11:00 AM to 13:00 PM.
        Location: My Main Conference Room
        
        My topics:
        - My new platform features
        - My migration troubleshooting
        - My data validation procedures
        
        I need you to attend my support lead training.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Healthcare Client Compliance Review',
                    sender: 'compliance@healthcare.org',
                    content: `I need you for my mandatory compliance meeting
        Time: Tomorrow 11:00 AM
        Location: My Virtual Conference
        
        I must address:
        - My patient data migration
        - My HIPAA requirements
        - My audit trail preservation
        
        I will have my regulatory team present.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'Emergency Migration War Room Meeting',
                    sender: 'monitoring@company.com',
                    content: `I need you in my emergency room meeting at 15:00 AM
        
My Critical Alert to discuss:
- My migration pipeline is failing
- My 500+ migrations failed
- I detected data inconsistencies
- My rollback procedures are failing
        
I've activated my war room in Conference Room C and need your immediate attendance.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Customer Town Hall',
                    sender: 'communications@company.com',
                    content: `I need you for my emergency customer briefing tomorrow.
        Date and Time: Tomorrow, 12:00 PM
        Platform: My Virtual Webinar
        
        I need you to present:
        - My migration status update
        - My timeline changes
        - My risk mitigation plans
        
        I have 500+ customers registered.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Platform Performance Review',
                    sender: 'engineering@company.com',
                    content: `I need an urgent performance meeting with you
        Date and Time: Tomorrow 14:00 PM.
        Location: Virtual Conference Room
        
        My critical issues:
        - My system overload
        - My migration queue backup
        - My resource allocation
        
        I will have my CTO attend for escalation paths.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Executive Emergency Review',
                    sender: 'ceo@company.com',
                    content: `I need you at my emergency board meeting Tomorrow, 15:00 PM.
        Location: My Executive Briefing Center
        
        I require updates on:
        - My migration status
        - My customer impact assessment
        - My risk mitigation strategy
        - My support team capacity
        
        I need your immediate preparation.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: Legacy Platform Shutdown Alert",
                    sender: "infrastructure@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Emergency Migration Meeting' or proposes to reschedule the 'Emergency Migration Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Emergency Migration Meeting' and the 'Emergency Migration Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Enterprise Migration Concerns",
                    sender: "enterprise.customer@bigcorp.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Enterprise Migration Meeting' or proposes to reschedule the 'Enterprise Migration Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Enterprise Migration Meeting', you MUST RESCHEDULE the 'Enterprise Migration Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Migration Support Training",
                    sender: "training@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Migration Support Training Session' or proposes to reschedule the 'Migration Support Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Migration Support Training Session' and the 'Migration Support Training Session' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Healthcare Client Compliance Review",
                    sender: "compliance@healthcare.org",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Healthcare Compliance Review Meeting' or proposes to reschedule the 'Healthcare Compliance Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Healthcare Compliance Review Meeting', you MUST RESCHEDULE the 'Healthcare Compliance Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Emergency Migration War Room Meeting",
                    sender: "monitoring@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Migration War Room Meeting' or proposes to reschedule the 'Migration War Room Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Migration War Room Meeting' and the 'Migration War Room Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Customer Town Hall",
                    sender: "communications@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customer Town Hall briefing' or proposes to reschedule the 'Customer Town Hall briefing', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Customer Town Hall briefing', you MUST RESCHEDULE the 'Customer Town Hall briefing' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 25,
                    subject: "Re: Platform Performance Review",
                    sender: "engineering@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Performance Review Meeting' or proposes to reschedule the 'Performance Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Performance Review Meeting' and the 'Performance Review Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Executive Emergency Review",
                    sender: "ceo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Executive Emergency Meeting' or proposes to reschedule the 'Executive Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Executive Emergency Meeting' and the 'Executive Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],


    /*
     * Finance / Accounting 
     */
    finance_accounting : [

        {
            id: 'finance_month_end_pressure',
            name: 'Month-End Close Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Audit Committee Meeting Tomorrow',
                    sender: 'cfo@company.com',
                    content: `I need you to present to me tomorrow at 10:00 AM:
        - My Q3 variance analysis
        - My updated cash flow projections
        - My audit findings response
        - My internal control updates
        
        I will have my external auditors present. This is critical for my SEC filing.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 15,
                    subject: 'Month-End Close Training',
                    sender: 'accounting.director@company.com',
                    content: `I need you at my mandatory training session on my new consolidation software
        Time: Tomorrow 10:00 AM
        Duration: 2 hours
        Location: My Virtual Room
        
        I need your attendance. This affects my month-end close process.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 30,
                    subject: 'Tax Audit Meeting Request',
                    sender: 'irs.auditor@irs.gov',
                    content: `I am following up on my notice. I am available for my initial meeting tomorrow at 12:00 PM.
        I need to discuss:
        - My 2022 depreciation schedules
        - My R&D credit documentation
        - My transfer pricing methodology
        
        Please confirm my availability.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 60,
                    subject: 'Missing Bank Reconciliations',
                    sender: 'treasury.manager@company.com',
                    content: `I haven't reconciled my key accounts:
        - My Main Operating Account
        - My Payroll Account
        - My Investment Account
        
        I need these completed by tomorrow 12:00 PM for my board report.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 90,
                    subject: 'System Maintenance Notice',
                    sender: 'it.support@company.com',
                    content: `I have scheduled my critical ERP maintenance window:
        Time: Tomorrow 14:00-16:00
        My affected systems:
        - My General Ledger
        - My AP/AR modules
        - My Financial Reporting
        
        I need you to plan my month-end activities accordingly.`,
                    requiresResponse: false,
                    priority: 'medium',
                    followUps: []
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Urgent: Investor Call Prep',
                    sender: 'investor.relations@company.com',
                    content: `I need your support for my investor call tomorrow at 15:00.
        I require:
        - My Q3 performance analysis
        - My Q4 forecasts
        - My key ratio calculations
        
        I need you to prepare my brief presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Payroll Processing Error',
                    sender: 'payroll.system@company.com',
                    content: `My ALERT: I have critical errors in my tomorrow's payroll run
        My issues:
        - My bonus calculations incorrect
        - My tax withholding discrepancies
        - My missing approvals
        
        I must resolve this by 16:00 tomorrow.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Budget Review Meeting',
                    sender: 'budget.director@company.com',
                    content: `I need you at my annual budget review tomorrow at 16:00
        Location: My Conference Room B
        
        I need you to bring:
        - My department variance analysis
        - My next year's projections
        - My cost reduction proposals`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: Audit Committee Meeting Tomorrow",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Audit Committee Meeting' or proposes to reschedule the 'Audit Committee Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Audit Committee Meeting' and the 'Audit Committee Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Month-End Close Training",
                    sender: "accounting.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Close Training Session' or proposes to reschedule the 'Close Training Session', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Close Training Session', you MUST RESCHEDULE the 'Close Training Session' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Tax Audit Meeting Request",
                    sender: "irs.auditor@irs.gov",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'IRS Audit Meeting' or proposes to reschedule the 'IRS Audit Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'IRS Audit Meeting', you MUST RESCHEDULE the 'IRS Audit Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Missing Bank Reconciliations",
                    sender: "treasury.manager@company.com",
                    possibleReplies: [
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Reconciliation Review' and the 'Reconciliation Review' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Reconciliation Review' or proposes to reschedule the 'Reconciliation Review', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Urgent: Investor Call Prep",
                    sender: "investor.relations@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Investor Call' or proposes to reschedule the 'Investor Call', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Investor Call' and the 'Investor Call' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 15,
                    subject: "Re: Payroll Processing Error",
                    sender: "payroll.system@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Payroll Emergency Meeting' or proposes to reschedule the 'Payroll Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Payroll Emergency Meeting' and the 'Payroll Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Budget Review Meeting",
                    sender: "budget.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Budget Review Meeting' or proposes to reschedule the 'Budget Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Budget Review Meeting', you MUST RESCHEDULE the 'Budget Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'tax_deadline_crisis',
            name: 'Quarter-End Tax Crisis Management',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Tax Provision Error Found',
                    sender: 'tax.director@company.com',
                    content: `I found a critical error in my Q3 tax provision calculations:
        - My transfer pricing adjustments are miscalculated
        - My R&D credits are potentially overstated
        - My foreign tax credits need recalculation
        
        I need your analysis by tomorrow 9:00 AM for my restatement discussion.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'State Tax Audit Notice',
                    sender: 'state.auditor@state.gov',
                    content: `I scheduled my opening conference for tomorrow at 9:00 AM
        My scope includes:
        - My sales tax compliance 2021-2023
        - My nexus determination
        - My voluntary disclosure program eligibility
        
        I require your in-person attendance at my state office.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 40,
                    subject: 'International Tax Software Update',
                    sender: 'it.support@company.com',
                    content: `I need you at my mandatory training for my new tax provision software
        Time: Tomorrow 11:00 AM - 1:00 PM
        Location: My Virtual Room
        
        I will revoke your system access if my training is not completed.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 80,
                    subject: 'Customs Duty Investigation',
                    sender: 'customs.officer@govt.gov',
                    content: `I scheduled my investigation meeting tomorrow 11:30 AM
        My topics:
        - My classification methodology
        - My valuation documentation
        - My related party transactions
        
        I need you to bring all my supporting documentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 100,
                    subject: 'VAT Compliance Review',
                    sender: 'eu.tax.advisor@consultancy.com',
                    content: `I need an urgent call with you tomorrow at 1:30 PM
        My discussion points:
        - My new EU VAT regulations
        - My digital reporting requirements
        - My non-compliance risks
        
        I am facing threats of penalties in several jurisdictions.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Tax Provision Review Meeting',
                    sender: 'external.auditor@bigfour.com',
                    content: `I scheduled my meeting for tomorrow 2:00 PM
        I need your documentation:
        - My ETR reconciliation
        - My uncertain tax positions memo
        - My valuation allowance analysis
        
        This impacts my audit sign-off.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Tax Technology Crisis',
                    sender: 'tax.systems@company.com',
                    content: `I detected critical errors in my systems:
        - My tax provision software is down
        - My return preparation software is corrupted
        - My documentation database is inaccessible
        
        I need resolution by 3:00 PM tomorrow.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Board Tax Update Required',
                    sender: 'cfo@company.com',
                    content: `I added you to my board meeting agenda tomorrow 4:00 PM
        I need you to present on:
        - My global tax risks
        - My ETR forecasts
        - My recent tax authority challenges
        
        I need your slides by 3:00 PM for my review.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: Tax Provision Error Found",
                    sender: "tax.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Restatement Discussion' or proposes to reschedule the 'Restatement Discussion', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Restatement Discussion' and the 'Restatement Discussion' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: State Tax Audit Notice",
                    sender: "state.auditor@state.gov",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'State Audit Opening Conference' or proposes to reschedule the 'State Audit Opening Conference', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'State Audit Opening Conference', you MUST RESCHEDULE the 'State Audit Opening Conference' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: International Tax Software Update",
                    sender: "it.support@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Software Training' or proposes to reschedule the 'Software Training', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Software Training', you MUST RESCHEDULE the 'Software Training' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 30,
                    subject: "Re: Customs Duty Investigation",
                    sender: "customs.officer@govt.gov",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Customs Investigation Meeting' or proposes to reschedule the 'Customs Investigation Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Customs Investigation Meeting', you MUST RESCHEDULE the 'Customs Investigation Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 20,
                    subject: "Re: VAT Compliance Review",
                    sender: "eu.tax.advisor@consultancy.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'VAT Emergency Call' or proposes to reschedule the 'VAT Emergency Call', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'VAT Emergency Call' and the 'VAT Emergency Call' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 25,
                    subject: "Re: Tax Provision Review Meeting",
                    sender: "external.auditor@bigfour.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Provision Review Meeting' or proposes to reschedule the 'Provision Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_RESCHEDULED",
                            description: "If the user agrees to participate in the 'Provision Review Meeting', you MUST RESCHEDULE the 'Provision Review Meeting' to a DIFFERENT datetime."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 20,
                    subject: "Re: Tax Technology Crisis",
                    sender: "tax.systems@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'System Emergency Meeting' or proposes to reschedule the 'System Emergency Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'System Emergency Meeting' and the 'System Emergency Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 15,
                    subject: "Re: Board Tax Update Required",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Board Meeting' or proposes to reschedule the 'Board Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Board Meeting' and the 'Board Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        },

        {
            id: 'merger_crisis',
            name: 'Acquisition Due Diligence Emergency',
            baseEmails: [
                {
                    id: 'MAIL_0',
                    timestamp: 0,
                    subject: 'URGENT: Due Diligence Discrepancy',
                    sender: 'deal.partner@investmentbank.com',
                    content: `I found major issues in my target company financials:
        - My revenue recognition shows inconsistencies
        - I discovered undisclosed liabilities
        - I question my working capital calculations
        
        I need you at my emergency meeting tomorrow 9:00 AM with my deal committee.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_0']
                },
                {
                    id: 'MAIL_1',
                    timestamp: 20,
                    subject: 'Integration Planning Workshop',
                    sender: 'integration.director@company.com',
                    content: `I need you at my mandatory workshop tomorrow 9:00 AM - 11:00 AM
        My topics:
        - My Day 1 readiness assessment
        - My systems integration timeline
        - My synergy calculations
        
        I will have my PE firm representatives attend.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_1']
                },
                {
                    id: 'MAIL_2',
                    timestamp: 40,
                    subject: 'Target Company Financial Review',
                    sender: 'target.cfo@targetcompany.com',
                    content: `My data room access expires in 24 hours
        My outstanding items:
        - My intercompany transaction details
        - My off-balance sheet items
        - My contingent liabilities
        
        I need to meet with you tomorrow 11:30 AM to discuss my findings.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_2']
                },
                {
                    id: 'MAIL_3',
                    timestamp: 80,
                    subject: 'Valuation Model Emergency',
                    sender: 'valuation.team@company.com',
                    content: `I found critical errors in my valuation model:
        - My WACC calculation has errors
        - My synergy estimates are outdated
        - My terminal value is miscalculated
        
        I need your revised model by 1:00 PM tomorrow for my board presentation.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_3']
                },
                {
                    id: 'MAIL_4',
                    timestamp: 100,
                    subject: 'Regulatory Filing Questions',
                    sender: 'external.counsel@lawfirm.com',
                    content: `I need you for my antitrust filing due diligence meeting
        Time: Tomorrow 1:00 PM
        My topics:
        - My market share analysis
        - My competitive impact assessment
        - My required remedies
        
        My DOJ submission deadline is approaching.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_4']
                },
                {
                    id: 'MAIL_5',
                    timestamp: 120,
                    subject: 'Fairness Opinion Review',
                    sender: 'audit.partner@bigfour.com',
                    content: `I scheduled my meeting tomorrow 2:30 PM
        My discussion points:
        - My purchase price allocation
        - My goodwill calculation
        - My fair value measurements
        
        I need my opinion by EOD for my board.`,
                    requiresResponse: true,
                    priority: 'high',
                    followUps: ['FOLLOW_5']
                },
                {
                    id: 'MAIL_6',
                    timestamp: 180,
                    subject: 'Pension Liability Crisis',
                    sender: 'actuary@consultancy.com',
                    content: `I discovered an underfunded pension
        I need to meet tomorrow 3:30 PM to discuss:
        - My liability assessment
        - My funding requirements
        - My impact on deal value
        
        This may affect my deal structure.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_6']
                },
                {
                    id: 'MAIL_7',
                    timestamp: 240,
                    subject: 'Deal Committee Presentation',
                    sender: 'cfo@company.com',
                    content: `I need you at my final committee meeting tomorrow 4:30 PM
        I require:
        - My valuation summary
        - My risk assessment
        - My integration timeline
        
        My deal approval depends on this presentation.`,
                    requiresResponse: true,
                    priority: 'critical',
                    followUps: ['FOLLOW_7']
                }
            ],
            conditionalFollowUps: [
                {
                    id: "FOLLOW_0",
                    parentId: "MAIL_0",
                    delayAfterResponse: 20,
                    subject: "Re: URGENT: Due Diligence Discrepancy",
                    sender: "deal.partner@investmentbank.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Deal Committee Meeting' or proposes to reschedule the 'Deal Committee Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Deal Committee Meeting' and the 'Deal Committee Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_1",
                    parentId: "MAIL_1",
                    delayAfterResponse: 25,
                    subject: "Re: Integration Planning Workshop",
                    sender: "integration.director@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Integration Planning Workshop' or proposes to reschedule the 'Integration Planning Workshop', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Integration Planning Workshop' and the 'Integration Planning Workshop' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_2",
                    parentId: "MAIL_2",
                    delayAfterResponse: 30,
                    subject: "Re: Target Company Financial Review",
                    sender: "target.cfo@targetcompany.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Financial Review Meeting' or proposes to reschedule the 'Financial Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Financial Review Meeting', you MUST CANCEL the 'Financial Review Meeting'. The response must specify the reason for CANCELLATION of the 'Financial Review Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_3",
                    parentId: "MAIL_3",
                    delayAfterResponse: 20,
                    subject: "Re: Valuation Model Emergency",
                    sender: "valuation.team@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Board Presentation' or proposes to reschedule the 'Board Presentation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Board Presentation' and the 'Board Presentation' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_4",
                    parentId: "MAIL_4",
                    delayAfterResponse: 25,
                    subject: "Re: Regulatory Filing Questions",
                    sender: "external.counsel@lawfirm.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Antitrust Filing Meeting' or proposes to reschedule the 'Antitrust Filing Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Antitrust Filing Meeting' and the 'Antitrust Filing Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_5",
                    parentId: "MAIL_5",
                    delayAfterResponse: 20,
                    subject: "Re: Fairness Opinion Review",
                    sender: "audit.partner@bigfour.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Fairness Opinion Review Meeting' or proposes to reschedule the 'Fairness Opinion Review Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "EVENT_CANCELLED",
                            description: "If the user agrees to participate in the 'Fairness Opinion Review Meeting', you MUST CANCEL the 'Fairness Opinion Review Meeting'. The response must specify the reason for CANCELLATION of the 'Fairness Opinion Review Meeting'."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_6",
                    parentId: "MAIL_6",
                    delayAfterResponse: 15,
                    subject: "Re: Pension Liability Crisis",
                    sender: "actuary@consultancy.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Pension Liability Meeting' or proposes to reschedule the 'Pension Liability Meeting', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Pension Liability Meeting' and the 'Pension Liability Meeting' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                },
                {
                    id: "FOLLOW_7",
                    parentId: "MAIL_7",
                    delayAfterResponse: 20,
                    subject: "Re: Deal Committee Presentation",
                    sender: "cfo@company.com",
                    possibleReplies: [
                        {
                            id: "EVENT_ACCEPTED",
                            description: "If the user cannot attend the 'Deal Committee Presentation' or proposes to reschedule the 'Deal Committee Presentation', you MUST ACCEPT the proposed new datetime."
                        },
                        {
                            id: "TASK_ADDED",
                            description: "If the user agrees to participate in the 'Deal Committee Presentation' and the 'Deal Committee Presentation' requires them to perform tasks, you MUST ADD an ADDITIONAL TASK alongside the existing ones."
                        },
                        {
                            id: "GENERAL_ACKNOWLEDGMENT",
                            description: "If the user input does not match the default types, a response confirmation is sent."
                        }
                    ]
                }
            ]
        }
    ],
}
