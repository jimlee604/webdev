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
import { useOpponentAttack, OpponentAttack } from "../Contexts/OpponentAttackContext";
import { usePlayerLife } from "../Contexts/PlayerLifeContext";
import { usePlayerBlocks } from "../Contexts/PlayerBlocksContext";

const NextButtonComponent = (props) => {
    const { selectedCardValue, setSelectedCardValue } = useSelectedCard();
    const { setPlayerTurnValue } = usePlayerTurn();
    const { turnStepValue, setTurnStepValue } = useTurnStep();
    const { attackingCardValue, setAttackingCardValue } = useAttackingCard();
    const { pitchCardsSelectedValue, setPitchCardsSelectedValue } = usePitchCardsSelected();
    const { pitchAmountValue, setPitchAmountValue } = usePitchAmount();
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
                console.log(selectedCardValue)
                if (selectedCardValue == undefined) {
                    setTurnStepValue(TurnStep.SELECT_ATTACK_ERROR)
                } else {
                    setAttackingCardValue(selectedCardValue)
                    setSelectedCardValue(undefined)
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
                setOpponentLifeValue(Math.max(opponentLifeValue - netDamage, 0))
                setTurnStepValue(TurnStep.OPPONENT_TAKE_DAMAGE)
                break;
            }
            case TurnStep.OPPONENT_TAKE_DAMAGE:{
                if (opponentLifeValue == 0) {
                    setTurnStepValue(TurnStep.PLAYER_WIN);
                    break;
                }
                setPlayerTurnValue(false)
                const newPlayerHand = new Hand(playerHandValue.cards, true);
                const indexToRemove = newPlayerHand.cards.indexOf(attackingCardValue)
                newPlayerHand.cards.splice(indexToRemove, 1)
                newPlayerHand.refill()
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                for (const card of opponentBlocksValue) {
                    const indexToRemove = newOpponentHand.cards.indexOf(card)
                    newOpponentHand.cards.splice(indexToRemove, 1)
                }
                // temporary: refill all hands
                opponentHandValue.refill()
                setPitchCardsSelectedValue(new Set())
                setPitchAmountValue(0)
                setPlayerHandValue(newPlayerHand)
                setOpponentHandValue(newOpponentHand)
                console.log("about to reset attacking card value")
                setAttackingCardValue(undefined)
                setOpponentBlocksValue(new Set())
                setTurnStepValue(TurnStep.OPPONENT_START_TURN);
                break;
            }
            case TurnStep.OPPONENT_START_TURN:
                setTurnStepValue(TurnStep.OPPONENT_ATTACK)
                setOpponentAttackValue(computeOpponentAttacksAndPitches(opponentHandValue))
                break;
            case TurnStep.OPPONENT_ATTACK:{
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                for (const pitchedCard of opponentAttackValue.pitchedCards) {
                    const indexToRemove = newOpponentHand.cards.indexOf(pitchedCard)
                    newOpponentHand.cards.splice(indexToRemove, 1)
                }
                setOpponentHandValue(newOpponentHand);
                setTurnStepValue(TurnStep.PLAYER_BLOCK);
                break;
            }
            case TurnStep.PLAYER_BLOCK: {
                const netDamage = Math.max((opponentAttackValue.attackingCard.attack - computeTotalBlocks(playerBlocksValue)), 0)
                setPlayerLifeValue(Math.max(playerLifeValue - netDamage, 0))
                setTurnStepValue(TurnStep.PLAYER_TAKE_DAMAGE);
                break;
            }
            case TurnStep.PLAYER_TAKE_DAMAGE: {
                if (playerLifeValue == 0) {
                    setTurnStepValue(TurnStep.PLAYER_LOSE)
                    break;
                }
                setTurnStepValue(TurnStep.PLAYER_TURN_START)
                const newOpponentHand = new Hand(opponentHandValue.cards, false);
                const indexToRemove = newOpponentHand.cards.indexOf(opponentAttackValue.attackingCard)
                newOpponentHand.cards.splice(indexToRemove, 1)
                newOpponentHand.refill();
                setOpponentHandValue(newOpponentHand);
                const newPlayerHand  = new Hand(playerHandValue.cards, true)
                for (const card of playerBlocksValue) {
                    const indexToRemove = newPlayerHand.cards.indexOf(card)
                    newPlayerHand.cards.splice(indexToRemove, 1)
                }
                // temporary: refill all hands
                console.log("player hand after blocks: ")
                console.log(newPlayerHand)
                newPlayerHand.refill()
                setPlayerBlocksValue(new Set());
                setPlayerHandValue(newPlayerHand);
                setOpponentAttackValue(new OpponentAttack(null, new Set()));
                setPlayerTurnValue(true)
                setTurnStepValue(TurnStep.PLAYER_TURN_START);
                break;
            }
            case TurnStep.PLAYER_TURN_START: {
                setTurnStepValue(TurnStep.SELECT_ATTACK)
                break;
            }
            case TurnStep.PLAYER_WIN:
            case TurnStep.PLAYER_LOSE:
            case TurnStep.UNKNOWN_STATE:
                break;
        }
    };

    return (
        <button onClick={handleClick} className="next_button">NEXT</button>
    );
}

export default NextButtonComponent;
