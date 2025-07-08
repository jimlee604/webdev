import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";

const NextButtonComponent = (props) => {

    const {turnValue, setTurnValue} = usePlayerTurn()
    const handleClick = () => {
        setTurnValue(!turnValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
