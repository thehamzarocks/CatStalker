import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { SearchBar } from 'react-native-elements';
import PeopleFeedList from './PeopleFeedList';
import PersonFeed from './PersonFeed';

export default class FeedsApp extends React.Component {
    state = {
        search: '',
        peopleOrFeed: 'people'
    }

    updateSearch = search => {
        this.setState({ search });
      };

      displayPeopleOrFeed(peopleOrFeed) {
          switch(peopleOrFeed) {
              case 'people': return <PeopleFeedList/>
              case 'feed': return <PersonFeed />
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
                </View>
                <View>
                    {this.displayPeopleOrFeed(this.state.peopleOrFeed)}
                </View>
                <Text>Hello I am {this.props.appName}</Text>
            </View>
        )
    }
}