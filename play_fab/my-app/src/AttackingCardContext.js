import { createContext, useContext } from "react";

export const AttackingCardContext = createContext({attackingCardValue: undefined, setAttackingCardValue:() => {}});

export const useAttackingCard = () => useContext(AttackingCardContext);