import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useAttackingCard } from "./AttackingCardContext";
import { useSelectedCard } from "./SelectedCardContext";
import { usePitchAmount } from "./PitchAmountContext";

const NextButtonComponent = (props) => {
    const {selectedCardValue} = useSelectedCard()
    const {turnValue, setTurnValue} = usePlayerTurn()
    const {turnStepValue, setTurnStepValue} = useTurnStep()
    const {attackingCardValue, setAttackingCardValue} = useAttackingCard()
    const {pitchAmountValue} = usePitchAmount()
    const handleClick = () => {
        if (turnStepValue === "Attack" || turnStepValue === "Attack2") {
            if (selectedCardValue == undefined) {
                setTurnStepValue("Attack2")
            } else {
                setAttackingCardValue(selectedCardValue)
                setTurnStepValue("Pitch")
            }
        } else if (turnStepValue === "Pitch" || turnStepValue === "Pitch2" || turnStepValue === "Pitch3") {
            if (pitchAmountValue < attackingCardValue.cost) {
                setTurnStepValue("Pitch2")
            } else {
                setTurnStepValue("Pitch3")
            }
        }
        setTurnValue(!turnValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
