import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { SearchBar } from 'react-native-elements';

export default class FeedsApp extends React.Component {
    state = {
        search: '',
        peopleOrFeed: 'people'
    }

    updateSearch = search => {
        this.setState({ search });
      };

      displayPeopleOrFeed(peopleOrFeed) {
          return null
          switch(peopleOrFeed) {
              case 'people': return <PeopleFeedList />
              case 'feed': return <PersonFeed />
          }
      }

    render(props) {
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