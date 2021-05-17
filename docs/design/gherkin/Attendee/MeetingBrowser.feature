Feature: Meeting Browsing

	Scenario: User seeks to arrange a Meeting
		Then User sees default view for browsing by Idea with options to browse by Organizer or by Date
		
	Scenario: User browses by Idea
		Idea --> Organizer(s) --> Dates --> Time Blocks		
		
	Scenario: User browses list of Organizers
		Organizer --> Dates --> Pick a time block
	
	Scenario: User browses by Date
		Date --> Organizers --> Pick an Organizer's time block