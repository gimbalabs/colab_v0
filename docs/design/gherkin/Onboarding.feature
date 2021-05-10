Feature: User Onboarding

    Is there educational value in intentionally adding inconvenience to this process?

    Scenario: User opens App
        When User opens App
        Given User does not have Organizer Authentication token
        Then User sees Landing Screen
        And User is given option to register as an Organizer or to browse Meeting as an Attendee
        And User is given option to Learn More

    Scenario: User chooses to Learn More
        When User presses Learn More
		Then User sees a Modal with more information about Roles in this Dapp
		And User gains clarity about if they're an Organizer or Attendee ("Am I...?")
		And User sees a button that says OK which closes Modal