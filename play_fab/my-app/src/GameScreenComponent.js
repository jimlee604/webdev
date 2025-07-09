import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { useId } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useSelectedCard } from "./SelectedCardContext";
import Hand from "./Hand";
import { usePlayerHand } from "./PlayerHandContext";
import { useOpponentHand } from "./OpponentHandContext";

const GameScreenComponent = () => {
    const {turnValue} = usePlayerTurn();
    const {turnStepValue} = useTurnStep();
    const {selectedId} = useSelectedCard();

    const {playerHandValue, setPlayerHandValue} = usePlayerHand();
    const {opponentHandValue, setOpponentHandValue} = useOpponentHand();
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent card={opponentHandValue.cards[0]}/>
                        <FABCardComponent card={opponentHandValue.cards[1]}/>
                        <FABCardComponent card={opponentHandValue.cards[2]}/>
                        <FABCardComponent card={opponentHandValue.cards[3]}/>
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
                        <FABCardComponent card={playerHandValue.cards[0]}/>
                        <FABCardComponent card={playerHandValue.cards[1]}/>
                        <FABCardComponent card={playerHandValue.cards[2]}/>
                        <FABCardComponent card={playerHandValue.cards[3]}/>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
