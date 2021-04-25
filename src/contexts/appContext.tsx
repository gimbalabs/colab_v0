/**
 * @name appContext
 * @desc Context & reducer for managing high-level application state
 * e.g.: auth, dark/light mode, theme preferences etc.
 */
import * as React from "react";
import {
  AppState,
  AppContextState,
  AppContextProviderProps,
} from "interfaces/appInterface";
import { AppActions } from "common/types/appTypes";

const initialAppState: AppState = {
  authentication: true,
};

const reducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case "TOGGLE_AUTH":
      return {
        authentication: !state.authentication,
      };
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const AppContext = React.createContext<AppContextState>({
  state: initialAppState,
  dispatch: () => null,
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
