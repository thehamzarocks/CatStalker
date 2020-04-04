import React from 'react'
import { View, Text } from 'react-native'
import FeedsApp from './Feeds/FeedsApp'
import MapsApp from './MapsApp'
import ChatsApp from './ChatsApp'
import JournalApp from './JournalApp'

export default function Window(props) {

    function renderApp(appName) {
        switch(appName) {
            case 'feeds': return <FeedsApp appName={appName} handleAction={props.handleAction} />
            case 'maps': return <MapsApp appName={appName} handleAction={props.handleAction} />
            case 'chats': return <ChatsApp appName={appName} handleAction={props.handleAction} />
            case 'journal': return <JournalApp appName={appName} handleAction={props.handleAction} />
        }
    }

    return (
        <View style={props.style}>
            {renderApp(props.openApp)}
        </View>
    )
}