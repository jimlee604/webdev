import Hand from "./Hand";
import { createContext, useContext } from "react";

export const OpponentHandContext = createContext({opponentHandValue:undefined, setOpponentHandValue:() => {}});

export const useOpponentHand = () => useContext(OpponentHandContext);