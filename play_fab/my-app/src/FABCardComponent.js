import { useSelectedCard } from "./SelectedCardContext.js"

const FABCardComponent = (props) => {
    const innerComponent = (
        <div>
            <p><b>Cost:</b>2</p>
            <p><b>Pitch:</b>1</p>
            <p><b>Attack:</b>4</p>
            <p><b>Block:</b>3</p>
        </div>
    )

    const {value, setValue} = useSelectedCard()
        const handleClick = () => {
          setValue(props.id)
    };
    const highlight = props.id === value
    
    return (
        props.playerOwned ?
            (<button class={("FABCard center" + (highlight ? " highlight" : ""))} onClick={handleClick}>
                {innerComponent}
            </button>)
            :
            (<div class="FABCard center">
                {innerComponent}
            </div>)
    );
}

export default FABCardComponent;
