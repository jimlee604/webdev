import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useAttackingCard } from "./AttackingCardContext";
import { useSelectedCard } from "./SelectedCardContext";
import { usePitchAmount } from "./PitchAmountContext";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext";
import { usePlayerHand } from "./PlayerHandContext";
import Hand from "./Hand";

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
            case "Select Attack":
            case "Select Attack 2":
                if (selectedCardValue == undefined) {
                    setTurnStepValue("Select Attack 2")
                } else {
                    setAttackingCardValue(selectedCardValue)
                    setTurnStepValue("Pitch")
                }
                break;
            case "Pitch":
            case "Pitch 2":
                if (pitchAmountValue < attackingCardValue.cost) {
                    setTurnStepValue("Pitch 2")
                } else {
                    setTurnStepValue("Player Attack")
                    const newPlayerHand = new Hand(playerHandValue.cards, true);
                    for (const pitchedCard of pitchCardsSelectedValue) {
                        newPlayerHand.cards.pop(pitchedCard)
                    }
                    setPlayerHandValue(newPlayerHand)
                }
                break;
            case "Player Attack":
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
