/**
 * @name dataContext
 * @desc Context container for the profile data
 */
import React, { useState, createContext } from "react";
import { BioState } from "interfaces/profileInterface";

export const initialState: BioState = {
  alias: "Batman",
  aboutURL: "",
  imageURL: "",
  timeBlockLengthMin: "15",
  timeBlockCostADA: "20",
  setAlias: () => {},
  setAboutURL: () => {},
  setImageURL: () => {},
  setTimeBlockLengthMin: () => {},
  setTimeBlockCostADA: () => {},
};

export interface ContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext<BioState>(initialState);

export const ProfileContextProvider = ({ children }: ContextProviderProps) => {
  const [alias, setAlias] = useState<string>("");
  const [aboutURL, setAboutURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [timeBlockLengthMin, setTimeBlockLengthMin] = useState<string | null>(
    null
  );
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<string | null>(null);

  return (
    <ProfileContext.Provider
      value={{
        alias,
        aboutURL,
        imageURL,
        timeBlockLengthMin,
        timeBlockCostADA,
        setAlias,
        setAboutURL,
        setImageURL,
        setTimeBlockLengthMin,
        setTimeBlockCostADA,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
