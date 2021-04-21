import { BioState } from "./BioState";

export interface IOrganizerForm extends BioState {
  alias: string;
  aboutURL?: string;
  imageURL?: string;
  timeBlockLengthMin: number | null;
  timeBlockCostADA: number | null;
}
