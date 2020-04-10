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
                            userId: '0002'
                        },
                        toState: "0002",
                        actionsToExecute: [
                            {
                                actionName: "addJournalEntry",
                                entryId: "0002"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
export default quests