import { createContext, useContext } from "react";
import { STARTING_LIFE_TOTAL } from "../Utils"

export const PlayerLifeContext = createContext({playerLifeValue: STARTING_LIFE_TOTAL, setPlayerLifeValue:() => {}});

export const usePlayerLife = () => useContext(PlayerLifeContext);