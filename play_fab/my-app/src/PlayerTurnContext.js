import { createContext, useContext, useState } from "react";

export const PlayerTurnContext = createContext({value: true, setValue:() => {}});

export const usePlayerTurn = () => useContext(PlayerTurnContext);