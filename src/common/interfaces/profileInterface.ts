export interface BioState {
  alias: string;
  walletBalance: number;
  aboutURL?: string | null;
  imageURL?: string | null;
  hasWalletSynced: boolean;
  timeBlockLengthMin: string | null;
  timeBlockCostADA: string | null;
  setAlias: (input: string) => void;
  setAboutURL: (input: string) => void;
  setImageURL: (input: string) => void;
  setTimeBlockLengthMin: (input: string) => void;
  setTimeBlockCostADA: (input: string) => void;
  setHasWalletSynced: (arg: boolean) => void;
  setWalletBalance: (input: number) => void;
}
