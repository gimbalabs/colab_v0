export interface BioState {
  username: string;
  name: string;
  publicKey: string;
  id: string;
  walletBalance: number;
  bio?: string | null;
  imageURL?: string | null;
  hasSyncedWallet: boolean;
  timeBlockLengthMin: string | null;
  timeBlockCostADA: string | null;
  profession: string | string[] | null;
  jobTitle: string | string[] | null;
  description: string | string[] | null;
  skills: string | string[] | null;
  profileType: "attendee" | "organizer" | null;
  setUsername: (input: string) => void;
  setName: (input: string) => void;
  setPublicKey: (input: string) => void;
  setId: (input: string) => void;
  setBio: (input: string) => void;
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

export interface UserDTO {
  username: string;
  name: string;
  id: string;
  publicKey: string;
}
