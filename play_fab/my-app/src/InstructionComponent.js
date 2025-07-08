const InstructionComponent = (props) => {
    switch (props.turn_step) {
        case "Attack":
            return (
                <p>Choose an Attack card.</p>
            )
        case "Attack2":
            return (
                <p>Please choose an Attack card first.</p>
            )
        case "Pitch":
            return (
                <p>Please select cards to pay 2 resources.</p>
            )
        default:
            return (
                <p>Unknown game state.</p>
            )
    }
}

export default InstructionComponent;
