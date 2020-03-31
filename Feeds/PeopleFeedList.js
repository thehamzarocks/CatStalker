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
        description: "Zogbert the max-cats! Parties are where you'll find me!"
    }]
}

function Item({ entry, description }) {
    return (
      <TouchableOpacity
      style={feedListStyle.personStyle}
        onPress={() => {Alert.alert('Hello')}}
      >
        <Text>{entry}</Text>
        <Text>{description}</Text>
      </TouchableOpacity>
    );
  }

export default class FeedsApp extends React.Component {

    renderThisItem(item) {
        return <Item entry={item.name} description={item.description} />
    }
    render() {
        return (
            <View>
                <View>
                    <FlatList
                        data = {PEOPLE_DATA.people}
                        renderItem={({ item }) => this.renderThisItem(item)}
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