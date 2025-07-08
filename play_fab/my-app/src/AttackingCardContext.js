import { createContext, useContext } from "react";

// TODO: Change to enum
export const AttackingCardContext = createContext({attackingCardValue: undefined, setAttackingCardValue:() => {}});

export const useAttackingCard = () => useContext(AttackingCardContext);