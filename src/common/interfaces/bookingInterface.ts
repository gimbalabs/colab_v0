export interface InitialState {
  pickedDate: number | null;
  duration: number;
  durationCost: number;
  eventTitle: string;
  organizerRate: OrganizerRate | null;
  previewingOrganizer: null | any;
}

export interface OrganizerRate {
  timeBlockCost: number;
  timeBlockLength: number;
}

export interface BookingContextProps {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}
