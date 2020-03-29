import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Images from './images/index.js'

export default function AppIcon(props) {
    return (
        <View>
            <TouchableOpacity
            onPress={() => props.setOpenApp(props.name)}>
                <Image source = {Images[props.name + '_icon']} style = {appIconStyles.image} />
                <Text style={appIconStyles.appLabel}>{props.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const appIconStyles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
    },
    appLabel: {
        paddingLeft: 5,
        paddingTop: 2,
    }
})