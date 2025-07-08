import { useSelectedCard } from "./SelectedCardContext.js"
import { useTurnStep } from "./TurnStepContext.js";

const FABCardComponent = (props) => {
    const innerComponent = (
        <div>
            <p><b>Cost:</b>2 || <b>id:</b>{props.id}</p>
            <p><b>Pitch:</b>1</p>
            <p><b>Attack:</b>4</p>
            <p><b>Block:</b>3</p>
        </div>
    )

    const {selectedCardValue, setSelectedCardValue} = useSelectedCard()
        const handleClick = () => {
            setSelectedCardValue(props.id)
    };

    const {turnStepValue} = useTurnStep()

    const highlightRed = (props.id === selectedCardValue && turnStepValue === "Pitch")
    const highlightYellow = !highlightRed && props.id === selectedCardValue
    console.log("test")
    
    return (
        props.playerOwned ?
            (<button className={("FABCard center" + (highlightRed ? " highlight_red" : (highlightYellow ? " highlight_yellow" : "")))} onClick={handleClick}>
                {innerComponent}
            </button>)
            :
            (<div className="FABCard center">
                {innerComponent}
            </div>)
    );
}

export default FABCardComponent;
