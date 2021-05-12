Feature: Organizer re-opens App
    Scenario: Organizer opens App
        When User opens App
        Given User has an Organizer Authentication Token
        Then User is presented with Organizer Dashboard

    Scenario: Organizer views Organizer Dashboard
        When Organizer views Organizer Dashboard
        Then Organizer sees Monthly Calendar component
        And Organizer sees a Daily Meeting List component (like on Figma) that changes based on selected Date
        And Organizer sees Navbar at bottom of screen

        Navbar:
        - Edit Profile / View Auth Token
        - Edit Ideas
        - View "Wallet"
        - Browser other Organizers

    Scenario: Organizer views Organizer Dashboard
        When Organizer visits Organizer Dashboard 
        
        
        
        --> is it a bunch of buttons, or is it dynamic information?
        
        
        
        Organizer sees a list of upcoming meetings




        Then Organizer component with list of their upcoming Scheduled Meetings
        And Organizer sees component with Interface for changing available Time
        And Organizer sees option to browse Meeting Times for other Organizers
        And Organizer sees option to see current balance

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
