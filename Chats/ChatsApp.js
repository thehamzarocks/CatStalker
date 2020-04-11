import React from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import ChatList from './ChatList';
import PersonChat from './PersonChat';
import people from '../Collections/People'
import chats from '../Collections/Chats'

import firestore from '@react-native-firebase/firestore';

export default class ChatsApp extends React.Component {

    chats = []
    chatEntries = []

    loadUserChat = this.loadUserChat.bind(this)
    goToChats = this.goToChats.bind(this)

    loadUserChat(userId, entry, entryType) {
        this.setState({
            selectedUser: userId,
            listOrChat: 'chat'
        })
        this.props.handleAction({
            app: 'chats',
            action: 'openChat',
            params: {
                id: userId
            }
        })
    }

    handleSendMessageAction = this.handleSendMessageAction.bind(this)
    handleSendMessageAction(message) {
        this.props.handleAction({
            app: 'chats',
            action: 'sendMessage',
            messageId: message.id
        })
    }

    goToChats() {
        this.setState({
            listOrChat: 'list',
            selectedUser: null,
        })
    }

    loadChatData() {
        // const chats = await firestore()
        //     .collection('people')
        //     .get();
        
        this.chats = people

        // const chatEntries = await firestore()
        //     .collection('chats')
        //     .get();
        
        this.chatEntries = chats.map(chatEntry => { 
            return {...chatEntry, toUserName: this.getUserName(chatEntry.toUserId),
                fromUserName: this.getUserName(chatEntry.fromUserId)}
        })
        sentChats = this.props.userState.sentChats || []
        this.chatEntries = this.chatEntries.filter(chatEntry => {
            return sentChats.includes(chatEntry.id)
        })

        // this.setState({entriesFetched: true})
    }

    // Assume people data is already fetched into chats
    getUserName(userId) {
        if(userId == '0000') {
            return 'You'
        }
        matchingPerson = this.chats.find(chat => chat.id == userId)
        return matchingPerson.name
    }

    state = {
        search: '',
        listOrChat: 'list',
        entriesFetched: false,
        selectedUser: null
    }

    updateSearch = search => {
        this.setState({ search });
      };

      displayListOrChats(listOrChat) {
          switch(listOrChat) {
              case 'list': return <ChatList chats={this.chats} chatEntries={this.chatEntries} search={this.state.search}
              loadUserChat={this.loadUserChat} userState={this.props.userState}  />
              case 'chat': return <PersonChat chatEntries={this.chatEntries} selectedUser={this.state.selectedUser}
                search={this.state.search} goToChats={this.goToChats} userState={this.props.userState}
                setUserState={this.props.setUserState} handleSendMessageAction={this.handleSendMessageAction}/>
          }
      }

    render() {
        this.loadChatData()
        const { search } = this.state;
        return (
            <View>
                <View>
                <SearchBar
                    placeholder="Search People or Chats"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                </View>
                <View>
                    {this.displayListOrChats(this.state.listOrChat)}
                </View>
                <Text>Hello I am {this.props.appName}</Text>
            </View>
        )
    }
}