import { createContext, useContext } from "react";

export const PlayerTurnContext = createContext({turnValue: true, setTurnValue:() => {}});

export const usePlayerTurn = () => useContext(PlayerTurnContext);