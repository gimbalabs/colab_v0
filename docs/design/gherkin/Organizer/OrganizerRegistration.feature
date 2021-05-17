Feature: Organizer Onboarding & Registration
    Scenario: User chooses to register as an Organizer
		Given User pressed the button to Register as Organizer
		Then User is presented with Registration Flow

Feature: Organizer Identity

    Scenario: Organizer creates an Organizer Profile
        Given User has an Organizer Authentication token
        When Organizer views Organizer screen
        Then Organizer is prompted to create an Organizer Profile

    Scenario: Organizer edits Organizer Profile
        When 