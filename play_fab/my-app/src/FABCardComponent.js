import { useAttackingCard } from "./AttackingCardContext.js";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext.js";
import { useSelectedCard } from "./SelectedCardContext.js"
import { useTurnStep } from "./TurnStepContext.js";
import { useState } from "react";
const FABCardComponent = (props) => {
    const innerComponent = (
        <div>
            <p><b>Cost:</b>2 || <b>id:</b>{props.id}</p>
            <p><b>Pitch:</b>1</p>
            <p><b>Attack:</b>4</p>
            <p><b>Block:</b>3</p>
        </div>
    )

    const { turnStepValue } = useTurnStep()
    const { pitchCardsSelectedValue, setPitchCardsSelectedValue } = usePitchCardsSelected()
    const { attackingCardValue } = useAttackingCard()

    const { selectedCardValue, setSelectedCardValue } = useSelectedCard()
    const handleClick = () => {
        setSelectedCardValue(props.id)
        let nextPitchValue = new Set(pitchCardsSelectedValue)
        if (attackingCardValue && attackingCardValue !== props.id) {
            if (pitchCardsSelectedValue.has(props.id)) {
                nextPitchValue.delete(props.id)
            } else {
                nextPitchValue.add(props.id)
            }
            setPitchCardsSelectedValue(nextPitchValue)
        }
    };

    const highlightRed = (props.id === attackingCardValue)
    const highlightBlue = (turnStepValue === "Pitch") && pitchCardsSelectedValue.has(props.id)
    const highlightYellow = (turnStepValue === "Attack" || turnStepValue === "Attack2") && props.id === selectedCardValue
    return (
        props.playerOwned ?
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
