import React, {useState} from 'react'
import { View, Text, TextInput, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const DATA = {
    userJournalId: "15",
    userId: "12",
    userJournalEntries: [
        {
            journalId: "123",
            questName: "findJill",
            entry: "Hmm, my cat Jill is lost. Lemme see if her friend Zogbert knows where she is",
            description: "Initial Entry",
            isComplete: false,
            dateCreated: "",
            dateCompleted: ""
        },
        {
            journalId: "986",
            questName: "findJill",
            entry: "Hmm, my cat Jill is lost. Lemme see if her friend Zogbert knows where she is",
            description: "Initial Entry",
            isComplete: false,
            dateCreated: "",
            dateCompleted: ""
        },
        {
            journalId: "432",
            questName: "findJill",
            entry: "Hmm, my cat Jill is lost. Lemme see if her friend Zogbert knows where she is",
            description: "Initial Entry",
            isComplete: false,
            dateCreated: "",
            dateCompleted: ""
        }
    ]
}

function Item({ entry }) {
    return (
      <TouchableOpacity
      style = {journalStyles.entryStyle}
        onPress={() => {Alert.alert('Hello')}}
      >
        <Text>{entry}</Text>
      </TouchableOpacity>
    );
  }


export default class JournalApp extends React.Component {

    journalEntries = {
        userJournalId: "15",
        userId: "12",
        userJournalEntries: []
    }

    state = {
        search: '',
        entriesFetched: false
    }

    async loadJournalEntries() {

        const feeds = await firestore()
            .collection('journalEntries')
            .get();
        
        journalEntries = this.props.journalEntries
        this.journalEntries.userJournalEntries = feeds.docs.filter(doc => journalEntries.includes(doc.id))
        this.journalEntries.userJournalEntries = this.journalEntries.userJournalEntries.map(entry => 
            { 
                return {...entry.data(), id:entry.id}
            })
        this.setState({entriesFetched: true});
        
        
        // Alert.alert(feeds)
        
        
    }

    componentDidMount() {
        this.loadJournalEntries()
    }

    updateSearch = search => {
        this.setState({ search });
      };

    renderThisItem(item, search) {
        // return <Item entry={JSON.stringify(item)} />
        if(item.entry.toLowerCase().includes(search.toLowerCase())) {
            return <Item entry={item.entry} />
        }
    }

    render() {
        const { search } = this.state;
        return (
            <>
                <View style={journalStyles.topBar}>
                <SearchBar
                    placeholder="Search Entries"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                </View>
                <View style={journalStyles.journalPage}>
                    <FlatList
                    data = {this.journalEntries.userJournalEntries}
                    renderItem={({ item }) => this.renderThisItem(item, search)}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </>
        )
    }
}

const journalStyles = StyleSheet.create({
    topBar: {
        flex: 1,
        backgroundColor: 'green'
    },
    journalPage: {
        flex: 8,
        backgroundColor: 'brown'
    },
    entryStyle: {
        backgroundColor: Colors.lighter,
        borderColor: 'lightblue',
        borderWidth: 2,
        margin: 10,
        padding: 20,
    }
})