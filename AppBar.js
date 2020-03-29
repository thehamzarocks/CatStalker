import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Images from './images/index.js'
import AppIcon from './AppIcon.js'

export default function AppBar(props) {
    return (
        <View style={props.style}>
            <AppIcon name="feeds" setOpenApp = {props.setOpenApp} />
            <AppIcon name="maps" setOpenApp = {props.setOpenApp} />
            <AppIcon name="chats" setOpenApp = {props.setOpenApp} />
            <AppIcon name="journal" setOpenApp = {props.setOpenApp} />
        </View>
    )
}


