import * as React from "react";

import {
  ContextObjectProps,
  InitialState,
  ProviderProps,
} from "common/interfaces/newEventInterface";
import {
  EventCreationActions,
  EventCreationPayload,
  EventCreationTypes,
} from "common/types/contextTypes";

const initialState: InitialState = {
  textContent: null,
  availabilities: [],
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
    case EventCreationTypes.SetAvailabilities:
      return {
        ...state,
        availabilities: action.payload.availabilties,
      };
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

const EventCreationContext = React.createContext<ContextObjectProps>({
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
