import React from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const FEED_DATA = {
    feeds: [{
        id: "15",
        user: "Zogbert",
        type: "Closed",
        entry: "Whew, partying hard at the Feline Rise Music Festival!",
        created: ""
    }]
}

const PEOPLE_DATA = {
    people: [{
        id: "578",
        name: "Zogbert",
        description: "Zogbert the max-cat! Parties are where you'll find me!"
    }]
}

function Item({ item, loadUserChat }) {
    return (
      <TouchableOpacity
      style={feedListStyle.personStyle}
        onPress={() => goToEntry(item, loadUserChat)}
      >
        <Text>{item.name}</Text>
        <Text>{item.entry}</Text>
      </TouchableOpacity>
    );
  }

  function goToEntry(item, loadUserChat) {
    loadUserChat(item.userId, item.entry, item.entryType)
    //   if(item.entryType == 'peopleOrBusiness') {
    //       Alert.alert("I'm a cat")
    //   } else {
    //       Alert.alert("I'm made by a cat")
    //   }
  }

export default class ChatList extends React.Component {

    state = {
        entriesFetched: false
    }

    chatList = []

    loadChatData() {
        // // data already loaded
        // if(this.state.entriesFetched) {
        //     return;
        // }

        // parent component hasn't passed in loaded data
        if(this.props.chats.size == 0) {
            return;
        }

        this.chatList = []

        this.props.chats.forEach(chat => {
            this.chatList.push({
                userId: chat.id,
                entryType: 'peopleOrBusiness',
                name: chat.name,
                entry: chat.description
            })
        })

        this.props.chatEntries.forEach(chatEntry => {
            this.chatList.push({
                fromUserId: chatEntry.fromUserId,
                toUserId: chatEntry.toUserId,  
                fromUserName: chatEntry.fromUserName,
                toUserName: chatEntry.toUserName,
                entryType: 'chatEntry',
                name: chatEntry.userName,
                entry: chatEntry.entry
            })
        })

    }

    // peopleData = {}

    // async loadPeopleData() {
    //     const people = await firestore()
    //         .collection('people')
    //         .get();
        
    //     this.peopleData.people = people.docs.map(people => people.data())
    //     this.setState({entriesFetched: true});
    // }

    // componentDidMount() {
    //     this.loadPeopleData()
    // }

    renderThisItem(item, search, loadUserChat) {
        if(item.entryType == 'peopleOrBusiness') {
            if(item.name.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
                return <Item item={item} loadUserChat={loadUserChat}/>
            }
         }else if (item.entryType == 'chatEntry') {
                if(item.fromUserId != '0000') {
                    if(item.fromUserName.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
                        return <Item item={item} loadUserChat={loadUserChat}/>
                    }
                } else if (item.toUserId != '0000') {
                    if(item.toUserName.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
                        return <Item item={item} loadUserChat={loadUserChat}/>
                    }
                }
            }
            return null
        }

    render() {
        this.loadChatData()
        return (
            <View>
                <View>
                    <Text>Entries fetched: {this.state.entriesFetched.toString()}</Text>
                    <FlatList
                        data = {this.chatList}
                        renderItem={({ item }) => this.renderThisItem(item, this.props.search, this.props.loadUserChat)}
                        keyExtractor={(item, index) => index.toString()}
                        />
                </View>
                <View>
                    <Text>I am the people list</Text>
                </View>
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