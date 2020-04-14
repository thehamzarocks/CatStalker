import React from 'react';
import { View, StyleSheet, Alert, Text as TextProp, TouchableOpacity } from 'react-native';
import regions from '../Collections/Regions';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import locations from '../Collections/Locations';
import firestore from '@react-native-firebase/firestore';


export default class MapLocationBar extends React.Component {
    
    render() {
        return (
            <>
                <View style={[regionStyles.bottomBar]}>
                    <TextProp>You have selected {this.props.selectedLocation}</TextProp>
                    <TouchableOpacity onPress={() => this.props.goToLocation(this.props.selectedLocation)}>
                        <TextProp>Travel</TextProp>
                    </TouchableOpacity>
                </View>
            </>
          );
    }
}

const regionStyles = StyleSheet.create({
    bottomBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'lightblue'
      },
    map: {
        flex: 8,
        backgroundColor: 'red',
    },
    entryStyle: {
        backgroundColor: Colors.lighter,
        borderColor: 'lightblue',
        borderWidth: 2,
        margin: 10,
        padding: 20,
    }
  })