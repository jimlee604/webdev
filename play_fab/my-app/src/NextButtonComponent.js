import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useAttackingCard } from "./AttackingCardContext";
import { useSelectedCard } from "./SelectedCardContext";

const NextButtonComponent = (props) => {
    const {selectedCardValue} = useSelectedCard()
    const {turnValue, setTurnValue} = usePlayerTurn()
    const {turnStepValue, setTurnStepValue} = useTurnStep()
    const {setAttackingCardValue} = useAttackingCard()
    const handleClick = () => {
        if (turnStepValue === "Attack" || turnStepValue === "Attack2") {
            if (selectedCardValue == undefined) {
                setTurnStepValue("Attack2")
            } else {
                setAttackingCardValue(selectedCardValue)
                setTurnStepValue("Pitch")
            }
        }
        setTurnValue(!turnValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
