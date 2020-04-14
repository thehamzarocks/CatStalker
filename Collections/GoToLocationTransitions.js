const goToLocationTransitions = [
    {
        name: "Arrived at the GarageTown Music Festival",
        condition: (locationId, states) => {
            return (locationId === '0002' && states.includes('zogbert_at_gt'))
        },
        stateActions: (states) => {
            currentStates = [...states, 'arrived_at_gt']
            currentStates = currentStates.filter(state => state != 'zogbert_at_gt')
            return currentStates
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0005"
            },
        ]
    },
    {
        name: "Arrived at Felix High, but no ID",
        condition: (locationId, states) => {
            return (locationId === '0003' && states.includes('arrived_at_gt'))
        },
        stateActions: (states) => {
            return [...states, 'arrived_at_felix_high_no_id']
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0006"
            },
        ]
    },
    {
        name: "Arrived at Fishing Waters to steal ID",
        condition: (locationId, states) => {
            return (locationId === '0004' && states.includes('arrived_at_gt') && states.includes('alice_likes_fishing')
                && states.includes('arrived_at_felix_high_no_id'))
        },
        stateActions: (states) => {
            currentStates =  [...states, 'stole_id_from_alice_boyfriend']
            currentStates = currentStates.filter(state => !['arrived_at_gt', 'alice_likes_fishing',
            'arrived_at_felix_high_no_id'].includes(state))
            return currentStates
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0007"
            },
        ]
    },
    {
        name: "Arrived at Felix High with ID",
        condition: (locationId, states) => {
            return (locationId === '0003' && states.includes('stole_id_from_alice_boyfriend'))
        },
        stateActions: (states) => {
            currentStates = [...states, 'entered_school_with_id']
            currentStates = currentStates.filter(state => (state !== 'stole_id_from_alice_boyfriend'))
            return currentStates;
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0008"
            },
            {
                actionName: "addJournalEntry",
                entryId: "0009"
            }
        ]
    },
    {
        name: "Arrived at GT to create commotion after finding out about drowning, Zogbert replies asking about Jill",
        condition: (locationId, states) => {
            return (locationId === '0002' && states.includes('entered_school_with_id') && 
                states.includes('asked_zogbert_about_jill'))
        },
        stateActions: (states) => {
            currentStates = [...states, 'created_commotion_zogbert_asks_about_jill']
            currentStates = currentStates.filter(state => (state !== 'stole_id_from_alice_boyfriend'
                && state != 'asked_zogbert_about_jill'))
            return currentStates;
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0010"
            },
            {
                actionName: "addJournalEntry",
                entryId: "0011"
            },
            {
                actionName: "addMessage",
                messageId: "0003"
            },
            {
                actionName: "addMessage",
                messageId: "0004"
            },
            {
                actionName: "addAvailablePrompts",
                promptsToAdd: ['0005']
            }
        ]
    },
    {
        name: "Arrived at GT to create commotion after finding out about drowning but Zogbert rescues",
        condition: (locationId, states) => {
            return (locationId === '0002' && states.includes('entered_school_with_id') && 
                states.includes('asked_zogbert_about_lawnmower'))
        },
        stateActions: (states) => {
            currentStates = [...states, 'created_commotion_zogbert_replies_angry']
            currentStates = currentStates.filter(state => (state !== 'stole_id_from_alice_boyfriend'
                && state != 'asked_zogbert_about_lawnmower'))
            return currentStates;
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0010"
            },
            {
                actionName: "addJournalEntry",
                entryId: "0011"
            },
            {
                actionName: "addMessage",
                messageId: "0008"
            },
            {
                actionName: "addMessage",
                messageId: "0009"
            }
        ]
    }
]
export default goToLocationTransitions