import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default function ChatsApp(props) {
    return (
        <View>
            <Text>Hello I am {props.appName}</Text>
        </View>
    )
}