const quests = [
    {
        id: "0001",
        description: "You cat Jill is lost. Stalk her friends and others who might know of her whereabouts to get her back.",
        name: "A Lost Feline",
        states: [
            {
                id: "0001",
                name: "quest_start",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "feeds",
                            action: "openFeedEntry",
                            userId: '0001'
                        },
                        toState: "0002",
                        actionsToExecute: [
                            {
                                actionName: "addAvailablePrompts",
                                promptsToAdd: ['0001', '0002']
                            },
                            {
                                actionName: "addJournalEntry",
                                entryId: "0002"
                            },
                        ]
                    }
                ]
            },
            {
                id: "0002",
                name: "checked Jill's Feed",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "chats",
                            action: "sendMessage",
                            messageIds: ['0001', '0002']
                        },
                        toState: "0003",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0003"
                            },
                        ]
                    }
                ]
            },
            {
                id: "0003",
                name: "texted Zogbert but no response",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "feeds",
                            action: "openFeedEntry",
                            userId: '0002'
                        },
                        toState: "0004",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0004"
                            },
                        ]
                    }
                ]
            },
            {
                id: "0004",
                name: "Zogbert's probably at the GarageTown Music Festival",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "maps",
                            action: "goToLocation",
                            locationId: '0002'
                        },
                        toState: "0005",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0005"
                            },
                        ]
                    }
                ]
            },
            {
                id: "0005",
                name: "Zogbert's with Mr. Luke",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "feeds",
                            action: "openFeedEntry",
                            userId: "0004"
                        },
                        toState: "0006",
                        actionsToExecute: [
                        ]
                    }
                ]
            },
            {
                id: "0006",
                name: "Checked Mr. Luke's Feed",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "maps",
                            action: "goToLocation",
                            userId: "0003"
                        },
                        toState: "0007",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0006"
                            }
                        ]
                    }
                ]
            },
            {
                id: "0007",
                name: "At Felix High",
                transitions: [
                    {
                        transitionMatchers: {
                            app: "feeds",
                            action: "goToLocation",
                            userId: "0003"
                        },
                        toState: "0007",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0006"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
export default quests