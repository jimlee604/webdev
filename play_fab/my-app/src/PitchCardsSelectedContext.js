import { createContext, useContext } from "react";

// TODO: Change to enum
export const PitchCardsSelectedContext = createContext({pitchCardsSelectedValue: new Set(), setPitchCardsSelectedValue:() => {}});

export const usePitchCardsSelected = () => useContext(PitchCardsSelectedContext);