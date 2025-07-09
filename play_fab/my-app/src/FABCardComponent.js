import { useAttackingCard } from "./AttackingCardContext.js";
import { usePitchAmount } from "./PitchAmountContext.js";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext.js";
import { useSelectedCard } from "./SelectedCardContext.js"
import { useTurnStep } from "./TurnStepContext.js";
import { useState } from "react";
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
            case "Select Attack":
            case "Select Attack 2":
                setSelectedCardValue(card)
                console.log(card)
                break;
            case "Pitch":
            case "Pitch 2":
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
            case "PlayerAttack":
                break;
            default:
                return;
        }
};
const highlightRed = (attackingCardValue && attackingCardValue === card)
const highlightBlue = (turnStepValue === "Pitch" || turnStepValue === "Pitch 2" || turnStepValue === "Player Attack") && pitchCardsSelectedValue.has(card)
const highlightYellow = (turnStepValue === "Select Attack" || turnStepValue === "Select Attack 2") && (selectedCardValue && selectedCardValue.id == card.id)
return (
    card.playerOwned ?
        (<button className={("FABCard center" + (highlightRed ? " highlight_red" : (highlightBlue ? " highlight_blue" : (highlightYellow ? " highlight_yellow" : ""))))} onClick={handleClick}>
            {innerComponent}
        </button>)
        :
        (<div className="FABCard center">
            {innerComponent}
        </div>)
);
}

export default FABCardComponent;
