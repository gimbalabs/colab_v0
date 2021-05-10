Feature: Meeting Browsing
	Scenario: User seeks to arrange a Meeting
		Then User sees default view for browsing by Idea with options to browse by Organizer or by Date
		
		Idea --> Organizer(s) --> Dates --> Time Blocks		
		Organizer --> Dates --> Pick a time block
		Date --> Organizers --> Pick an Organizer's time block