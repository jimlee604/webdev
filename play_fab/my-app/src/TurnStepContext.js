import { createContext, useContext } from "react";

// TODO: Change to enum
export const TurnStepContext = createContext({turnStepValue: "Attack", setTurnStepValue:() => {}});

export const useTurnStep = () => useContext(TurnStepContext);