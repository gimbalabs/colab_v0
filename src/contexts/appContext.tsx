/**
 * @name appContext
 * @desc Context & reducer for managing high-level application state
 * e.g.: auth, dark/light mode, theme preferences etc.
 */
import * as React from "react";
import {
  IAppState,
  IAppContext,
  IAppContextProvider,
} from "interfaces/appInterface";

const initialAppState: IAppState = {
  authentication: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_AUTH":
      return {
        authentication: !state.authentication,
      };
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const AppContext = React.createContext<IAppContext>({
  state: initialAppState,
  dispatch: () => null,
});

export const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
