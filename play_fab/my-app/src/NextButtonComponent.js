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
        if (turnStepValue === "Select Attack" || turnStepValue === "Select Attack 2") {
            if (selectedCardValue == undefined) {
                setTurnStepValue("Select Attack 2")
            } else {
                setAttackingCardValue(selectedCardValue)
                setTurnStepValue("Pitch")
            }
        } else if (turnStepValue === "Pitch" || turnStepValue === "Pitch 2" || turnStepValue === "Attack") {
            if (pitchAmountValue < attackingCardValue.cost) {
                setTurnStepValue("Pitch 2")
            } else {
                setTurnStepValue("Player Attack")
            }
        }
        setTurnValue(!turnValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
