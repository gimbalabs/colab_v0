export interface MyCalendarState {
  calendar: Month[];
  registrationDate: number | null;
  availabilities: Availabilities[] | null | undefined;
  events: Events[] | null | undefined;
  calendarHeader: CalendarHeader;
  previewingDayEvents?: PreviewingDayEvents;
  direction: null | "previous" | "next";
  organizerAvailabilities: any;
  availabilitiesCalendar: any;
  currentSelectedDay: number | null;
}

export interface Availabilities {
  year: number;
  months: AvailabilitiesMonth[];
}

export interface AvailabilitiesMonth {
  month: string;
  days: AvailabilitiesDay[];
}

export interface AvailabilitiesDay {
  day: number;
  timeSlots: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  fromTime: number | string;
  toTime: number | string;
}

export interface Events {
  year: number;
  months: EventsMonth[];
}

export interface EventsMonth {
  month: string;
  days: EventsDay[];
  totalNumOfEvents: number;
}

export interface EventsDay {
  day: number;
  scheduledEvents: Event[];
}

export interface Event {
  title: string;
  fromTime: number | string;
  toTime: number | string;
  description: string;
  participants: string[];
  organizerAlias: string;
  organizerId: string;
}

export interface MyCalendarContextProps {
  state: MyCalendarState;
  dispatch: React.Dispatch<any>;
}

export interface NewCalendarMonths {
  nextMonths: boolean;
  month: number;
  year?: number;
  isBookingCalendar?: boolean;
  isRegularCalendar?: boolean;
}

export interface PreviewingDayEvents {
  month: string | undefined;
  day: number | undefined;
  events: Event[] | undefined | [];
}

export interface CalendarHeader {
  month: string;
  year: number;
  numOfEvents?: number | undefined;
}

export interface Month {
  name: string;
  firstDayName: string;
  year: number;
  numOfEvents?: number;
  numOfAvailabilities?: number;
  numOfDays: number;
  days: Day[];
}

export interface Day {
  name: string;
  number: number;
  isAvailable?: boolean;
  isLastWeek?: boolean;
  availabilities?: AvailabilitySlot[];
  scheduledEvents?: Event[];
  direction?: "previous" | "next" | undefined;
}

export interface Date {
  year?: number;
  month?: number;
  day: number;
}
