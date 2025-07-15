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
import { computeBlockIndices, computeTotalBlocks } from "./Utils";
import { useOpponentHand } from "./OpponentHandContext";
import { useOpponentBlocks } from "./OpponentBlocksContext";
import { useOpponentLife } from "./OpponentLifeContext"

const NextButtonComponent = (props) => {
    const { selectedCardValue } = useSelectedCard()
    const { turnValue, setTurnValue } = usePlayerTurn()
    const { turnStepValue, setTurnStepValue } = useTurnStep()
    const { attackingCardValue, setAttackingCardValue } = useAttackingCard();
    const { pitchCardsSelectedValue } = usePitchCardsSelected()
    const { pitchAmountValue } = usePitchAmount()
    const { playerHandValue, setPlayerHandValue } = usePlayerHand()
    const { opponentHandValue } = useOpponentHand()
    const { opponentBlocksValue, setOpponentBlocksValue} = useOpponentBlocks()
    const { opponentLifeValue, setOpponentLifeValue} = useOpponentLife()
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
                const blockCards = new Set();
                for (const blockIndex of blockIndices) {
                    blockCards.add(opponentHandValue.cards[blockIndex]);
                }
                setOpponentBlocksValue(blockCards);
                setTurnStepValue(TurnStep.OPPONENT_BLOCK);
                break;
            case TurnStep.OPPONENT_BLOCK:
                console.log("raw blocks value")
                console.log(opponentBlocksValue)
                console.log("computed blocks: " + computeTotalBlocks(opponentBlocksValue))
                const netDamage = Math.max((attackingCardValue.attack - computeTotalBlocks(opponentBlocksValue)), 0)
                setOpponentLifeValue(opponentLifeValue - netDamage)
                setTurnStepValue(TurnStep.OPPONENT_TAKE_DAMAGE);
                break;
            case TurnStep.OPPONENT_TAKE_DAMAGE:
                setTurnStepValue(TurnStep.UNKNOWN_STATE)
                break;
            case TurnStep.UNKNOWN_STATE:
                break;
        }
    };

    return (
        <button onClick={handleClick} className="next_button">NEXT</button>
    );
}

export default NextButtonComponent;
