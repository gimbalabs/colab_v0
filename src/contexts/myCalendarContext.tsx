/**
 * @name myCalendarContext
 * @description context for providing state of the user calendar,
 *              e.g booked meetings, events, scheduled 1 on 1 conversations
 */
import * as React from "react";
import {
  MyCalendarContextProps,
  MyCalendarState,
} from "interfaces/myCalendarInterface";
import { MyCalendarActions, MyCalendarTypes } from "common/types/contextTypes";
import { getMonth, getSixMonthsWithDays, getYear } from "lib/utils";

import { scheduledEvents } from "../api_data/scheduledEvents";
import { availabilities } from "../api_data/availabilities";
import { months } from "common/types/calendarTypes";

export interface ContextProviderProps {
  children: React.ReactNode;
}

const initialCalendar = [
  ...getSixMonthsWithDays(false, true),
  ...getSixMonthsWithDays(true),
];

export const initialState: MyCalendarState = {
  registrationDate: 1620165600000,
  calendar: initialCalendar,
  previewingDayEvents: {
    month: "",
    events: [],
  },
  availabilities,
  scheduledEvents,
  calendarHeader: {
    month: months[getMonth()],
    year: getYear(),
  },
};

const reducer = (state: MyCalendarState, action: MyCalendarActions) => {
  switch (action.type) {
    case MyCalendarTypes.AddEvent:
      // TODO: Sort through existing events, or send to a server?
      if (state.scheduledEvents != null) {
        state.scheduledEvents.push(action.payload.event);
      }
      return {
        ...state,
      };
    case MyCalendarTypes.AddAvailability:
      // TODO: 1. Check before dispatching if user availability already exists
      //       2. Figure out how to add availabilities to already existing objects
      return {
        ...state,
        availabilities: action.payload.availabilities,
      };
    case MyCalendarTypes.ChangeMonthHeader:
      state.calendarHeader.month = action.payload.calendarHeader.month;
      state.calendarHeader.year = action.payload.calendarHeader.year;
      return {
        ...state,
      };
    case MyCalendarTypes.PreviewDayEvents:
      return {
        ...state,
        previewingDayEvents: action.payload.previewingDayEvents,
      };
    case MyCalendarTypes.LoadMyCalendar:
      return {
        ...state,
        calendar: action.payload.calendar,
      };
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const MyCalendarContext = React.createContext<MyCalendarContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const MyCalendarProvider = ({ children }: ContextProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <MyCalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </MyCalendarContext.Provider>
  );
};
