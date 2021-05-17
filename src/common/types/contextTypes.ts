/**
 * @types for appContext & myCalendarContext files.
 */
import {
  Availabilities,
  CalendarHeader,
  Month,
  MyCalendarState,
  PreviewingDayEvents,
  ScheduledEvents,
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
  PreviewDayEvents = "PREVIEW_DAY_EVENTS",
  ClearDayPreview = "CLEAR_DAY_PREVIEW",
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
    event: ScheduledEvents;
  };
  [MyCalendarTypes.AddAvailability]: {
    availabilities: Availabilities[];
  };
  [MyCalendarTypes.LoadMyCalendar]: {
    calendar: Month[];
  };
  [MyCalendarTypes.ChangeMonthHeader]: {
    calendarHeader: CalendarHeader;
  };
  [MyCalendarTypes.PreviewDayEvents]: {
    previewingDayEvents: PreviewingDayEvents;
  };
  [MyCalendarTypes.ResetState]: {
    calendarState?: MyCalendarState;
  };
  [MyCalendarTypes.ClearDayPreview]: {};
};

export type MyCalendarActions = ActionMap<MyCalendarPaylaod>[keyof ActionMap<MyCalendarPaylaod>];
export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
