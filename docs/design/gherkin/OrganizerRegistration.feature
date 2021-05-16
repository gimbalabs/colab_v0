Feature: Organizer Onboarding & Registration
    Scenario: User chooses to register as an Organizer
		Given User pressed the button to Register as Organizer
		Then User is presented with Registration Flow

Feature: Organizer Identity

    Scenario: Organizer creates an Organizer Profile
        Given I have an Authentication token
        When I view Organizer screen
        Then I am prompted to create an Organizer Profile
        # is allowing URL field ok?