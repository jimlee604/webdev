import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";

const NextButtonComponent = (props) => {

    const {turnValue, setTurnValue} = usePlayerTurn()
    const {turnStepValue, setTurnStepValue} = useTurnStep()
    const handleClick = () => {
        if (turnStepValue === "Attack") {
            if (props.selected_id === null) {
                setTurnStepValue("Attack2")
            } else {
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
