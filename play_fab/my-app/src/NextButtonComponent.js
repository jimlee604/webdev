import { useContext } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useAttackingCard } from "./AttackingCardContext";
import { useSelectedCard } from "./SelectedCardContext";
import { usePitchAmount } from "./PitchAmountContext";
import { usePitchCardsSelected } from "./PitchCardsSelectedContext";
import { usePlayerHand } from "./PlayerHandContext";
import Hand from "./Hand";
import { TurnStep } from "./TurnStep"
import { computeBlockIndices } from "./Utils";
import { useOpponentHand } from "./OpponentHandContext";
import { useOpponentBlocks } from "./OpponentBlocksContext";

const NextButtonComponent = (props) => {
    const { selectedCardValue } = useSelectedCard()
    const { turnValue, setTurnValue } = usePlayerTurn()
    const { turnStepValue, setTurnStepValue } = useTurnStep()
    const { attackingCardValue, setAttackingCardValue } = useAttackingCard();
    const { pitchCardsSelectedValue } = usePitchCardsSelected()
    const { pitchAmountValue } = usePitchAmount()
    const { playerHandValue, setPlayerHandValue } = usePlayerHand()
    const { opponentHandValue } = useOpponentHand()
    const {setOpponentBlocksValue} = useOpponentBlocks()
    const handleClick = () => {
        switch (turnStepValue) {
            case TurnStep.SELECT_ATTACK:
            case TurnStep.SELECT_ATTACK_ERROR:
                if (selectedCardValue == undefined) {
                    setTurnStepValue(TurnStep.SELECT_ATTACK)
                } else {
                    setAttackingCardValue(selectedCardValue)
                    setTurnStepValue(TurnStep.PITCH)
                }
                break;
            case TurnStep.PITCH:
            case TurnStep.PITCH_ERROR:
                if (pitchAmountValue < attackingCardValue.cost) {
                    setTurnStepValue(TurnStep.PITCH_ERROR)
                } else {
                    setTurnStepValue(TurnStep.PLAYER_ATTACK)
                    const newPlayerHand = new Hand(playerHandValue.cards, true);
                    for (const pitchedCard of pitchCardsSelectedValue) {
                        const indexToRemove = newPlayerHand.cards.indexOf(pitchedCard)
                        newPlayerHand.cards.splice(indexToRemove, 1)
                    }
                    setPlayerHandValue(newPlayerHand)
                }
                break;
            case TurnStep.PLAYER_ATTACK:
                // make opp block
                const blockIndices = computeBlockIndices();
                console.log(blockIndices)
                const blockCards = new Set();
                for (const blockIndex of blockIndices) {
                    console.log(blockIndex)
                    blockCards.add(opponentHandValue.cards[blockIndex]);
                }
                setOpponentBlocksValue(blockCards);
                console.log("going to opp block");
                setTurnStepValue(TurnStep.OPPONENT_BLOCK);
                break;
            case TurnStep.OPPONENT_BLOCK:
                break;
        }
    };

    return (
        <button onClick={handleClick} className="next_button">NEXT</button>
    );
}

export default NextButtonComponent;
