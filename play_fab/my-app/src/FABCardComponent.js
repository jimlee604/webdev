const FABCardComponent = (props) => {
    const innerComponent = (
        <div>
            <p><b>Cost:</b>2</p>
            <p><b>Pitch:</b>1</p>
            <p><b>Attack:</b>4</p>
            <p><b>Block:</b>3</p>
        </div>
    )
    return (
        props.playerOwned ?
            (<button class="FABCard center">
                {innerComponent}
                <p>player owned</p>
            </button>)
            :
            (<div class="FABCard center">
                {innerComponent}
                <p>not not not</p>
            </div>)
    );
}

export default FABCardComponent;
