import { useAttackingCard } from "./AttackingCardContext";
import { usePitchAmount } from "./PitchAmountContext";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext";
import { useSelectedCard } from "./SelectedCardContext"
import { useTurnStep } from "./TurnStepContext";
import { TurnStep } from "./TurnStep"

const FABCardComponent = (props) => {
    const card = props.card
    const innerComponent = (
        <div>
            <p>
                <b>Cost:</b>{card.cost}
                {/* || <b>id:</b>{card.id} */}
            </p>
            <p><b>Pitch:</b>{card.pitch}</p>
            <p><b>Attack:</b>{card.attack}</p>
            <p><b>Block:</b>{card.block}</p>
        </div>
    )

    const { turnStepValue } = useTurnStep()
    const { pitchCardsSelectedValue, setPitchCardsSelectedValue } = usePitchCardsSelected()
    const { attackingCardValue } = useAttackingCard()
    const { pitchAmountValue, setPitchAmountValue } = usePitchAmount()

    const { selectedCardValue, setSelectedCardValue } = useSelectedCard()
    const handleClick = () => {
        switch (turnStepValue) {
            case TurnStep.SELECT_ATTACK:
            case TurnStep.SELECT_ATTACK_ERROR:
                setSelectedCardValue(card)
                console.log(card)
                break;
            case TurnStep.PITCH:
            case TurnStep.PITCH_ERROR:
                let nextPitchValue = new Set(pitchCardsSelectedValue)
                console.log(attackingCardValue)
                console.log(card)
                if (attackingCardValue && attackingCardValue !== card) {
                    if (pitchCardsSelectedValue.has(card)) {
                        nextPitchValue.delete(card)
                        setPitchAmountValue(pitchAmountValue - card.pitch)
                    } else {
                        nextPitchValue.add(card)
                        setPitchAmountValue(pitchAmountValue + card.pitch)
                    }
                    setPitchCardsSelectedValue(nextPitchValue)
                }
                break;
            case TurnStep.PLAYER_ATTACK:
                break;
            default:
                return;
        }
    };

    let highlightColor;
    switch (turnStepValue) {
        case TurnStep.SELECT_ATTACK:
        case TurnStep.SELECT_ATTACK_ERROR:
            if (selectedCardValue && selectedCardValue.id == card.id) {
                highlightColor = "highlight_yellow"
            }
        case TurnStep.PITCH:
        case TurnStep.PITCH_ERROR:
            if (attackingCardValue && attackingCardValue === card) {
                highlightColor = "highlight_red"
            } else if (pitchCardsSelectedValue.has(card)) {
                highlightColor = "highlight_blue"
            }
        case TurnStep.PLAYER_ATTACK:
            if (attackingCardValue && attackingCardValue === card) {
                highlightColor = "highlight_red"
            }
    }

    return (
        <button className={"FABCard center" + (highlightColor ? " " + highlightColor : "")} onClick={handleClick}>
            {innerComponent}
        </button>
    );
}

export default FABCardComponent;
