import React from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
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

export default class FeedsApp extends React.Component {

    feedEntries = []

    loadFeedEntries() {
        // // data already loaded
        // if(this.state.entriesFetched) {
        //     return;
        // }

        // parent component hasn't passed in loaded data
        if(this.props.feedEntries.size == 0) {
            return;
        }

        this.feedEntries = []

        this.props.feedEntries.forEach(feedEntry => {
            this.feedEntries.push({
                entryType: 'feedEntry',
                entry: feedEntry.entry
            })
        })

    }

    renderThisItem(item, search) {
        if(item.entry.toLowerCase().includes(search.toLowerCase())) {
            return <Item item={item}/>
        } else {
            return null
        }
    }

    render() {
        this.loadFeedEntries()
        return (
            <View>
                <Text>{this.props.userName}'s Feed</Text>
                <Button title="Back" onPress={this.props.goToFeeds} />
                <FlatList
                        data = {this.feedEntries}
                        renderItem={({ item }) => this.renderThisItem(item, this.props.search, this.props.loadUserFeed)}
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