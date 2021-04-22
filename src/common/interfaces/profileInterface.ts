export interface BioState {
  alias: string;
  aboutURL?: string | null;
  imageURL?: string | null;
  timeBlockLengthMin: string;
  timeBlockCostADA: string;
  setAlias: (input: string) => void;
  setAboutURL: (input: string) => void;
  setImageURL: (input: string) => void;
  setTimeBlockLengthMin: (input: string) => void;
  setTimeBlockCostADA: (input: string) => void;
}
