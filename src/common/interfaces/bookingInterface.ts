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
