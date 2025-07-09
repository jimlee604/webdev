import { useAttackingCard } from "./AttackingCardContext"

const InstructionComponent = (props) => {
    const {attackingCardValue} = useAttackingCard()
    switch (props.turn_step) {
        case "Select Attack":
            return (
                <p>Choose an Attack card.</p>
            )
        case "Select Attack 2":
            return (
                <p>Please choose an Attack card first.</p>
            )
        case "Pitch":
            return (
                <p>Please select cards to pay 2 resources.</p>
            )
        case "Pitch 2":
            return (
                <p>Not enough resources pitched.<br/> Please select cards to pay {attackingCardValue.cost} resources.</p>
            )
        case "Player Attack":
            return (
                <p>Attacking for {attackingCardValue.attack}. Pitched cards go to the bottom.</p>
            )
        default:
            return (
                <p>Unknown game state.</p>
            )
    }
}

export default InstructionComponent;
