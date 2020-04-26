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
    }
]
export default sendMessageTransitions