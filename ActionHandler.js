import { Alert } from "react-native"
import firestore from '@react-native-firebase/firestore';

export default async function getMatchingTransitionAndHandleAction(actionObject, userState, updateUserState) {
    switch(actionObject.action) {
        case 'openFeedEntry': handleOpenFeedEntryAction(actionObject, userState, updateUserState); break;
        case 'sendMessage': handleSendMessageAction(actionObject, userState, updateUserState); break;
        case 'goToLocation': handleGoToLocationAction(actionObject, userState, updateUserState); break;
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
                    actionName: "addAvailablePrompts",
                    promptsToAdd: ['0001', '0002']
                },
                {
                    actionName: "addJournalEntry",
                    entryId: "0004"
                },
            ]
        },
    ]
    for (const transition of transitions) {
        if(transition.condition(userId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions(states)
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

    for (const transition of transitions) {
        if(transition.condition(messageId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions(states)
            await userObject.docs[0].ref.update({currentStates: currentStates})
            updateUserState({...userState, currentStates: currentStates})
            executeActions(transition.actionsToExecute, userState, updateUserState, userObject)
        }
    }
}

async function handleGoToLocationAction(actionObject, userState, updateUserState) {
    locationId = actionObject.locationId
    states = userState.currentStates || []
    const transitions = [
        {
            name: "Arrived at the GarageTown Music Festival",
            condition: (messageId, states) => {
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
        }
    ]

    for (const transition of transitions) {
        if(transition.condition(messageId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions(states)
            await userObject.docs[0].ref.update({currentStates: currentStates})
            updateUserState({...userState, currentStates: currentStates})
            executeActions(transition.actionsToExecute, userState, updateUserState, userObject)
        }
    }
}