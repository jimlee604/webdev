import { createContext, useContext } from "react";

export const PlayerLifeContext = createContext({playerLifeValue: 40, setPlayerLifeValue:() => {}});

export const usePlayerLife = () => useContext(PlayerLifeContext);