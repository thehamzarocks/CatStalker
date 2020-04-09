import React from 'react'
import { View, Text } from 'react-native'
import FeedsApp from './Feeds/FeedsApp'
import MapsApp from './MapsApp'
import ChatsApp from './Chats/ChatsApp'
import JournalApp from './JournalApp'

export default function Window(props) {

    function renderApp(appName) {
        switch(appName) {
            case 'feeds': return <FeedsApp appName={appName} handleAction={props.handleAction} journalEntries={props.journalEntries} />
            case 'maps': return <MapsApp appName={appName} handleAction={props.handleAction} journalEntries={props.journalEntries} />
            case 'chats': return <ChatsApp appName={appName} handleAction={props.handleAction} journalEntries={props.journalEntries} />
            case 'journal': return <JournalApp appName={appName} handleAction={props.handleAction} journalEntries={props.journalEntries} />
        }
    }

    return (
        <View style={props.style}>
            {renderApp(props.openApp)}
        </View>
    )
}