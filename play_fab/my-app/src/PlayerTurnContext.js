import { createContext, useContext } from "react";

export const PlayerTurnContext = createContext({value: true, setValue:() => {}});

export const usePlayerTurn = () => useContext(PlayerTurnContext);