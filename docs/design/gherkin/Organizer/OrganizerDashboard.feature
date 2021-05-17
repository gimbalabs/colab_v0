Feature: Organizer Dashboard
    Scenario: Organizer opens App
        When User opens App
        Given User has an Organizer Authentication Token
        Then User is presented with Organizer Dashboard

    Scenario: Organizer views Organizer Dashboard
        When Organizer views Organizer Dashboard
        Then Organizer sees Monthly Calendar component
        And Organizer sees a List of Upcoming Meetings
        And Organizer sees Navbar

    Scenario: Organizer interacts with Calendar
        When Organizer taps a Date on Monthly Calendar
        Then Organizer sees that Date at the start of List of Upcoming Meetings

    Scenario: Organizer interacts with List of Upcoming Meetings
        When Organizer taps a Meeting in List of Upcoming Meetings
        Then Organizer sees details about that Meeting

    Scenario: Organizer interacts with Navbar
        When Organizer taps a Button on Navbar
        Then Organizer sees the View corresponding to that Button        







