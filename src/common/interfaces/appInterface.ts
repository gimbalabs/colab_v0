/**
 * @interfaces for appContext.tsx file.
 */

export interface AppState {
  authentication: boolean;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}
