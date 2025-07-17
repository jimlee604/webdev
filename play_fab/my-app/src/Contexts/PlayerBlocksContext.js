import { createContext, useContext } from "react";

// a set of cards blocking
export const PlayerBlocksContext = createContext({playerBlocksValue: new Set(), setPlayerBlocksValue:() => {}});

export const usePlayerBlocks = () => useContext(PlayerBlocksContext);