import { useAttackingCard } from "../Contexts/AttackingCardContext"
import { TurnStep } from "../Classes/TurnStep"
import { BrowserView, MobileView } from 'react-device-detect';
import { useOpponentBlocks } from "../Contexts/OpponentBlocksContext";
import { computeTotalBlocks } from "../Utils"
import { useOpponentAttack } from "../Contexts/OpponentAttackContext";
import { usePlayerBlocks } from "../Contexts/PlayerBlocksContext";

const TapNextWrapper = (innerComponent) => {
    return (
        <>
            <BrowserView>
                {innerComponent}
                <p>Click NEXT</p>
            </BrowserView>
            <MobileView>
                {innerComponent}
                <p>Tap NEXT</p>
            </MobileView>
        </>
    )
}

const InstructionComponent = (props) => {
    const { attackingCardValue } = useAttackingCard()
    const { opponentBlocksValue } = useOpponentBlocks()
    const { opponentAttackValue } = useOpponentAttack()
    const { playerBlocksValue } = usePlayerBlocks()

    let opponentBlockAmount = 0;
    for (const block of opponentBlocksValue) {
        opponentBlockAmount += block.block;
    }

    let playerBlockAmount = 0;
    for (const block of playerBlocksValue) {
        playerBlockAmount += block.block;
    }

    switch (props.turn_step) {
        case TurnStep.SELECT_ATTACK: {
            return (
                <p>Choose an Attack card.</p>
            )
        }
        case TurnStep.SELECT_ATTACK_ERROR: {
            return (
                <p>Please choose an Attack card first.</p>
            )
        }
        case TurnStep.PITCH: {
            return (
                <p>Please select cards to pay {attackingCardValue.cost} resources.</p>
            )
        }
        case TurnStep.PITCH_ERROR: {
            return (
                <p>Not enough resources pitched.<br /> Please select cards to pay {attackingCardValue.cost} resources.</p>
            )
        }
        case TurnStep.PLAYER_ATTACK: {
            const mainText = (
                <p>Attacking for <b>{attackingCardValue.attack}</b>.<br /> Pitched cards go to the bottom.</p>
            )
            return TapNextWrapper(mainText)
        }
        case TurnStep.OPPONENT_BLOCK: {
            const mainText = (
                <p>Attacking for <b>{attackingCardValue.attack}</b>.<br />
                    Pitched cards go to the bottom.<br />
                    Opponent blocks for <b>{opponentBlockAmount}</b>.
                </p>
            )
            return (
                <>
                    <BrowserView>
                        {mainText}
                        <p>Click NEXT</p>
                    </BrowserView>
                    <MobileView>
                        {mainText}
                        <p>Tap NEXT</p>
                    </MobileView>
                </>
            )
        }
        case TurnStep.OPPONENT_TAKE_DAMAGE: {
            const netDamage = Math.max(attackingCardValue.attack - opponentBlockAmount, 0)
            // netDamage = attackingCardValue.attack - blockAmount
            const mainText = (
                <p>Attacking for <b>{attackingCardValue.attack}</b>.<br />
                    Pitched cards go to the bottom.<br />
                    Opponent blocks for <b>{opponentBlockAmount}</b>.<br />
                    Opponent takes <b>{netDamage}</b> damage.
                </p>
            )
            return TapNextWrapper(mainText);
        }
        case TurnStep.OPPONENT_START_TURN: {
            const mainText = (
                <p> Blocking cards go to discard.<br />
                    Both players draw back up to <b>4</b>.<br/>
                    Opponent turn starts.
                </p>
            )
            return TapNextWrapper(mainText);
        }
        case TurnStep.OPPONENT_ATTACK: {
            return (
            <p> Opponent pitches some cards and attacks for <b>{opponentAttackValue.attackingCard.attack}</b>.<br />
                Choose your blocking cards or select none for no blocks.
                </p>
            );
        }
        case TurnStep.PLAYER_BLOCK: {
            return TapNextWrapper(
                <p> Opponent attacks for <b>{opponentAttackValue.attackingCard.attack}</b><br />
                    Player blocks for <b>{playerBlockAmount}</b>. <br/>
                </p>
            );
        }
        case TurnStep.PLAYER_TAKE_DAMAGE: {
            const netDamage = Math.max(opponentAttackValue.attackingCard.attack - playerBlockAmount, 0)
            return TapNextWrapper(
                <p> Opponent attacks for <b>{opponentAttackValue.attackingCard.attack}</b><br />
                    Player blocks for <b>{playerBlockAmount}</b>. <br/>
                    Player takes <b>{netDamage}</b> damage.
                </p>
            );
        }
        case TurnStep.PLAYER_TURN_START: {
            return TapNextWrapper(
                <p> Blocking cards are discarded.<br/>
                    Both players draw back up to <b>4</b>.
                </p>
            )
        }
        case TurnStep.UNKNOWN_STATE: {
            return (
                <p className="error"> UNKNOWN GAME STATE </p>
            )
        }
    }
}

export default InstructionComponent;
