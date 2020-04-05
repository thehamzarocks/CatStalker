import React from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// import firestore from '@react-native-firebase/firestore';

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

function Item({ item, loadUserFeed }) {
    return (
      <TouchableOpacity
      style={feedListStyle.personStyle}
        onPress={() => goToEntry(item, loadUserFeed)}
      >
        <Text>{item.name}</Text>
        <Text>{item.entry}</Text>
      </TouchableOpacity>
    );
  }

  function goToEntry(item, loadUserFeed) {
      loadUserFeed(item.userId, item.entry, item.entryType)
    //   if(item.entryType == 'peopleOrBusiness') {
    //       Alert.alert("I'm a cat")
    //   } else {
    //       Alert.alert("I'm made by a cat")
    //   }
  }

export default class PeopleFeedList extends React.Component {

    state = {
        entriesFetched: false
    }

    feedList = []

    loadFeedData() {
        // // data already loaded
        // if(this.state.entriesFetched) {
        //     return;
        // }

        // parent component hasn't passed in loaded data
        if(this.props.feeds.size == 0) {
            return;
        }

        this.feedList = []

        this.props.feeds.forEach(feed => {
            this.feedList.push({
                userId: feed.id,
                entryType: 'peopleOrBusiness',
                name: feed.name,
                entry: feed.description
            })
        })

        this.props.feedEntries.forEach(feedEntry => {
            this.feedList.push({
                userId: feedEntry.user,
                entryType: 'feedEntry',
                name: feedEntry.userName,
                entry: feedEntry.entry
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

    renderThisItem(item, search, loadUserFeed) {
        if(item.name.toLowerCase().includes(search.toLowerCase()) || item.entry.toLowerCase().includes(search.toLowerCase())) {
            return <Item item={item} loadUserFeed={loadUserFeed}/>
        } else {
            return null
        }
    }
    render() {
        this.loadFeedData()
        return (
            <View>
                <View>
                    <Text>Entries fetched: {this.state.entriesFetched.toString()}</Text>
                    <FlatList
                        data = {this.feedList}
                        renderItem={({ item }) => this.renderThisItem(item, this.props.search, this.props.loadUserFeed)}
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