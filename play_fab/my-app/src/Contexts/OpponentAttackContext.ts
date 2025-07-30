import { createContext, useContext } from "react";
import Card from "../Classes/Card"

export class OpponentAttack {
    private attackingCard: Card;
    private pitchedCards: Set<Card>;

    constructor(attackingCard: Card, pitchedCards: Set<Card>) {
        this.attackingCard = attackingCard;
        this.pitchedCards = pitchedCards;
    }
}

export const OpponentAttackContext = createContext({opponentAttackValue: new OpponentAttack(new Card(), new Set()), setOpponentAttackValue:() => {}});

export const useOpponentAttack = () => useContext(OpponentAttackContext);