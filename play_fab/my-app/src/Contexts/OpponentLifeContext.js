import { createContext, useContext } from "react";

export const OpponentLifeContext = createContext({opponentLifeValue: 40, setOpponentLifeValue:() => {}});

export const useOpponentLife = () => useContext(OpponentLifeContext);