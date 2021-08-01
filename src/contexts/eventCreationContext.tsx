import * as React from "react";

import {
  ContextObjectProps,
  InitialState,
  ProviderProps,
} from "common/interfaces/newEventInterface";
import {
  EventCreationActions,
  EventCreationTypes,
} from "common/types/contextTypes";

const initialState: InitialState = {
  textContent: null,
  availabilities: [],
  selectedDays: null,
  tags: [],
  hourlyRate: null,
  imageURI: null,
};

const reducer = (
  state: InitialState,
  action: EventCreationActions
): InitialState => {
  switch (action.type) {
    case EventCreationTypes.SetTextContent:
      return {
        ...state,
        textContent: action.payload.textContent,
      };
    case EventCreationTypes.AddAvailability:
      state.availabilities.push(action.payload.availability);
      return {
        ...state,
      };
    case EventCreationTypes.RemoveAvailability:
      const { from, to } = action.payload.availability;
      const newAvailabilities = state.availabilities.filter(
        (el) => el.from != from && el.to != to
      );

      return {
        ...state,
        availabilities: newAvailabilities,
      };

    case EventCreationTypes.SetSelectedDays: {
      let newSelectedDays: any = state.selectedDays || {};

      action.payload.selectedDays.map((day) => {
        if (
          !state.selectedDays ||
          !state.selectedDays[day] ||
          (action.payload.isRecurringSelection && true)
        ) {
          newSelectedDays[day] = day;
        } else {
          delete newSelectedDays[day];
          if (Object.keys(newSelectedDays).length === 0) newSelectedDays = null;
        }
      });

      return {
        ...state,
        selectedDays: newSelectedDays,
      };
    }
    case EventCreationTypes.SetHourlyRate:
      return {
        ...state,
        hourlyRate: action.payload.hourlyRate,
      };
    case EventCreationTypes.SetImageURI:
      return {
        ...state,
        imageURI: action.payload.imageURI,
      };
    case EventCreationTypes.SetTags:
      return {
        ...state,
        tags: action.payload.tags,
      };
    default: {
      throw new Error(`Unknown type of action ${action.type}`);
    }
  }
};

export const EventCreationContext = React.createContext<ContextObjectProps>({
  state: initialState,
  dispatch: () => {},
});

export const EventCreationContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <EventCreationContext.Provider value={{ state, dispatch }}>
      {children}
    </EventCreationContext.Provider>
  );
};
