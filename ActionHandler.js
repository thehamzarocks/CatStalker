import { Alert } from "react-native"
import firestore from '@react-native-firebase/firestore';
import openFeedEntryTransitions from './Collections/OpenFeedEntryActions'
import sendMessageTransitions from './Collections/SendMessageTransitions'
import goToLocationTransitions from './Collections/GoToLocationTransitions'

export default async function getMatchingTransitionAndHandleAction(actionObject, userState, updateUserState) {
    switch(actionObject.action) {
        case 'openFeedEntry': handleOpenFeedEntryAction(actionObject, userState, updateUserState); break;
        case 'sendMessage': handleSendMessageAction(actionObject, userState, updateUserState); break;
        case 'goToLocation': handleGoToLocationAction(actionObject, userState, updateUserState); break;
    }
}

async function executeActions(actionsToExecute, userState, updateUserState, userObject) {
    updatedJournalEntries = userState.journalEntries
    updatedAvailablePrompts = userState.availablePrompts
    updatedMessages = userState.sentChats
    for (const actionToExecute of actionsToExecute) {
        switch(actionToExecute.actionName) {
          case 'addJournalEntry': {
            updatedJournalEntries.push(actionToExecute.entryId)
            await userObject.docs[0].ref.update({journalEntries: updatedJournalEntries})
            break;
          }
          case 'addAvailablePrompts': {
            updatedAvailablePrompts = updatedAvailablePrompts.concat(actionToExecute.promptsToAdd)
            await userObject.docs[0].ref.update({availablePrompts: updatedAvailablePrompts})
            break;
          }
          case 'addMessage': {
            updatedMessages.push(actionToExecute.messageId)
            await userObject.docs[0].ref.update({sentChats: updatedMessages})
            break;
          }
        }
    }
    updateUserState({...userState, journalEntries: updatedJournalEntries, availablePrompts: updatedAvailablePrompts,
        sentChats: updatedMessages})
    // Alert.alert("Journal Updated!")
}

async function handleOpenFeedEntryAction(actionObject, userState, updateUserState) {
    userId = actionObject.userId
    states = userState.currentStates || []
    const transitions = openFeedEntryTransitions
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
    const transitions = sendMessageTransitions

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
    const transitions = goToLocationTransitions

    for (const transition of transitions) {
        if(transition.condition(locationId, states) === true) {
            const userObject = await firestore().collection('users').where('email', '==', userState.signedInUser.email).get()
            currentStates = transition.stateActions(states)
            await userObject.docs[0].ref.update({currentStates: currentStates})
            updateUserState({...userState, currentStates: currentStates})
            executeActions(transition.actionsToExecute, userState, updateUserState, userObject)
        }
    }
}