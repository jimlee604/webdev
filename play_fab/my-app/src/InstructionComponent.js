import { useAttackingCard } from "./AttackingCardContext"
import { TurnStep } from "./TurnStep"
import { BrowserView, MobileView } from 'react-device-detect';
import { useOpponentBlocks } from "./OpponentBlocksContext";
import { computeTotalBlocks } from "./Utils"

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

    // console.log("print opp blocks value")
    // console.log(opponentBlocksValue)
    let blockAmount = 0
    for (const block of opponentBlocksValue) {
        console.log("debug each block")
        console.log(block)
        console.log(block.block)
        blockAmount += block.block
        console.log("block amount: " + blockAmount)
        console.log("finish debug per block")
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
                <p>Attacking for {attackingCardValue.attack}.<br /> Pitched cards go to the bottom.</p>
            )
            return TapNextWrapper(mainText)
        }
        case TurnStep.OPPONENT_BLOCK: {
            const mainText = (
                <p>Attacking for {attackingCardValue.attack}.<br />
                    Pitched cards go to the bottom.<br />
                    Opponent blocks for {blockAmount}.
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
            console.log("total blocks 2: " + blockAmount)
            const netDamage = Math.max((attackingCardValue.attack - blockAmount), 0)
            // netDamage = attackingCardValue.attack - blockAmount
            const mainText = (
                <p>Attacking for {attackingCardValue.attack}.<br/>
                    Pitched cards go to the bottom.<br/>
                    Opponent blocks for {blockAmount}.<br/>
                    Opponent takes {netDamage} damage.
                </p>
            )
            return TapNextWrapper(mainText);
        }
        case TurnStep.OPPONENT_START_TURN: {
            const mainText = (
                <p> Player refills hand.<br/>
                    Opponent turn starts.
                </p>
            )
            return TapNextWrapper(mainText);
            break;
        }
        case TurnStep.UNKNOWN_STATE: {
            return (
                <p className="error"> UNKNOWN GAME STATE </p>
            )
        }
    }
}

export default InstructionComponent;
