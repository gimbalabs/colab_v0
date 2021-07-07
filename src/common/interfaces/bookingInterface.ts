export interface InitialState {
  pickedDate: number | null;
  duration: number;
  durationCost: number;
  eventTitle: string;
  organizerRate: OrganizerRate | null;
  previewingOrganizer: any;
  maxTimeSlotDuration: number | undefined;
}

export interface OrganizerRate {
  timeBlockCost: number;
  timeBlockLength: number;
}

export interface BookingContextProps {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}

export interface SectionDetail {
  callbackFn?: EventCallbackFn | undefined;
  lineContent: EventLine | EventLine[];
  label: string;
  isLastItem: boolean;
}

export interface EventCallbackFn {
  callbackFnScreen: string;
  label: string;
}

export interface EventLine {
  content: string;
  icon?: React.ReactNode;
}
