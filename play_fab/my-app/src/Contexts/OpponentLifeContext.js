import { createContext, useContext } from "react";

export const OpponentLifeContext = createContext({opponentLifeValue: 20, setOpponentLifeValue:() => {}});

export const useOpponentLife = () => useContext(OpponentLifeContext);