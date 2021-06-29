/**
 * @types for appContext & myCalendarContext files.
 */
import {
  Availabilities,
  CalendarHeader,
  MyCalendarState,
  NewCalendarMonths,
  PreviewingDayEvents,
  ScheduledEvents,
} from "interfaces/myCalendarInterface";
import { ColorSchemeName } from "react-native";

export enum AppTypes {
  ToggleAuth = "TOGGLE_AUTH",
  SetColorScheme = "SET_COLOR_SCHEME",
  SetFavoriteOrganizer = "SET_FAVORITE_ORGANIZER",
}

export enum MyCalendarTypes {
  AddEvent = "ADD_EVENT",
  AddAvailability = "ADD_AVAILABILITY",
  ResetState = "RESET_STATE",
  LoadMyCalendar = "LOAD_MY_CALENDAR",
  ChangeMonthHeader = "CHANGE_MONTH_HEADER",
  PreviewDayEvents = "PREVIEW_DAY_EVENTS",
  ClearDayPreview = "CLEAR_DAY_PREVIEW",
  CalendarDirection = "SET_CALENDAR_DIRECTION",
  SetAvailCalendar = "SET_AVAIL_CALENDAR",
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
    auth: boolean;
  };
  [AppTypes.SetFavoriteOrganizer]: {
    alias: string;
  };
  [AppTypes.SetColorScheme]: {
    newColorScheme: ColorSchemeName;
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
    calendarArgs: NewCalendarMonths;
  };
  [MyCalendarTypes.ChangeMonthHeader]: {
    calendarHeader: CalendarHeader;
  };
  [MyCalendarTypes.PreviewDayEvents]: {
    newPreviewingDayEvents: PreviewingDayEvents;
  };
  [MyCalendarTypes.ResetState]: {
    calendarState?: MyCalendarState;
  };
  [MyCalendarTypes.CalendarDirection]: {
    direction: null | "previous" | "next";
  };
  [MyCalendarTypes.SetAvailCalendar]: {
    availabilities?: any;
  };
  [MyCalendarTypes.ClearDayPreview]: {};
};

export type MyCalendarActions = ActionMap<MyCalendarPaylaod>[keyof ActionMap<MyCalendarPaylaod>];
export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];
