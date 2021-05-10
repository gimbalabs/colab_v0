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