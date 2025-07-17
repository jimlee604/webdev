import { createContext, useContext } from "react";

export const PlayerHandContext = createContext({playerHandValue: undefined, setPlayerHandValue:() => {}});

export const usePlayerHand = () => useContext(PlayerHandContext);