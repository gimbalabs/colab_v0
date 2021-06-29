import * as React from "react";

import { AppContext } from "./appContext";
import { MyCalendarContext } from "./myCalendarContext";
import {
  Availabilities,
  CalendarHeader,
  NewCalendarMonths,
  PreviewingDayEvents,
  ScheduledEvent,
} from "interfaces/myCalendarInterface";
import { ColorSchemeName } from "react-native";

export const appContext = () => {
  const { state, dispatch } = React.useContext(AppContext);

  return {
    auth: state.authentication,
    colorScheme: state.colorScheme,
    favoriteOrganizers: state.favoriteOrganizers,
    toggleAuth: (auth?: boolean) => {
      dispatch({ type: "TOGGLE_AUTH", payload: { auth } });
    },
    setFavoriteOrganizer: (alias: string) => {
      dispatch({ type: "SET_FAVORITE_ORGANIZER", payload: { alias } });
    },
    setColorScheme: (newColorScheme: ColorSchemeName) => {
      dispatch({ type: "SET_COLOR_SCHEME", payload: { newColorScheme } });
    },
  };
};

export const myCalendarContext = () => {
  const { state, dispatch } = React.useContext(MyCalendarContext);

  return {
    calendar: state.calendar,
    calendarHeader: state.calendarHeader,
    availabilities: state.availabilities,
    organizerAvailabilities: state.organizerAvailabilities,
    scheduledEvents: state.scheduledEvents,
    registrationDate: state.registrationDate,
    previewingDayEvents: state.previewingDayEvents,
    direction: state.direction,
    addEvent: (event: ScheduledEvent) => {
      dispatch({ type: "ADD_EVENT", payload: event });
    },
    addAvailability: (availabilities: Availabilities[]) => {
      dispatch({ type: "ADD_AVAILABILITY", payload: availabilities });
    },
    changeMonthHeader: (calendarHeader: CalendarHeader) => {
      dispatch({ type: "CHANGE_MONTH_HEADER", payload: { calendarHeader } });
    },
    setCalendarDirection: (direction: null | "previous" | "next") => {
      dispatch({ type: "SET_CALENDAR_DIRECTION", payload: { direction } });
    },
    loadMyCalendar: (calendarArgs: NewCalendarMonths) => {
      dispatch({ type: "LOAD_MY_CALENDAR", payload: { calendarArgs } });
    },
    setAvailCalendar: (availabilities: any) => {
      dispatch({ type: "SET_AVAIL_CALENDAR", payload: { availabilities } });
    },
    setOrganizerAvail: (availabilities: any) => {
      dispatch({ type: "SET_ORGANIZER_AVAIL", payload: { availabilities } });
    },
    previewDayEvents: (newPreviewingDayEvents: PreviewingDayEvents) => {
      dispatch({
        type: "PREVIEW_DAY_EVENTS",
        payload: { newPreviewingDayEvents },
      });
    },
    clearPreviewDayEvents: () => {
      dispatch({
        type: "CLEAR_DAY_PREVIEW",
      });
    },
  };
};
