export interface BioState {
  alias: string,
  aboutURL?: string,
  imageURL?: string,
  timeBlockLengthMin: number | null,
  timeBlockCostADA: number | null;
  setAlias: (input: string ) => void;
  setAboutURL: (input: string ) => void;
  setImageURL: (input: string) => void;
  setTimeBlockLengthMin :(input: number ) => void;
  setTimeBlockCostADA: (input: number) => void;
};