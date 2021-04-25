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
<<<<<<< HEAD
export const globalContext = createContext<BioState>(initialState);

export interface IContextProvider {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProvider) => {
=======
export const ProfileContext = createContext<BioState>(initialState);

export interface IContextProvider {
  children: React.ReactNode;
}

export const ProfileContextProvider = ({ children }: IContextProvider) => {
>>>>>>> 797d02435c0764f029e8a7901af8874868ce0045
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
