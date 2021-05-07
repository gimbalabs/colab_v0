export interface CalendarEvent {
  title: string;
  fromDate: number;
  toDate: number;
  description?: string;
  participants: string[];
}

export interface AvailabilitySlot {
  fromTime: string;
  toTime: string;
}

export interface AvailabilityDay {
  date: string;
  timeSlots: AvailabilitySlot[];
}

export interface MyCalendarState {
  registrationDate: number;
  scheduledEvents: CalendarEvent[];
  myAvailabilities: AvailabilityDay[];
}

export interface MyCalendarContextProps {
  state: MyCalendarState;
  dispatch: React.Dispatch<any>;
}
