import { createContext, useContext } from "react";

// a set of cards blocking
export const OpponentBlocksContext = createContext({opponentBlocksValue: new Set(), setOpponentBlocksValue:() => {}});

export const useOpponentBlocks = () => useContext(OpponentBlocksContext);