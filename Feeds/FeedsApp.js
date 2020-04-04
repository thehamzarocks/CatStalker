import React from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import PeopleFeedList from './PeopleFeedList';
import PersonFeed from './PersonFeed';

import firestore from '@react-native-firebase/firestore';


export default class FeedsApp extends React.Component {

    feeds = []
    feedEntries = []

    loadUserFeed = this.loadUserFeed.bind(this)
    goToFeeds = this.goToFeeds.bind(this)

    loadUserFeed(name, entry, entryType) {
        this.setState({
            selectedUser: name,
            peopleOrFeed: 'feed'
        })
        this.props.handleAction({
            app: 'feeds',
            action: 'openFeedEntry',
            params: {
                id: name
            }
        })
    }

    goToFeeds() {
        this.setState({
            peopleOrFeed: 'people',
            selectedUser: null
        })
    }

    async loadFeedData() {
        const feeds = await firestore()
            .collection('people')
            .get();
        
        this.feeds = feeds.docs.map(feed => { return {...feed.data(), id: feed.id} })

        const feedEntries = await firestore()
            .collection('feeds')
            .get();
        
        this.feedEntries = feedEntries.docs.map(feedEntry => { return {...feedEntry.data(), id: feedEntry.id} })

        this.setState({entriesFetched: true})
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
              case 'feed': return <PersonFeed feedEntries={this.feedEntries} userName={this.state.selectedUser}
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