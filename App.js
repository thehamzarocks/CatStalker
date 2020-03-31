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


const App: () => React$Node = () => {

  const [signedIn, setSignedIn] = React.useState(false);
  const [openApp, setOpenApp] = React.useState('journal');


  async function bootstraps() {
    await GoogleSignin.configure({
      webClientId: '46548177659-09g1m8u0u3p03nia40b2ma29naa9qh5h.apps.googleusercontent.com', // required
    });

    const { accessToken, idToken } = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    await firebase.auth().signInWithCredential(credential);
    setSignedIn(true);
    Alert.alert("You're signed in!")
    // await firebase.auth.signOut()
  }

    if(!signedIn) {
      return (
        <SafeAreaView>
          <Text>Login</Text>
          <Button title="start google auth" onPress={bootstraps}/>
        </SafeAreaView>
      );
    } else {
      return (
        <>
          <SafeAreaView style={styles.container}>
            <Window openApp={openApp} style={styles.window}/>
            <AppBar setOpenApp={setOpenApp} style={styles.appBar}/>
          </SafeAreaView>
        </>
      )
    }
  }


// };

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
