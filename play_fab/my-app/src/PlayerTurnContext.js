import { createContext, useContext } from "react";

const PlayerTurnContext = createContext(true);

export const PlayerTurnProvider = ({children}) => {
    return <PlayerTurnContext.Provider value={true}>{children}</PlayerTurnContext.Provider>;
}

export const usePlayerTurn = () => useContext(PlayerTurnContext);