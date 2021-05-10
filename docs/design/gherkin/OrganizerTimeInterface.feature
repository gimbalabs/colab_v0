Feature: Organizer Time Interface

    Scenario: Organizer lists Time Availability
        Given User have an Authenticaion token and at least one Idea
        When User view the Organizer screen
        Then User is prompted to Create, Read, Update and Delete the times that I am available
        And changes to Availability are visible in public Profile

    Scenario: Organizer Time is Booked by Attendee
        Given an Attendee buys a Ticket representing my Time
        When User views Calendar 
        Then User sees current Meetings 
        When User views Meeting details
        Then User sees the profile of the Attendee for that event