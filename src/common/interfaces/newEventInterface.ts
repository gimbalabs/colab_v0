import * as React from "react";

import { EventCreationActions } from "common/types/contextTypes";

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ContextObjectProps {
  state: InitialState;
  dispatch: React.Dispatch<EventCreationActions>;
}

export interface InitialState {
  textContent: TextContent | null;
  availabilities: EventAvailability[];
  selectedDays: SelectedDays | null;
  tags: string[];
  hourlyRate: number | null;
  imageURI: string | null;
}

export type SelectedDays = { [key: string]: number };

export interface TextContent {
  title: string;
  description: string;
}

export interface EventAvailability {
  from: Date | number;
  to: Date | number;
  maxDuration: number;
  minDuration: number;
  localeTimeOffset?: number;
}
