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

export interface ContextProviderProps {
  children: React.ReactNode;
}

const initialState: MyCalendarState = {
  // Sat May 02 2020 08:20:22 GMT+0000 unix timestamp - from when display calendar
  registrationDate: 1588407622,
  scheduledEvents: [
    {
      title: "My Test Event",
      fromDate: 1620116789,
      toDate: 1620123989,
      description: "A very important event which I cannot miss!",
      participants: ["piotr.napierala94@gmail.com", "john@travolta.com"],
    },
  ],
  myAvailabilities: [
    {
      date: "2021/05/04",
      timeSlots: [
        {
          fromTime: "12:20",
          toTime: "14:00",
        },
      ],
    },
  ],
};

const reducer = (state: MyCalendarState, action: MyCalendarActions) => {
  switch (action.type) {
    case MyCalendarTypes.AddEvent:
      // TODO: Sort through the existing events, or send to a server?
      state.scheduledEvents.push(action.payload.event);
      return {
        ...state,
      };
    case MyCalendarTypes.AddAvailability:
      // TODO: Check before sending a dispatch if the availability already exists
      action.payload.availabilities.forEach((availability) => {
        state.myAvailabilities.push(availability);
      });
      return {
        ...state,
      };
    default:
      throw Error(`Unknow type of action: ${action.type}`);
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
