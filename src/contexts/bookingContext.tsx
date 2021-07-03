import * as React from "react";

import {
  BookingContextProps,
  InitialState,
} from "common/interfaces/bookingInterface";
import { BookingActions, BookingTypes } from "common/types/contextTypes";

const initialState: InitialState = {
  pickedDate: null,
  duration: 0,
  organizerRate: null,
};

const reducer = (state: InitialState, action: BookingActions) => {
  switch (action.type) {
    case BookingTypes.SetDuration:
      return {
        ...state,
        duration: action.payload.duration,
      };
    case BookingTypes.SetOrganizerRate:
      return {
        ...state,
        organizerRate: action.payload.organizerRate,
      };
    case BookingTypes.SetPickedDate:
      return {
        ...state,
        pickedDate: action.payload.pickedDate,
      };
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const BookingContext = React.createContext<BookingContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const BookingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
