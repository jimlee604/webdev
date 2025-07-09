import { useAttackingCard } from "./AttackingCardContext"

const InstructionComponent = (props) => {
    const {attackingCardValue} = useAttackingCard()
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
        case "Pitch2":
            return (
                <p>Not enough resources pitched.<br/> Please select cards to pay {attackingCardValue.cost} resources.</p>
            )
        case "Pitch3":
            return (
                <p>Successfully launched attack. </p>
            )
        default:
            return (
                <p>Unknown game state.</p>
            )
    }
}

export default InstructionComponent;
