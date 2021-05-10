Feature: Organizer has a list Ideas to View, CRUD
	Scenario: Organizer lists Idea
		Tagged from existing classifications

	OR...

	Scenario: Organizer adds classification/label/category

    Scenario: Organizer lists Ideas
        Given I have an Authenticaion token and an Organizer Profile
        When I view to Organizer screen
        Then I am prompted to Add Ideas
        When I navigate to Ideas
        Then I see my current list of Ideas
        And I can Create, Read, Update and Delete any Idea
        And changes to my Ideas are visible in my public Profile