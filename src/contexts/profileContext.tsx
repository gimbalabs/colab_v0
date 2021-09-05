/**
 * @name dataContext
 * @desc Context container for the profile data
 */
import React, { useState, createContext } from "react";
import { BioState } from "interfaces/profileInterface";

export const initialState: BioState = {
  username: "",
  name: "",
  publicKey: "",
  id: "",
  bio: "",
  imageURL: "",
  profession: null,
  jobTitle: null,
  description: null,
  skills: null,
  hasSyncedWallet: false,
  timeBlockLengthMin: "15",
  timeBlockCostADA: "20",
  walletBalance: 56,
  profileType: null,
  setUsername: () => {},
  setName: () => {},
  setId: () => {},
  setPublicKey: () => {},
  setBio: () => {},
  setImageURL: () => {},
  setTimeBlockLengthMin: () => {},
  setTimeBlockCostADA: () => {},
  setHasSyncedWallet: () => {},
  setWalletBalance: () => {},
  setProfession: () => {},
  setJobTitle: () => {},
  setDescription: () => {},
  setSkills: () => {},
  setProfileType: () => {},
};

export interface ContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext<BioState>(initialState);

export const ProfileContextProvider = ({ children }: ContextProviderProps) => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [timeBlockLengthMin, setTimeBlockLengthMin] = useState<string | null>(
    null
  );
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<string | null>(null);
  const [profession, setProfession] = useState<string | string[] | null>(null);
  const [jobTitle, setJobTitle] = useState<string | string[] | null>(null);
  const [description, setDescription] = useState<string | string[] | null>(
    null
  );
  const [skills, setSkills] = useState<string | string[] | null>(null);
  const [hasSyncedWallet, setHasSyncedWallet] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<number>(56);
  const [profileType, setProfileType] = useState<
    "attendee" | "organizer" | null
  >(null);

  return (
    <ProfileContext.Provider
      value={{
        username,
        name,
        id,
        publicKey,
        walletBalance,
        bio,
        imageURL,
        hasSyncedWallet,
        timeBlockLengthMin,
        timeBlockCostADA,
        profession,
        jobTitle,
        description,
        skills,
        profileType,
        setProfileType,
        setUsername,
        setId,
        setName,
        setPublicKey,
        setBio,
        setImageURL,
        setWalletBalance,
        setHasSyncedWallet,
        setTimeBlockLengthMin,
        setTimeBlockCostADA,
        setProfession,
        setJobTitle,
        setDescription,
        setSkills,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
