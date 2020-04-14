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
    }
]
export default sendMessageTransitions