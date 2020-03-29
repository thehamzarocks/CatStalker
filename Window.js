import React from 'react'
import { View, Text } from 'react-native'
import FeedsApp from './FeedsApp'
import MapsApp from './MapsApp'
import ChatsApp from './ChatsApp'
import JournalApp from './JournalApp'

export default function Window(props) {

    function renderApp(appName) {
        switch(appName) {
            case 'feeds': return <FeedsApp appName={appName} />
            case 'maps': return <MapsApp appName={appName} />
            case 'chats': return <ChatsApp appName={appName} />
            case 'journal': return <JournalApp appName={appName} />
        }
    }

    return (
        <View style={props.style}>
            {renderApp(props.openApp)}
        </View>
    )
}