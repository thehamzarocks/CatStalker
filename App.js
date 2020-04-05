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

const App: () => React$Node = () => {

  const [signedInUser, setSignedInUserUser] = React.useState(null);
  const [openApp, setOpenApp] = React.useState('journal');
  const [currentState, setCurrentState] = React.useState('0001')
  const [journalEntries, setJournalEntries] = React.useState(['0001'])
  let stateMachine = {}

  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      loadUserState(user)
    } else {
      setSignedInUserUser(null)
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
    intializeUserState(userCredential.user)
  }

  async function signOut() {
    await firebase.auth().signOut()
    setSignedInUserUser(null)
  }

  async function intializeUserState(user) {
    Alert.alert("Initializing")
    const querySnapshot = await firestore().collection('users').where('email','==', user.email).get()

    // If new user, set his initial state in the db
    if(querySnapshot.empty) {
      await firestore().collection('users').add(data = {
        email: user.email,
        name: user.displayName,
        currentState: '0001',
        journalEntries: ['0001'],
        friends: ['0001']
      })
      await intializeStateMachine('0001')
    } else {
      await intializeStateMachine(querySnapshot.docs[0].get('currentState'))
    }
    setSignedInUserUser(user);
  }

  async function loadUserState(user) {
    const querySnapshot = await firestore().collection('users').where('email','==', user.email).get()
    // weird, this is happening on sign in also for some reason, so querySnapshot here is empty since
    // the user hasn't been created yet. It will be created in the sign on process
    if(querySnapshot.empty) {
      return
    }
    await intializeStateMachine(querySnapshot.docs[0].get('currentState'))
    setSignedInUserUser(user)
  }

  async function intializeStateMachine(currentState) {
    stateMachine = await firestore().collection('quests').where('name', '==', 'Find Jill').get()
    stateMachine = stateMachine.docs[0].data()
    setCurrentState(currentState)
  }

  async function handleAction(actionObject) {
    transition = getMatchingTransition(actionObject)
    if (!transition) {
      return;
    }
    // A transition matches our action, so update our state in the db
    userObject = await firestore().collection('users').where('email', '==', signedInUser.email).get()
    await userObject.docs[0].ref.update({currentState: transition.toState})
    setCurrentState(transition.toState)
    // TOOO: update the UI
    actionsToPerform = transition.actions || []
    for (const actionToPerform of actionsToPerform) {
      if(actionToPerform.name == 'addJournalEntry') {
        userObject = await firestore().collection('users').where('email', '==', signedInUser.email).get()
        existingJournaEntries = userObject.docs[0].data().journalEntries || []
        existingJournaEntries.push(actionToPerform.entry)
        await userObject.docs[0].ref.update({journalEntries: existingJournaEntries})
        setJournalEntries(existingJournaEntries)
        Alert.alert("Journal Updated!")
      }
    }
  }

  function getMatchingTransition(actionObject) {
    stateObject = stateMachine.states.find(state => state.id == currentState)
    matchingTransition = stateObject.transitions.find(transition => isMatchingTransition(transition, actionObject))
    return matchingTransition
  }

  function isMatchingTransition(transition, actionObject) {
    if(transition.app == actionObject.app && transition.action == actionObject.action) {
      // Alert.alert("Hmm need to check params")
      transitionParamKeys = Object.keys(transition.params)
      actionParamKeys = Object.keys(actionObject.params)
      paramsMatch = true
      // TODO: check other way around also?
      transitionParamKeys.forEach(key => {
        if(transition.params[key] != actionObject.params[key]) {
          paramsMatch = false
        }
      })
      return paramsMatch
    }
    return false
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
            <Window openApp={openApp} handleAction={handleAction} journalEntries={journalEntries} style={styles.window}/>
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
