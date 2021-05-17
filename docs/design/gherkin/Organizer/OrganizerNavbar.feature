Feature: Organizer Nav Bar

        Navbar:
        - Edit Profile / View Auth Token
        - Edit Ideas
        - View "Wallet"
        - Browse as Attendee (browse other Organizers)

    Scenario: User sees more Role Information
        When User chooses the option to see more Role Information
        Given User is on Landing Screen
        Then User sees a pop-up with more Information about Role