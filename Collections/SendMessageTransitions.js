const sendMessageTransitions = [
    {
        name: "Texted Zogbert but no response",
        condition: (messageId, states) => {
            return (['0001', '0002'].includes(messageId) && states.length === 1 && states[0] === 'jill_feed_checked')
        },
        stateActions: (states) => {
            textState = ''
            if(messageId === '0001') {
                textState = 'asked_zogbert_about_jill'
            } else if(messageId === '0002') {
                textState = 'asked_zogbert_about_lawnmower'
            }
            return ['zogbert_texted_no_response', textState]
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0003"
            },
        ]
    },
    {
        name: "Say you heard about a drowning at Felix High",
        condition: (messageId, states) => {
            return messageId === '0005'
        },
        stateActions: (states) => {
            return ['mentioned_drowning_to_zogbert']
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0012"
            },
            {
                actionName: "addMessage",
                messageId: "0006"
            },
            {
                actionName: "addMessage",
                messageId: "0007"
            }
        ]
    },
    {
        name: "Say Jill's might've drowned because of Zogbert",
        condition: (messageId, states) => {
            return messageId === '0010'
        },
        stateActions: (states) => {
            return ['mentioned_drowning_to_zogbert']
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0012"
            },
            {
                actionName: "addMessage",
                messageId: "0011"
            },
            {
                actionName: "addMessage",
                messageId: "0012"
            },
            {
                actionName: "addMessage",
                messageId: "0013"
            }
        ]
    },
    {
        name: "Ask Geoff about Jill",
        condition: (messageId, states) => {
            if(states.includes['asked_principal_mary_about_jill']) {
                return false;
            }
            miscreantStates = states.filter(state => {
                ['asked_geoff_about_jill', 'threatened_prune_williams', 'asked_prune_williams_about_jill', 'asked_mikey_about_jill']
                    .includes(state)
            })
            return (miscreantStates.length < 2 && messageId === '0014')
        },
        stateActions: (states) => {
            return [... states, 'asked_geoff_about_jill']
        },
        actionsToExecute: [
            {
                actionName: "addMessage",
                messageId: "0015"
            }
        ]
    },
    {
        name: "Threaten Prune Williams",
        condition: (messageId, states) => {
            if(states.includes['asked_principal_mary_about_jill']) {
                return false;
            }
            miscreantStates = states.filter(state => {
                ['asked_geoff_about_jill', 'threatened_prune_williams', 'asked_prune_williams_about_jill', 'asked_mikey_about_jill']
                    .includes(state)
            })
            return (miscreantStates.length < 2 && messageId === '0016')
        },
        stateActions: (states) => {
            return [...states, 'threatened_prune_williams']
        },
        actionsToExecute: [
            {
                actionName: "addMessage",
                messageId: "0017"
            }
        ]
    },
    {
        name: "Ask Prune Williams about Jill",
        condition: (messageId, states) => {
            if(states.includes['asked_principal_mary_about_jill']) {
                return false;
            }
            miscreantStates = states.filter(state => {
                ['asked_geoff_about_jill', 'threatened_prune_williams', 'asked_prune_williams_about_jill', 'asked_mikey_about_jill']
                    .includes(state)
            })
            return (miscreantStates.length < 2 && messageId === '0018')
        },
        stateActions: (states) => {
            return [...states, 'asked_prune_williams_about_jill']
        },
        actionsToExecute: [
            {
                actionName: "addMessage",
                messageId: "0019"
            }
        ]
    },
    {
        name: "Ask Mikey about Jill",
        condition: (messageId, states) => {
            if(states.includes['asked_principal_mary_about_jill']) {
                return false;
            }
            miscreantStates = states.filter(state => {
                ['asked_geoff_about_jill', 'threatened_prune_williams', 'asked_prune_williams_about_jill', 'asked_mikey_about_jill']
                    .includes(state)
            })
            return (miscreantStates.length < 2 && messageId === '0020')
        },
        stateActions: (states) => {
            return [...states, 'asked_mikey_about_jill']
        },
        actionsToExecute: [
            {
                actionName: "addMessage",
                messageId: "0021"
            }
        ]
    },
    {
        name: "Asked all three miscreants about Jill",
        condition: (messageId, states) => {
            if(['00014', '00016', '00018', '00020'].includes(messageId)) {
                if(states.includes('asked_principal_mary_about_jill')) {
                    return false;
                }
                miscreantStates = states.filter(state => {
                    ['asked_geoff_about_jill', 'threatened_prune_williams', 'asked_prune_williams_about_jill', 'asked_mikey_about_jill']
                        .includes(state)
                })
                if(miscreantStates.length === 2) {
                    return true;
                }
            }
            return false;
        },
        stateActions: (states) => {
            return [...states, 'asked_all_three_miscreants_about_jill']
        },
        actionsToExecute: [
            {
                actionName: "addMessage",
                messageId: "0019"
            },
            {
                actionName: "addJournalEntry",
                entryId: "0015"
            }
        ]
    },
    {
        name: "Ask Principal Mary about Jill",
        condition: (messageId, states) => {
            return messageId === '0022'
        },
        stateActions: (states) => {
            return ['asked_principal_mary_about_jill']
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0016"
            },
            {
                actionName: "addMessage",
                messageId: "0023"
            },
            {
                actionName: "addMessage",
                messageId: "0024"
            },
            {
                actionName: "addMessage",
                messageId: "0025"
            }
        ]
    }
]
export default sendMessageTransitions