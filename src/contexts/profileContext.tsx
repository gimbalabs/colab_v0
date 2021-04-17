/**
 * @name dataContext
 * @desc Context container for the data
 */
import React, { useState, createContext } from "react";
import { BioState } from "../interfaces/profileInterface";

export const initialState: BioState = {
  alias: "Batman",
  aboutURL: "",
  imageURL: "",
  timeClockLengthMin: null,
  timeBlockCostADA: null,
  setAlias: () => {},
  setAboutURL: () => {},
  setImageURL: () => {},
  setTimeClockLengthMin: () => {},
  setTimeBlockCostADA: () => {}
};

export const globalContext = createContext<BioState>(initialState);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: React.FC = ({ children }: Props) => {
  const [alias, setAlias] = useState<string>("");
  const [aboutURL, setAboutURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [timeClockLengthMin, setTimeClockLengthMin] = useState<number | null>(
    null
  );
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<number | null>(null);

  return (
    <globalContext.Provider
      value={{
        alias,
        aboutURL,
        imageURL,
        timeClockLengthMin,
        timeBlockCostADA,
        setAlias,
        setAboutURL,
        setImageURL,
        setTimeClockLengthMin,
        setTimeBlockCostADA
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
