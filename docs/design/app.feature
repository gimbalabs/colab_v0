# 

# Miro (Playground) -> Gherkin (Project) -> (GitLab <- -> Figma) -> Dapp
# Andy or OCG will start a Figma

# Next step for project team is to reach consensus on this doc, then test how we take these "Features" and "Scenarios" and translate into actionable Issues / Tasks in GitLab

# define Feature
Feature: User Onboarding

    Is there educational value in intentionally adding inconvenience to this process?

    Scenario: User opens App
        When User opens App
        Given User does not have Organizer Authentication token
        Then User sees Landing Screen
        And User is given option to register as an Organizer or to browse events as an Attendee
        And User is given option to Learn More

    Scenario: User chooses to Learn More
        When User presses Learn More

    Scenario: User chooses to register as an Organizer

    Scenario: Organizer opens App
        When User opens App
        Given User has an Organizer Authentication Token
        Then User is presented with Organizer Dashboard

    Scenario: Organizer views Home Screen
        When Organizer visits Organizer Dashboard
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

    Scenario: User returns to app
        Given the User has an Authenticated Role
        When the User opens the app
        Then the User can View their Profile, Browse Events, or View their Calendar


# Organizers
Feature: Organizer Identity

    Scenario: Organizer creates an Organizer Profile
        Given I have an Authentication token
        # Should there be separate tokens for Organizers vs Attendees?
        When I view Organizer screen
        Then I am prompted to create an Organizer Profile

        # !! We probably should not include an open URL field

    Scenario: Organizer lists Ideas
        Given I have an Authenticaion token and an Organizer Profile
        When I view to Organizer screen
        Then I am prompted to Add Ideas
        When I navigate to Ideas
        Then I see my current list of Ideas
        And I can Create, Read, Update and Delete any Idea
        And changes to my Ideas are visible in my public Profile

    Scenario: Organizer lists Time Availability
        Given I have an Authenticaion token and at least one Idea
        When I view the Organizer screen
        Then I prompted to Create, Read, Update and Delete the times that I am available
        And changes to my Availability are visible in my public Profile

    Scenario: Organizer Time is Booked by Attendee
        Given an Attendee buys a Ticket representing my Time
        When I view my Calendar 
        Then I see current Appointments 
        # Is Appointment the right word?
        When I view Appointment details
        Then I see the profile of the Attendee for that event
    
    Scenario: Event is Completed
        # When does payment take place?

# Attendees
Feature: Attendee Experience

    Scenario: Attendee creates an Attendee Profile
        Given I have an Authentication token
        # Should there be separate tokens for Organizers vs Attendees?
        When I view Attendee screen
        Then I am prompted to create an Attendee Profile

    Scenario: Browsing
        by Date/Time
        by Organizer Profile
        by Ideas

    Scenario: Booking Event
        Given User is Authenticated and has sufficient funds in Wallet

    Scenario: Attending Event

    Scenario: View Calendar

    # Can Attendees list Ideas? Can Organizers browse for Attendees?

# Wallet
# Is the Wallet the same for both roles?
Feature: User Wallet

    Scenario: User navigates to Wallet component

    Scenario: User generates receive address ADA

    Scenario: User deposits ADA

    Scenario: Attendee pays ADA to Organizer

    Scenario: Organizer collects ADA from Attendee

    Scenario: User sends ADA to address

    # Not sure if this is in scope, and depends on how tickets are represented
    Scenario: Organizer views time tokens

