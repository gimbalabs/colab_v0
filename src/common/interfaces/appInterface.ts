/**
 * @interfaces for appContext.tsx file.
 */

export type ColorSchemeName = "light" | "dark";

export interface AppState {
  authentication: boolean;
  colorScheme: ColorSchemeName;
  favoriteOrganizers: any[];
  pageIndex: number;
}

export interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export interface Transaction {
  withUser: string;
  oldUtxo: number;
  newUtxo: number;
  date: number;
}
