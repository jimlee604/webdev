import { useAttackingCard } from "./AttackingCardContext"
import { TurnStep } from "./TurnStep"
import { BrowserView, MobileView } from 'react-device-detect';
import { useOpponentBlocks } from "./OpponentBlocksContext";

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
                <p>Please select cards to pay 2 resources.</p>
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
    }
}

export default InstructionComponent;
