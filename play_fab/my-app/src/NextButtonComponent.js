import { usePlayerTurn } from "./PlayerTurnContext";

const NextButtonComponent = (props) => {
    const {value, setValue} = usePlayerTurn()
    const handleClick = () => {
        setValue(!value)
    };

    return (
        <button onClick={handleClick} className="next_button">Next</button>
    );
}

export default NextButtonComponent;
