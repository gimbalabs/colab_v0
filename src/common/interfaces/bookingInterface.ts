export interface InitialState {
  pickedDate: number | null;
  duration: number;
  organizerRate: OrganizerRate | null;
}

export interface OrganizerRate {
  timeBlockCost: number;
  timeBlockLength: number;
}

export interface BookingContextProps {
  state: InitialState;
  dispatch: React.Dispatch<any>;
}
