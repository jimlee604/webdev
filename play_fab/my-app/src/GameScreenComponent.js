import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { useId } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useSelectedCard } from "./SelectedCardContext";
import Hand from "./Hand";

const GameScreenComponent = () => {
    const {turnValue} = usePlayerTurn();
    const {turnStepValue} = useTurnStep();
    const {selectedId} = useSelectedCard()
    const playerHand = new Hand([], true)
    playerHand.refill()
    const oppHand = new Hand([], false)
    oppHand.refill()
    console.log(oppHand.length)
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent card={oppHand.cards[0]}/>
                        <FABCardComponent card={oppHand.cards[1]}/>
                        <FABCardComponent card={oppHand.cards[2]}/>
                        <FABCardComponent card={oppHand.cards[3]}/>
                    </div>
                </div>
            </div>
            <div className="mid_bar">
                <ActiveTurnComponent player_turn = {turnValue}/>
                <div className="flexgrow" />
                <div className="vflex">
                    <InstructionComponent turn_step = {turnStepValue}/>
                    <div className="flexgrow" />
                    <NextButtonComponent selected_id = {selectedId}/>
                    <div className="flexgrow10" />
                </div>
            </div>
            <div className="center">
                <div>
                    <div className="hflex">
                        <FABCardComponent card={playerHand.cards[0]}/>
                        <FABCardComponent card={playerHand.cards[1]}/>
                        <FABCardComponent card={playerHand.cards[2]}/>
                        <FABCardComponent card={playerHand.cards[3]}/>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
