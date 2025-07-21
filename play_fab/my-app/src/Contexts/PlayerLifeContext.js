import { createContext, useContext } from "react";

export const PlayerLifeContext = createContext({playerLifeValue: 20, setPlayerLifeValue:() => {}});

export const usePlayerLife = () => useContext(PlayerLifeContext);