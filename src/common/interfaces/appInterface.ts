export interface AppState {
  authentication: boolean;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}
