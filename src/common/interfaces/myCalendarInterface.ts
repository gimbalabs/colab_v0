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
  calendar?: Month[];
  calendarHeader?: CalendarHeader;
}

export interface MyCalendarContextProps {
  state: MyCalendarState;
  dispatch: React.Dispatch<any>;
}
export interface CalendarHeader {
  month: string;
  year: number;
}

export interface Month {
  name: string;
  firstDayName: string;
  year: number;
  numOfDays: number;
  days: Day[];
}

export interface Day {
  name: string;
  number: number;
  isLastWeek?: boolean;
}
