import { EventCreationActions } from "common/types/contextTypes";
import * as React from "react";

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
  tags: string[];
  hourlyRate: number | null;
  imageURI: string | null;
}

export interface TextContent {
  title: string;
  description: string;
}

export interface EventAvailability {
  from: number;
  to: number;
  maxDuration: number;
  minDuration: number;
  localeTimeOffset: number;
}
