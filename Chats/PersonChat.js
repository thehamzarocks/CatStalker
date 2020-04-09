import React from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Item({ item }) {
    return (
      <TouchableOpacity
      style={feedListStyle.personStyle}
        onPress={() => {}}
      >
        <Text>{item.entry}</Text>
      </TouchableOpacity>
    );
  }

export default class PersonChat extends React.Component {

    feedEntries = []

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
    }

    renderThisItem(item, search) {
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

    render() {
        this.loadChatEntries()
        return (
            <View>
                <Text>{this.props.selectedUser}'s Chat</Text>
                <Button title="Back" onPress={this.props.goToChats} />
                <FlatList
                        data = {this.chatEntries}
                        renderItem={({ item }) => this.renderThisItem(item, this.props.search)}
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