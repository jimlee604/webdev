import { createContext, useContext } from "react";

export const PlayerBlocksContext = createContext({playerBlocksValue: new Set(), setPlayerBlocksValue:() => {}});

export const usePlayerBlocks = () => useContext(PlayerBlocksContext);