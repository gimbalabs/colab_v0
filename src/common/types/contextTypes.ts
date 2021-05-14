/**
 * @types for appContext & myCalendarContext files.
 */
import {
  AvailabilityDay,
  CalendarEvent,
  CalendarHeader,
  Month,
  MyCalendarState,
} from "interfaces/myCalendarInterface";

export enum AppTypes {
  ToggleAuth = "TOGGLE_AUTH",
}

export enum MyCalendarTypes {
  AddEvent = "ADD_EVENT",
  AddAvailability = "ADD_AVAILABILITY",
  ResetState = "RESET_STATE",
  LoadMyCalendar = "LOAD_MY_CALENDAR",
  ChangeMonthHeader = "CHANGE_MONTH_HEADER",
}

/**
 * @name ActionMap
 * @description maps trough indexed types of payloads types and assigns
 *              the payload accordingly (if the action type isn't undefined)
 */
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AppPayload = {
  [AppTypes.ToggleAuth]: {
    authentication: boolean;
  };
};

export type MyCalendarPaylaod = {
  [MyCalendarTypes.AddEvent]: {
    event: CalendarEvent;
  };
  [MyCalendarTypes.AddAvailability]: {
    availabilities: AvailabilityDay[];
  };
  [MyCalendarTypes.LoadMyCalendar]: {
    calendar: Month[];
  };
  [MyCalendarTypes.ChangeMonthHeader]: {
    calendarHeader: CalendarHeader;
  };
  [MyCalendarTypes.ResetState]: {
    calendarState?: MyCalendarState;
  };
};

export type MyCalendarActions = ActionMap<MyCalendarPaylaod>[keyof ActionMap<MyCalendarPaylaod>];
export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
