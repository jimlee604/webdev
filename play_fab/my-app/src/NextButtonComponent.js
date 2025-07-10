import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useAttackingCard } from "./AttackingCardContext";
import { useSelectedCard } from "./SelectedCardContext";
import { usePitchAmount } from "./PitchAmountContext";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext";
import { usePlayerHand } from "./PlayerHandContext";
import Hand from "./Hand";
import { TurnStep } from "./TurnStep.js"

const NextButtonComponent = (props) => {
    const { selectedCardValue } = useSelectedCard()
    const { turnValue, setTurnValue } = usePlayerTurn()
    const { turnStepValue, setTurnStepValue } = useTurnStep()
    const { attackingCardValue, setAttackingCardValue } = useAttackingCard();
    const { pitchCardsSelectedValue } = usePitchCardsSelected()
    const { pitchAmountValue } = usePitchAmount()
    const { playerHandValue, setPlayerHandValue } = usePlayerHand()
    const handleClick = () => {
        switch (turnStepValue) {
            case TurnStep.SELECT_ATTACK:
            case TurnStep.SELECT_ATTACK_ERROR:
                if (selectedCardValue == undefined) {
                    setTurnStepValue(TurnStep.SELECT_ATTACK)
                } else {
                    setAttackingCardValue(selectedCardValue)
                    setTurnStepValue(TurnStep.PITCH)
                }
                break;
            case TurnStep.PITCH:
            case TurnStep.PITCH_ERROR:
                if (pitchAmountValue < attackingCardValue.cost) {
                    setTurnStepValue(TurnStep.PITCH_ERROR)
                } else {
                    setTurnStepValue(TurnStep.PLAYER_ATTACK)
                    const newPlayerHand = new Hand(playerHandValue.cards, true);
                    for (const pitchedCard of pitchCardsSelectedValue) {
                        newPlayerHand.cards.pop(pitchedCard)
                    }
                    setPlayerHandValue(newPlayerHand)
                }
                break;
            case TurnStep.PLAYER_ATTACK:
                break;
            default:
                return
        }
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
