import { createContext, useContext } from "react";

export const PitchCardsSelectedContext = createContext({pitchCardsSelectedValue: new Set(), setPitchCardsSelectedValue:() => {}});

export const usePitchCardsSelected = () => useContext(PitchCardsSelectedContext);