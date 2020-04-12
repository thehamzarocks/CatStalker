import React from 'react'
import { View, Text } from 'react-native'
import FeedsApp from './Feeds/FeedsApp'
import MapsApp from './Maps/MapsApp'
import ChatsApp from './Chats/ChatsApp'
import JournalApp from './JournalApp'

export default function Window(props) {

    function renderApp(appName) {
        switch(appName) {
            case 'feeds': return <FeedsApp appName={appName} handleAction={props.handleAction} userState={props.userState} />
            case 'maps': return <MapsApp appName={appName} handleAction={props.handleAction} userState={props.userState} />
            case 'chats': return <ChatsApp appName={appName} handleAction={props.handleAction} userState={props.userState}
                setUserState={props.setUserState} />
            case 'journal': return <JournalApp appName={appName} handleAction={props.handleAction} userState={props.userState} />
        }
    }

    return (
        <View style={props.style}>
            {renderApp(props.openApp)}
        </View>
    )
}