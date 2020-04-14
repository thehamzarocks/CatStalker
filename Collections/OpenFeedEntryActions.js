const openFeedEntryTransitions = [
    {
        name: "Opened Jill's Feed in he beginning",
        condition: (userId, states) => {
            return (userId === '0001' && states.length === 1 && states[0] === 'start')
        },
        stateActions: (states) => {
            return ['jill_feed_checked']
        },
        actionsToExecute: [
            {
                actionName: "addAvailablePrompts",
                promptsToAdd: ['0001', '0002']
            },
            {
                actionName: "addJournalEntry",
                entryId: "0002"
            },
        ]
    },
    {
        name: "Opened Zogbert's Feed - says he's at the GarageTown Music Festival",
        condition: (userId, states) => {
            return (userId === '0002' && states.includes('zogbert_texted_no_response'))
        },
        stateActions: (states) => {
            currentStates = [...states, 'zogbert_at_gt']
            currentStates = currentStates.filter(state => state != 'zogbert_texted_no_response')
            return currentStates
        },
        actionsToExecute: [
            {
                actionName: "addJournalEntry",
                entryId: "0004"
            },
        ]
    },
    {
        name: "Opened Alice's feed. She likes fishing",
        condition: (userId, states) => {
            return (userId === '0005' && states.includes('arrived_at_gt'))
        },
        stateActions: (states) => {
            return [...states, 'alice_likes_fishing']
        },
        actionsToExecute: []
    }
]
export default openFeedEntryTransitions