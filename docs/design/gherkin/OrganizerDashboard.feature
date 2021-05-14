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
        
   
    Scenario: User sees more Role Information
        When User chooses the option to see more Role Information
        Given User is on Landing Screen
        Then User sees a pop-up with more Information about Role

    Scenario: User onboarding and Authentication
        When the User has chosen a Role
        Then the User is guided through the Registration Experience
        # Registration Experience -> Feature
        And the User receives an Authentication token

    Scenario: Viewing Authentication Token
        Given the User has an Authenticated Role
        When the User navigates to Authentication component
        Then the User can view their Authentication token(s)
