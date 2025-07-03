import { useContext } from "react";
import { ActiveTurnContext } from "./App";
import { usePlayerTurn } from "./PlayerTurnContext";

const NextButtonComponent = (props) => {

    const {contextValue, updateContext} = usePlayerTurn()
    const handleClick = () => {
        updateContext(!contextValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
