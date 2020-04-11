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
  
  /* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */
  
  import React from 'react';
  import { View, StyleSheet } from 'react-native';
  
  export default class MapsApp extends React.Component {
    render() {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' }
          ]}
        >
          <Svg height="80%" width="100%" viewBox="0 0 100 100">
            <Circle onPress={() => alert('Press on Circle')}
                cx="70" cy="90" r="15" stroke="green" fill="green"/>
            <Text x="70" y="91" fill="yellow" textAnchor="middle" dominantBaseline="middle" fontSize="3.5">Purr Haven</Text>
            {/* <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="blue"
              strokeWidth="2.5"
              fill="green"
            />
            <Rect
              x="15"
              y="15"
              width="70"
              height="70"
              stroke="red"
              strokeWidth="2"
              fill="yellow"
            /> */}
          </Svg>
        </View>
      );
    }
}
  