import React from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import PeopleFeedList from './PeopleFeedList';
import PersonFeed from './PersonFeed';
import feeds from '../Collections/Feeds'
import people from '../Collections/People'

import firestore from '@react-native-firebase/firestore';


export default class FeedsApp extends React.Component {

    feeds = people
    feedEntries = []

    loadUserFeed = this.loadUserFeed.bind(this)
    goToFeeds = this.goToFeeds.bind(this)

    loadUserFeed(userId, entry, entryType) {
        this.setState({
            selectedUser: userId,
            peopleOrFeed: 'feed'
        })
        this.props.handleAction({
            app: 'feeds',
            action: 'openFeedEntry',
            userId: userId
        })
    }

    goToFeeds() {
        this.setState({
            peopleOrFeed: 'people',
            selectedUser: null
        })
    }

    async loadFeedData() {
        // const feeds = await firestore()
        //     .collection('people')
        //     .get();
        
        // this.feeds = feeds.docs.map(feed => { return {...feed.data(), id: feed.id} })

        // const feedEntries = await firestore()
        //     .collection('feeds')
        //     .get();
        
        this.feedEntries = feeds.map(feedEntry => { 
            return {...feedEntry, userName: this.getUserName(feedEntry.userId)}
        })

        this.setState({entriesFetched: true})
    }

    // Assume people data is already fetched into feeds
    getUserName(userId) {
        matchingPerson = this.feeds.find(feed => feed.id == userId)
        return matchingPerson.name
    }

    componentDidMount() {
        this.loadFeedData()
    }

    state = {
        search: '',
        peopleOrFeed: 'people',
        entriesFetched: false,
        selectedUser: null
    }

    updateSearch = search => {
        this.setState({ search });
      };

      displayPeopleOrFeed(peopleOrFeed) {
          switch(peopleOrFeed) {
              case 'people': return <PeopleFeedList feeds={this.feeds} feedEntries={this.feedEntries} search={this.state.search}
                loadUserFeed={this.loadUserFeed}  />
              case 'feed': return <PersonFeed feedEntries={this.feedEntries} selectedUser={this.state.selectedUser}
                search={this.state.search} goToFeeds={this.goToFeeds} />
          }
      }

    render() {
        const { search } = this.state;
        return (
            <View>
                <View>
                <SearchBar
                    placeholder="Search People or Events"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <Text>App: {this.state.entriesFetched.toString()}</Text>
                </View>
                <View>
                    {this.displayPeopleOrFeed(this.state.peopleOrFeed)}
                </View>
                <Text>Hello I am {this.props.appName}</Text>
            </View>
        )
    }
}