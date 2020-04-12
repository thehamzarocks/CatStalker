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
  import { View, StyleSheet, Alert, Text as TextProp } from 'react-native';
import regions from '../Collections/Regions';
  
  export default class MapsApp extends React.Component {
    // renderRegions() {
    //   renderedRegions = []
    //   regions.forEach((region,index) => {
    //     renderedRegions.push(
    //       <Circle key={index} onPress={() => alert(region.name + ' pressed!')}
    //       cx={region.cx} cy={region.cy} r={region.r} stroke={region.color} fill={region.color}/>
    //       <Text x={region.cx} y={region.cy + 1} fill="yellow" textAnchor="middle" dominantBaseline="middle" fontSize="3.5">Hello</Text>
    //       )
    //   })
    //   return renderedRegions
    // }

    render() {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' }
          ]}
        >
          <Svg height="80%" width="100%" viewBox="0 0 100 100">
          {regions.map(region => (
            <React.Fragment key={region.id}>
              <Circle onPress={() => alert(region.name + ' pressed!')}
              cx={region.cx} cy={region.cy} r={region.r} stroke={region.color} fill={region.color}/>
              <Text x={region.cx} y={region.cy} fill="yellow" textAnchor="middle" dominantBaseline="middle" fontSize="3.5">{region.name}</Text>
            </React.Fragment>
          ))}
          </Svg>
        </View>
      );
    }
}
  