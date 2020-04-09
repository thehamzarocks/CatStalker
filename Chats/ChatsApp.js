import React from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import ChatList from './ChatList';
import PersonChat from './PersonChat';

import firestore from '@react-native-firebase/firestore';

const chats = [
    {
        id: "0001",
        entry: "Hey Zogbert! Jill's missing. Seen her around?",
        prompt: "Seen Jill?",
        fromUser: "0000",
        touser: "0002"
    },
    {
        id: "0002",
        entry: "Zogbert you bum! Gimme my lawnmower back! You've had it for weeks!",
        prompt: "Give me back my lawnmower!",
        fromUser: "0000",
        touser: "0002"
    }
]


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

    goToChats() {
        this.setState({
            listOrChat: 'list',
            selectedUser: null,
        })
    }

    async loadChatData() {
        const chats = await firestore()
            .collection('people')
            .get();
        
        this.chats = chats.docs.map(chat => { return {...chat.data(), id: chat.id} })

        const chatEntries = await firestore()
            .collection('chats')
            .get();
        
        this.chatEntries = chatEntries.docs.map(chatEntry => { 
            return {...chatEntry.data(), id: chatEntry.id, toUserName: this.getUserName(chatEntry.data().toUserId),
                fromUserName: this.getUserName(chatEntry.data().fromUserId)} 
        })

        this.setState({entriesFetched: true})
    }

    // Assume people data is already fetched into chats
    getUserName(userId) {
        if(userId == '0000') {
            return 'You'
        }
        matchingPerson = this.chats.find(chat => chat.id == userId)
        return matchingPerson.name
    }

    componentDidMount() {
        this.loadChatData()
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
              loadUserChat={this.loadUserChat}  />
              case 'chat': return <PersonChat chatEntries={this.chatEntries} selectedUser={this.state.selectedUser}
                search={this.state.search} goToChats={this.goToChats} />
          }
      }

    render() {
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