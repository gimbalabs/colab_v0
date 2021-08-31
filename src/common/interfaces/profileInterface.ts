export interface BioState {
  alias: string;
  walletBalance: number;
  aboutURL?: string | null;
  imageURL?: string | null;
  hasSyncedWallet: boolean;
  timeBlockLengthMin: string | null;
  timeBlockCostADA: string | null;
  profession: string | string[] | null;
  jobTitle: string | string[] | null;
  description: string | string[] | null;
  skills: string | string[] | null;
  profileType: "attendee" | "organizer" | null;
  setAlias: (input: string) => void;
  setAboutURL: (input: string) => void;
  setImageURL: (input: string) => void;
  setTimeBlockLengthMin: (input: string) => void;
  setTimeBlockCostADA: (input: string) => void;
  setHasSyncedWallet: (arg: boolean) => void;
  setWalletBalance: (input: number) => void;
  setProfession: (input: string | string[]) => void;
  setJobTitle: (input: string | string[]) => void;
  setDescription: (input: string | string[]) => void;
  setSkills: (input: string | string[]) => void;
  setProfileType: (input: "organizer" | "attendee") => void;
}
