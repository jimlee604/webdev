import { createContext, useContext } from "react";
import { STARTING_LIFE_TOTAL } from "../Utils"

export const OpponentLifeContext = createContext({opponentLifeValue: STARTING_LIFE_TOTAL, setOpponentLifeValue:() => {}});

export const useOpponentLife = () => useContext(OpponentLifeContext);