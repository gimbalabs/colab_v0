import {
  EventAvailability,
  SelectedDays,
} from "common/interfaces/newEventInterface";

export interface EventUser {
  id: string;
  username: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  selectedDays: SelectedDays;
  availabilities: EventAvailability[];
  tags: string[];
  hourlyRate: number;
  imageURI: string;
  privateEvent: boolean;
  eventCardColor: string;
  organizer: EventUser;
}
