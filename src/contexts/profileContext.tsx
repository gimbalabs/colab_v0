/**
 * @name dataContext
 * @desc Context container for the data
 */
import React, { useState, createContext } from "react";
import { BioState } from "interfaces/profileInterface";

export const initialState: BioState = {
  alias: "Batmanzzzzz",
  aboutURL: "",
  imageURL: "",
  timeBlockLengthMin: 15,
  timeBlockCostADA: 20,
  setAlias: () => {},
  setAboutURL: () => {},
  setImageURL: () => {},
  setTimeBlockLengthMin: () => {},
  setTimeBlockCostADA: () => {},
};

export const globalContext = createContext<BioState>(initialState);

export const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [alias, setAlias] = useState<string>("");
  const [aboutURL, setAboutURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [timeBlockLengthMin, setTimeBlockLengthMin] = useState<number | null>(
    null
  );
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<number | null>(null);

  return (
    <globalContext.Provider
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
    </globalContext.Provider>
  );
};
