import { createContext, useContext } from "react";

export const PitchAmountContext = createContext({value: 0, setValue:() => {}});

export const usePitchAmount = () => useContext(PitchAmountContext);