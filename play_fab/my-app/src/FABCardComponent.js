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
            <p><b>Cost:</b>{card.cost} || <b>id:</b>{card.id}</p>
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
        if (turnStepValue === "Attack" || turnStepValue === "Attack2") {
            setSelectedCardValue(card)
            console.log(selectedCardValue)
        } else {
            let nextPitchValue = new Set(pitchCardsSelectedValue)
            if (attackingCardValue && attackingCardValue.id !== card.id) {
                if (pitchCardsSelectedValue.has(card.id)) {
                    nextPitchValue.delete(card.id)
                    setPitchAmountValue(pitchAmountValue - card.pitch)
                } else {
                    nextPitchValue.add(card.id)
                    setPitchAmountValue(pitchAmountValue + card.pitch)
                }
                setPitchCardsSelectedValue(nextPitchValue)
            }
        }
    };

    const highlightRed = (attackingCardValue && attackingCardValue.id === card.id)
    const highlightBlue = (turnStepValue === "Pitch" || turnStepValue === "Pitch2" || turnStepValue === "Pitch3") && pitchCardsSelectedValue.has(card.id)
    const highlightYellow = (turnStepValue === "Attack" || turnStepValue === "Attack2") && (selectedCardValue && selectedCardValue.id == card.id)
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
