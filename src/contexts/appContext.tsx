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
<<<<<<< HEAD
import { AppActions } from "common/types/appTypes";
=======
import { AppActions, Types } from "common/types/appTypes";
>>>>>>> 5b5b035736c417960a694a3b62ff1889f2df44f1

const initialAppState: AppState = {
  authentication: true,
};

const reducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case Types.ToggleAuth:
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
