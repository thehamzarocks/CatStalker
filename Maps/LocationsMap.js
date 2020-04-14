import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';
  
  import React from 'react';
  import { View, StyleSheet, Alert, Text as TextProp } from 'react-native';
import regions from '../Collections/Regions';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import locations from '../Collections/Locations';
import MapLocationBar from './MapLocationBar';

export default class LocationsMap extends React.Component {

    state = {
        selectedLocation: '0001'
    }

    getUserLocation() {
        return locations.find(location => location.id === this.props.userState.currentLocation)
    }
    render() {
        return (
            <>
                <TextProp>You are in {this.props.region}</TextProp>
                <View
                style={[
                    { alignItems: 'center', justifyContent: 'center' },
                    regionStyles.map
                ]}
                >
                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                {locations.filter(location => location.regionId === this.props.region).map(location => (
                    <React.Fragment key={location.id}>
                    <Circle onPress={() => this.setState({selectedLocation: location.id})}
                    cx={location.cx} cy={location.cy} r={location.r} stroke={location.color} fill={location.color}/>
                    <Text x={location.cx} y={location.cy} fill="yellow" textAnchor="middle" dominantBaseline="middle" fontSize="3.5">{location.name}</Text>
                    </React.Fragment>
                ))}
                {
                    this.props.region === this.getUserLocation().regionId ? 
                    (<Circle opacity="0.7"
                    cx={this.getUserLocation().cx} cy={this.getUserLocation().cy} r="5" stroke={this.getUserLocation().color} fill="blue"/>)
                    : <React.Fragment></React.Fragment>
                }
                </Svg>
                </View>
                <View style={[regionStyles.bottomBar]}>
                    <MapLocationBar userState={this.props.userState} selectedLocation={this.state.selectedLocation} goToLocation={this.props.goToLocation} />
                </View>
            </>
          );
    }
}

const regionStyles = StyleSheet.create({
    bottomBar: {
        flex: 1,
        backgroundColor: 'yellow'
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