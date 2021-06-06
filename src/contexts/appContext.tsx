/**
 * @name appContext
 * @desc Context & reducer for managing high-level application state
 * e.g.: auth, dark/light mode, theme preferences etc.
 */
import * as React from "react";
import { Appearance, ColorSchemeName } from "react-native";
import {
  AppState,
  AppContextProviderProps,
  AppContextProps,
} from "interfaces/appInterface";
import { AppActions, AppTypes } from "common/types/contextTypes";

// Get the user preffered color scheme (light or dark)
const colorScheme: ColorSchemeName = Appearance.getColorScheme();

const initialAppState: AppState = {
  authentication: true,
  colorScheme: colorScheme == null ? "light" : colorScheme,
};

const reducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case AppTypes.ToggleAuth:
      return {
        ...state,
        authentication:
          action.payload.auth != null
            ? action.payload.auth
            : !state.authentication,
      };
    case AppTypes.SetColorScheme:
      if (action.payload.newColorScheme != null) {
        return {
          ...state,
          colorScheme: action.payload.newColorScheme,
        };
      }
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const AppContext = React.createContext<AppContextProps>({
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
