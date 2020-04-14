import { Alert } from "react-native"
import firestore from '@react-native-firebase/firestore';

export default async function getMatchingTransitionAndHandleAction(actionObject, userState, updateUserState) {
    switch(actionObject.action) {
        case 'openFeedEntry': handleOpenFeedEntryAction(actionObject, userState, updateUserState); break;
        case 'sendMessage': handleSendMessageAction(actionObject, userState, updateUserState); break;
    }
}

async function executeActions(actionsToExecute, userState, updateUserState, userObject) {
    for (const actionToExecute of actionsToExecute) {
        switch(actionToExecute.actionName) {
          case 'addJournalEntry': {
            existingJournaEntries = userState.journalEntries
            existingJournaEntries.push(actionToExecute.entryId)
            await userObject.docs[0].ref.update({journalEntries: existingJournaEntries})
            updateUserState({...userState, journalEntries: existingJournaEntries})
            Alert.alert("Journal Updated!")
            break;
          }
          case 'addAvailablePrompts': {
            existingAvailablePrompts = userState.availablePrompts
            existingAvailablePrompts = existingAvailablePrompts.concat(actionToExecute.promptsToAdd)
            await userObject.docs[0].ref.update({availablePrompts: existingAvailablePrompts})
            updateUserState({...userState, availablePrompts: existingAvailablePrompts})
            break;
          }
        }
      }
}

async function handleOpenFeedEntryAction(actionObject, userState, updateUserState) {
    userId = actionObject.userId
    states = userState.currentStates || []
    const transitions = [
        {
            name: "Opened Jill's Feed in he beginning",
            condition: (userId, states) => {
                return (userId === '0001' && states.length === 1 && states[0] === '0001')
            },
            stateActions: () => {
                return ['0002']
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
    ]
    for (const transition of transitions) {
        if(transition.condition(userId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions()
            await userObject.docs[0].ref.update({currentStates: currentStates})
            updateUserState({...userState, currentStates: currentStates})
            executeActions(transition.actionsToExecute, userState, updateUserState, userObject)
        }
    }
}

async function handleSendMessageAction(actionObject, userState, updateUserState) {
    messageId = actionObject.messageId
    states = userState.currentStates || []
    const transitions = [
        {
            name: "Texted Zogbert but no response",
            condition: (messageId, states) => {
                return (['0001', '0002'].includes(messageId) && states.length === 1 && states[0] === '0002')
            },
            stateActions: () => {
                return ['0003']
            },
            actionsToExecute: [
                {
                    actionName: "addJournalEntry",
                    entryId: "0003"
                },
            ]
        }
    ]

    for (const transition of transitions) {
        if(transition.condition(messageId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions()
            await userObject.docs[0].ref.update({currentStates: currentStates})
            updateUserState({...userState, currentStates: currentStates})
            executeActions(transition.actionsToExecute, userState, updateUserState, userObject)
        }
    }
}