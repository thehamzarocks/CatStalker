import React from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import chats from '../Collections/Chats';

import firestore from '@react-native-firebase/firestore';

function Item({ item }) {
    return (
      <TouchableOpacity
      style={feedListStyle.personStyle}
        onPress={() => {}}>
        <Text>{item.entry}</Text>
      </TouchableOpacity>
    );
  }

  function PromptItem({item, sendMessage}) {
      return (
          <TouchableOpacity
            style={feedListStyle.personStyle}
            onPress={() => sendMessage(item)}>
                <Text>{item.prompt}</Text>
            </TouchableOpacity>
      )
  }

export default class PersonChat extends React.Component {

    chatEntries = []
    prompts = []

    loadChatEntries() {
        // // data already loaded
        // if(this.state.entriesFetched) {
        //     return;
        // }

        // parent component hasn't passed in loaded data
        if(this.props.chatEntries.size == 0) {
            return;
        }

        this.chatEntries = []

        selectedUser = this.props.selectedUser
        // TODO: also contains mentions sent to this user, structure chat entry docs
        chatEntriesForSelectedUser = this.props.chatEntries.filter(chatEntry => (chatEntry.fromUserId == selectedUser ||
            chatEntry.toUserId == selectedUser))
        chatEntriesForSelectedUser.forEach(chatEntry => {
            this.chatEntries.push({
                entryType: 'chatEntry',
                entry: chatEntry.entry,
                fromUserName: chatEntry.fromUserName,
                toUserName: chatEntry.toUserName
            })
        })

        selectedUser = this.props.selectedUser
        availablePrompts = this.props.userState.availablePrompts || []
        this.prompts = chats.filter(chat => {
             return (chat.fromUserId == "0000" &&
                chat.toUserId == selectedUser &&
                availablePrompts.includes(chat.id))
        })
    }

    sendMessage = this.sendMessage.bind(this)
    async sendMessage(item) {
        // remove prompts for this chat from state
        
        existingAvailablePrompts = this.props.userState.availablePrompts
        promptIdsForChat = this.prompts.map(prompt => prompt.id)
        existingAvailablePrompts = existingAvailablePrompts.filter(prompt => {
            return !promptIdsForChat.includes(prompt)
        })
        const userObject = await firestore().collection('users').where('email', '==', this.props.userState.signedInUser.email).get()
        await userObject.docs[0].ref.update({availablePrompts: existingAvailablePrompts})
        // this.props.setUserState({...this.props.userState, availablePrompts: existingAvailablePrompts})
        
        this.prompts = []
        // set the message to sent
        existingSentChats = this.props.userState.sentChats
        existingSentChats.push(item.id)
        await userObject.docs[0].ref.update({sentChats: existingSentChats})
        this.props.setUserState({...this.props.userState, availablePrompts: existingAvailablePrompts, sentChats: existingSentChats})
        this.props.handleSendMessageAction(item)
        // handle action
  
    }

    renderChat(item, search) {
        if(item.fromUserId != '0000') {
            if(item.fromUserName.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
                return <Item item={item} />
            }
        } else if (item.toUserId != '0000') {
            if(item.toUserName.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
                return <Item item={item} />
            }
        }
        return null
    }

    renderPrompt(item) {
        return <PromptItem item={item} sendMessage={this.sendMessage} />
    }

    render() {
        this.loadChatEntries()
        return (
            <View>
                <Text>{this.props.selectedUser}'s Chat</Text>
                <Button title="Back" onPress={this.props.goToChats} />
                <FlatList
                        data = {this.chatEntries}
                        renderItem={({ item }) => this.renderChat(item, this.props.search)}
                        keyExtractor={(item, index) => index.toString()}
                />
                <FlatList
                        data = {this.prompts}
                        renderItem={({ item }) => this.renderPrompt(item)}
                        keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const feedListStyle = StyleSheet.create({
    topBar: {
        flex: 1,
        backgroundColor: 'green'
    },
    journalPage: {
        flex: 8,
        backgroundColor: 'brown'
    },
    personStyle: {
        backgroundColor: Colors.lighter,
        borderColor: 'lightblue',
        borderWidth: 2,
        margin: 10,
        padding: 20,
    }
})