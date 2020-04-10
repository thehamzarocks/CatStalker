/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  ActivityIndicatorComponent,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Cat from './Cat.js';
import AppBar from './AppBar.js';
import Window from './Window.js';

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

// import { firestore } from 'firebase';
import firestore from '@react-native-firebase/firestore';
import quests from './Collections/Quests.js';

const App: () => React$Node = () => {

  const [signedInUser, setSignedInUser] = React.useState(null);
  const [openApp, setOpenApp] = React.useState('journal');
  const [userState, setUserState] = React.useState({})
  // const [currentState, setCurrentState] = React.useState('0001')
  // const [journalEntries, setJournalEntries] = React.useState(['0001'])
  // const [sentChats, setSentChats] = React.useState([])
  // const [availablePrompts, setAvailablePrompts] = React.useState([])

  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      loadUserState(user)
    } else {
      setSignedInUser(null)
    }
  })

  unsubscribe()


  async function bootstrap() {
    await GoogleSignin.configure({
      webClientId: '46548177659-09g1m8u0u3p03nia40b2ma29naa9qh5h.apps.googleusercontent.com', // required
    });

    const { accessToken, idToken } = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    const userCredential = await firebase.auth().signInWithCredential(credential);
    initializeUserState(userCredential.user)
  }

  async function signOut() {
    await firebase.auth().signOut()
    setSignedInUser(null)
  }

  async function initializeUserState(user) {
    Alert.alert("Initializing")
    const querySnapshot = await firestore().collection('users').where('email','==', user.email).get()

    // If new user, set his initial state in the db
    if(querySnapshot.empty) {
      await firestore().collection('users').add(data = {
        email: user.email,
        name: user.displayName,
        stateMachineState: '0001',
        journalEntries: ['0001'],
        friends: ['0001'],
        sentChats: [],
        availablePrompts: []
      })
    }
    await loadUserState(user)
  }

  async function loadUserState(user) {
    const querySnapshot = await firestore().collection('users').where('email','==', user.email).get()
    // // weird, this is happening on sign in also for some reason, so querySnapshot here is empty since
    // // the user hasn't been created yet. It will be created in the sign on process
    if(querySnapshot.empty) {
      return
    }
    userObject = querySnapshot.docs[0].data()
    setUserState({
      stateMachineState: userObject.stateMachineState,
      journalEntries: userObject.journalEntries,
      friends: userObject.friends,
      sentChats: userObject.sentChats,
      availablePrompts: userObject.availablePrompts,
      signedInUser: user
    })
    if(!signedInUser) {
      setSignedInUser(user)
    }
  }

  // async function intializeStateMachine(currentState) {
  //   stateMachine = await firestore().collection('quests').where('name', '==', 'Find Jill').get()
  //   stateMachine = stateMachine.docs[0].data()
  //   stateMachine = quests[0];
  //   setCurrentState(currentState)
  // }

  async function handleAction(actionObject) {
    transition = getMatchingTransition(actionObject)
    if (!transition) {
      return;
    }
    // A transition matches our action, so update our state in the db
    const userObject = await firestore().collection('users').where('email', '==', signedInUser.email).get()
    await userObject.docs[0].ref.update({stateMachineState: transition.toState})
    setUserState({...userState, stateMachineState: transition.toState})
    // TOOO: update the UI
    actionsToExecute = transition.actionsToExecute || []
    for (const actionToExecute of actionsToExecute) {
      switch(actionToExecute.actionName) {
        case 'addJournalEntry': {
          existingJournaEntries = userState.journalEntries
          existingJournaEntries.push(actionToExecute.entryId)
          await userObject.docs[0].ref.update({journalEntries: existingJournaEntries})
          setUserState({...userState, journalEntries: existingJournaEntries})
          Alert.alert("Journal Updated!")
          break;
        }
        case 'addAvailablePrompts': {
          Alert.alert(JSON.stringify(userState))
          existingAvailablePrompts = userState.availablePrompts
          existingAvailablePrompts = existingAvailablePrompts.concat(actionToExecute.promptsToAdd)
          await userObject.docs[0].ref.update({availablePrompts: existingAvailablePrompts})
          setUserState({...userState, availablePrompts: existingAvailablePrompts})
          break;
        }
      }
    }
  }

  function getMatchingTransition(actionObject) {
    stateObject = quests[0].states.find(state => state.id == userState.stateMachineState)
    if(!stateObject) {
      return;
    }
    matchingTransition = stateObject.transitions.find(transition => isMatchingTransition(transition, actionObject))
    return matchingTransition
  }

  function isMatchingTransition(transition, actionObject) {
    if(transition.transitionMatchers.app == actionObject.app && transition.transitionMatchers.action == actionObject.action) {
      switch(actionObject.action) {
        case 'openFeedEntry': {
          if (actionObject.userId == transition.transitionMatchers.userId) {
            return true;
          }
          return false; 
        }
       default: return false
      }
    }
  }


    if(!signedInUser) {
      return (
        <SafeAreaView>
          <Text>Login</Text>
          <Button title="start google auth" onPress={bootstrap}/>
        </SafeAreaView>
      );
    } else {
      return (
        <>
          <SafeAreaView style={styles.container}>
            <Button title="sign out" onPress={signOut} />
            <Window openApp={openApp} userState={userState} handleAction={handleAction} style={styles.window}/>
            <AppBar setOpenApp={setOpenApp} style={styles.appBar}/>
          </SafeAreaView>
        </>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  window: {
    flex: 8,
    // height: 400,
    // width: 100,
    backgroundColor: 'pink',
  },
  appBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
