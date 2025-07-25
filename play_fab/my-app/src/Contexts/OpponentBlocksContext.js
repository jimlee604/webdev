import { createContext, useContext } from "react";

export const OpponentBlocksContext = createContext({opponentBlocksValue: new Set(), setOpponentBlocksValue:() => {}});

export const useOpponentBlocks = () => useContext(OpponentBlocksContext);