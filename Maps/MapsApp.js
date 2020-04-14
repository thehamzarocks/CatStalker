import { SearchBar } from 'react-native-elements';

import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import RegionsMap from './RegionsMap'
import LocationsMap from './LocationsMap'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';

  export default class MapsApp extends React.Component {

    state = {
      regionsOrLocations: 'regions',
      currentSelectedRegion: '0001',
      search: ''
    }

    async goToLocation(locationId) {
      const userObject = await firestore().collection('users').where('email', '==', this.props.userState.signedInUser.email).get()
      await userObject.docs[0].ref.update({currentLocation: locationId})
      this.props.handleAction({
        app: 'maps',
        action: 'goToLocation',
        locationId: locationId
      })
      this.props.setUserState({...this.props.userState, currentLocation: locationId})
    }

    updateSearch = search => {
      this.setState({ search });
    };

    goToRegion = this.goToRegion.bind(this)
    goToRegion(regionId) {
      this.setState({
        regionsOrLocations: 'locations',
        currentRegion: regionId
      })
    }

    displayRegionsOrLocations() {
      switch(this.state.regionsOrLocations) {
        case 'regions': return <RegionsMap goToRegion={this.goToRegion}/>
        case 'locations': return <LocationsMap region={this.state.currentRegion} userState={this.props.userState}
         goToLocation={(locationId) => {this.goToLocation(locationId)}} />
      }
    }

    render() {
      const { search } = this.state;
        return (
            <>
                <View style={mapStyles.topBar}>
                <SearchBar
                    placeholder="Search Locations"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                </View>
                <View style={mapStyles.map}>
                    {this.displayRegionsOrLocations()}
                </View>
            </>
        )
    }
}

const mapStyles = StyleSheet.create({
  topBar: {
      flex: 1,
      backgroundColor: 'yellow'
  },
  map: {
      flex: 12,
      backgroundColor: 'red'
  },
  entryStyle: {
      backgroundColor: Colors.lighter,
      borderColor: 'lightblue',
      borderWidth: 2,
      margin: 10,
      padding: 20,
  }
})
  