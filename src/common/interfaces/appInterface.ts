export interface IAppState {
  authentication: boolean;
}

export interface IAppContextProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<any>;
}
