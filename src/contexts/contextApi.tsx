import * as React from "react";
import { ColorSchemeName } from "react-native";

import { AppContext } from "./appContext";
import { MyCalendarContext } from "./myCalendarContext";
import { BookingContext } from "./bookingContext";
import { EventCreationContext } from "./eventCreationContext";
import {
  Availabilities,
  CalendarHeader,
  NewCalendarMonths,
  PreviewingDayEvents,
  ScheduledEvent,
} from "interfaces/myCalendarInterface";
import { OrganizerRate } from "common/interfaces/bookingInterface";
import {
  EventAvailability,
  TextContent,
} from "common/interfaces/newEventInterface";
import { EventCreationTypes } from "common/types/contextTypes";

export const appContext = () => {
  const { state, dispatch } = React.useContext(AppContext);

  return {
    auth: state.authentication,
    accountType: state.accountType,
    colorScheme: state.colorScheme,
    pageIndex: state.pageIndex,
    favoriteOrganizers: state.favoriteOrganizers,
    ref: state.ref,
    setRef: (ref: React.RefObject<any>) =>
      dispatch({ type: "SET_REF", payload: { ref } }),
    toggleAuth: (auth?: boolean) => {
      dispatch({ type: "TOGGLE_AUTH", payload: { auth } });
    },
    setFavoriteOrganizer: (alias: string) => {
      dispatch({ type: "SET_FAVORITE_ORGANIZER", payload: { alias } });
    },
    setColorScheme: (newColorScheme: ColorSchemeName) => {
      dispatch({ type: "SET_COLOR_SCHEME", payload: { newColorScheme } });
    },
    setPageIndex: (pageIndex: number) => {
      dispatch({ type: "SET_PAGE_INDEX", payload: { pageIndex } });
    },
  };
};

export const eventCreationContext = () => {
  const { state, dispatch } = React.useContext(EventCreationContext);

  return {
    textContent: state.textContent,
    availabilities: state.availabilities,
    selectedDays: state.selectedDays,
    tags: state.tags,
    hourlyRate: state.hourlyRate,
    imageURI: state.imageURI,
    setTextContext: (textContent: TextContent) => {
      dispatch({
        type: EventCreationTypes.SetTextContent,
        payload: { textContent },
      });
    },
    setSelectedDays: (
      selectedDays: number[],
      isRecurringSelection: boolean = false
    ) => {
      dispatch({
        type: EventCreationTypes.SetSelectedDays,
        payload: { selectedDays, isRecurringSelection },
      });
    },
    setAvailabilities: (availabilities: EventAvailability[]) => {
      dispatch({
        type: EventCreationTypes.SetAvailabilities,
        payload: { availabilities },
      });
    },
    setHourlyRate: (hourlyRate: number) => {
      dispatch({
        type: EventCreationTypes.SetHourlyRate,
        payload: { hourlyRate },
      });
    },
    setImageUri: (imageURI: string) => {
      dispatch({
        type: EventCreationTypes.SetImageURI,
        payload: { imageURI },
      });
    },
    setTags: (tags: string[]) => {
      dispatch({
        type: EventCreationTypes.SetTags,
        payload: { tags },
      });
    },
  };
};

export const bookingContext = () => {
  const { state, dispatch } = React.useContext(BookingContext);

  return {
    duration: state.duration,
    durationCost: state.durationCost,
    eventTitle: state.eventTitle,
    pickedDate: state.pickedDate,
    organizerRate: state.organizerRate,
    previewingOrganizer: state.previewingOrganizer,
    maxTimeSlotDuration: state.maxTimeSlotDuration,
    setDuration: (duration: number) =>
      dispatch({ type: "SET_DURATION", payload: { duration } }),
    setDurationCost: (durationCost: number) =>
      dispatch({ type: "SET_DURATION_COST", payload: { durationCost } }),
    setEventTitle: (title: string) =>
      dispatch({ type: "SET_EVENT_TITLE", payload: { title } }),
    setOrganizerRate: (organizerRate: OrganizerRate) =>
      dispatch({ type: "SET_ORGANIZER_RATE", payload: { organizerRate } }),
    setPickedDate: (pickedDate: number | null) =>
      dispatch({ type: "SET_PICKED_DATE", payload: { pickedDate } }),
    setMaxTimeSlotDuration: (maxTimeSlotDuration: number | undefined) =>
      dispatch({
        type: "SET_MAX_TIME_SLOT_DUR",
        payload: { maxTimeSlotDuration },
      }),
    setPreviewingOrganizer: (previewingOrganizer: any) =>
      dispatch({
        type: "SET_PREVIEWING_ORGANIZER",
        payload: { previewingOrganizer },
      }),
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
    setCurrSelectedDay: (selectedDay: any) => {
      dispatch({ type: "SET_CURR_SELECTED_DAY", payload: { selectedDay } });
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
