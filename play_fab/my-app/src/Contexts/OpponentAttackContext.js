import { createContext, useContext } from "react";

export class OpponentAttack {
    constructor(attackingCard, pitchedCards) {
        this.attackingCard = attackingCard;
        this.pitchedCards = pitchedCards;
    }
}

export const OpponentAttackContext = createContext({opponentAttackValue: new OpponentAttack(null, new Set()), setOpponentAttackValue:() => {}});

export const useOpponentAttack = () => useContext(OpponentAttackContext);