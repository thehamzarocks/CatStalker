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

export default class RegionsMap extends React.Component {
    render() {
        return (
            <>
                <View
                style={[
                    { alignItems: 'center', justifyContent: 'center' },
                    regionStyles.map
                ]}
                >
                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                {regions.map(region => (
                    <React.Fragment key={region.id}>
                    <Circle onPress={() => this.props.goToRegion(region.id)}
                    cx={region.cx} cy={region.cy} r={region.r} stroke={region.color} fill={region.color}/>
                    <Text x={region.cx} y={region.cy} fill="yellow" textAnchor="middle" dominantBaseline="middle" fontSize="3.5">{region.name}</Text>
                    </React.Fragment>
                ))}
                </Svg>
                </View>
                <View style={[regionStyles.bottomBar]}>
                    <TextProp>This is the bottom bar</TextProp>
                </View>
            </>
          );
    }
}

const regionStyles = StyleSheet.create({
    map: {
        // flex: 8,
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