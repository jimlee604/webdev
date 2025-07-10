import { useAttackingCard } from "./AttackingCardContext"
import { TurnStep } from "./TurnStep"

const InstructionComponent = (props) => {
    const {attackingCardValue} = useAttackingCard()
    switch (props.turn_step) {
        case TurnStep.SELECT_ATTACK:
            return (
                <p>Choose an Attack card.</p>
            )
        case TurnStep.SELECT_ATTACK_ERROR:
            return (
                <p>Please choose an Attack card first.</p>
            )
        case TurnStep.PITCH:
            return (
                <p>Please select cards to pay 2 resources.</p>
            )
        case TurnStep.PITCH_ERROR:
            return (
                <p>Not enough resources pitched.<br/> Please select cards to pay {attackingCardValue.cost} resources.</p>
            )
        case TurnStep.PLAYER_ATTACK:
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
