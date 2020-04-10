import React from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import feeds from '../Collections/Feeds';

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

export default class PersonFeed extends React.Component {

    feedEntries = []

    loadFeedEntries() {
        // // data already loaded
        // if(this.state.entriesFetched) {
        //     return;
        // }

        // parent component hasn't passed in loaded data
        // if(this.props.feedEntries.size == 0) {
        //     return;
        // }

        this.feedEntries = []

        selectedUser = this.props.selectedUser
        feedEntriesForSelectedUser = this.props.feedEntries.filter(feedEntry => feedEntry.userId == selectedUser)
        feedEntriesForSelectedUser.forEach(feedEntry => {
            this.feedEntries.push({
                entryType: 'feedEntry',
                entry: feedEntry.entry,
                userName: feedEntry.userName
            })
        })
    }

    renderThisItem(item, search) {
        if(item.userName.toLowerCase().includes(search.toLowerCase()) ||
             item.entry.toLowerCase().includes(search.toLowerCase())) {
            return <Item item={item}/>
        } else {
            return null
        }
    }

    render() {
        this.loadFeedEntries()
        return (
            <View>
                <Text>{this.props.selectedUser}'s Feed</Text>
                <Button title="Back" onPress={this.props.goToFeeds} />
                <FlatList
                        data = {this.feedEntries}
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