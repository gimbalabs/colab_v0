export interface BioState {
  alias: string;
  aboutURL?: string | null;
  imageURL?: string | null;
  timeBlockLengthMin: string | null;
  timeBlockCostADA: string | null;
  setAlias: (input: string) => void;
  setAboutURL: (input: string) => void;
  setImageURL: (input: string) => void;
  setTimeBlockLengthMin: (input: string) => void;
  setTimeBlockCostADA: (input: string) => void;
}
