import { usePlayerTurn } from "../Contexts/PlayerTurnContext";
import { useTurnStep } from "../Contexts/TurnStepContext";
import { useAttackingCard } from "../Contexts/AttackingCardContext";
import { useSelectedCard } from "../Contexts/SelectedCardContext";
import { usePitchAmount } from "../Contexts/PitchAmountContext";
import { usePitchCardsSelected } from "../Contexts/PitchCardsSelectedContext";
import { usePlayerHand } from "../Contexts/PlayerHandContext";
import Hand from "../Classes/Hand";
import { TurnStep } from "../Classes/TurnStep"
import { computeBlockIndices, computeTotalBlocks, computeOpponentAttacksAndPitches} from "../Utils";
import { useOpponentHand } from "../Contexts/OpponentHandContext";
import { useOpponentBlocks } from "../Contexts/OpponentBlocksContext";
import { useOpponentLife } from "../Contexts/OpponentLifeContext"
import { useOpponentAttack } from "../Contexts/OpponentAttackContext";
import { usePlayerLife } from "../Contexts/PlayerLifeContext";
import { usePlayerBlocks } from "../Contexts/PlayerBlocksContext";

const NextButtonComponent = (props) => {
    const { selectedCardValue } = useSelectedCard();
    const { setPlayerTurnValue } = usePlayerTurn();
    const { turnStepValue, setTurnStepValue } = useTurnStep();
    const { attackingCardValue, setAttackingCardValue } = useAttackingCard();
    const { pitchCardsSelectedValue } = usePitchCardsSelected();
    const { pitchAmountValue } = usePitchAmount();
    const { playerHandValue, setPlayerHandValue } = usePlayerHand();
    const { opponentHandValue, setOpponentHandValue } = useOpponentHand();
    const { opponentBlocksValue, setOpponentBlocksValue} = useOpponentBlocks();
    const { opponentLifeValue, setOpponentLifeValue} = useOpponentLife();
    const { opponentAttackValue, setOpponentAttackValue } = useOpponentAttack()
    const { playerLifeValue, setPlayerLifeValue} = usePlayerLife();
    const { playerBlocksValue, setPlayerBlocksValue } = usePlayerBlocks()

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
            case TurnStep.PLAYER_ATTACK: {
                // make opp block
                const blockIndices = computeBlockIndices();
                const blockCards = new Set();
                for (const blockIndex of blockIndices) {
                    blockCards.add(opponentHandValue.cards[blockIndex]);
                }
                setOpponentBlocksValue(blockCards);
                setTurnStepValue(TurnStep.OPPONENT_BLOCK);
                break;
            }
            case TurnStep.OPPONENT_BLOCK: {
                const netDamage = Math.max((attackingCardValue.attack - computeTotalBlocks(opponentBlocksValue)), 0)
                setOpponentLifeValue(opponentLifeValue - netDamage)
                setTurnStepValue(TurnStep.OPPONENT_TAKE_DAMAGE);
                break;
            }
            case TurnStep.OPPONENT_TAKE_DAMAGE:
                setTurnStepValue(TurnStep.OPPONENT_START_TURN)
                setPlayerTurnValue(false)
                const newPlayerHand = new Hand(playerHandValue.cards, true);
                newPlayerHand.refill()
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                for (const card of opponentBlocksValue) {
                    // try .delete?
                    const indexToRemove = newOpponentHand.cards.indexOf(card)
                    newOpponentHand.cards.splice(indexToRemove, 1)
                }
                setPlayerHandValue(newPlayerHand)
                setOpponentHandValue(newOpponentHand)
                setOpponentBlocksValue(new Set())
                break;
            case TurnStep.OPPONENT_START_TURN:
                setTurnStepValue(TurnStep.OPPONENT_ATTACK)
                setOpponentAttackValue(computeOpponentAttacksAndPitches(opponentHandValue))
                break;
            case TurnStep.OPPONENT_ATTACK:{
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                for (const pitchedCard of opponentAttackValue.pitchedCards) {
                    // try .delete?
                    const indexToRemove = newOpponentHand.cards.indexOf(pitchedCard)
                    newOpponentHand.cards.splice(indexToRemove, 1)
                }
                setOpponentHandValue(newOpponentHand);
                setTurnStepValue(TurnStep.PLAYER_BLOCK);
                break;
            }
            case TurnStep.PLAYER_BLOCK: {
                setTurnStepValue(TurnStep.PLAYER_TAKE_DAMAGE);
                const netDamage = Math.max((opponentAttackValue.attackingCard.attack - computeTotalBlocks(playerBlocksValue)), 0)
                console.log(playerLifeValue);
                console.log(netDamage);
                setPlayerLifeValue(playerLifeValue - netDamage)
                break;
            }
            case TurnStep.PLAYER_TAKE_DAMAGE: {
                setTurnStepValue(TurnStep.PLAYER_TURN_START)
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                newOpponentHand.refill();
                setOpponentHandValue(newOpponentHand);
                const newPlayerHand  = new Hand(playerHandValue.cards)
                for (const card of playerBlocksValue) {
                    const indexToRemove = newPlayerHand.cards.indexOf(card)
                    newPlayerHand.cards.splice(indexToRemove, 1)
                }
                setPlayerBlocksValue(new Set());
                setPlayerHandValue(newPlayerHand);
                break;
            }
            case TurnStep.PLAYER_TURN_START:
                setTurnStepValue(TurnStep.SELECT_ATTACK)
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
