import { useContext } from "react";
import { ActiveTurnContext } from "./App";

const NextButtonComponent = (props) => {

    const {contextValue, updateContext} = useContext(ActiveTurnContext)
    const handleClick = () => {
        updateContext(!contextValue)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
