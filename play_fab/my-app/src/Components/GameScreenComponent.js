import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { usePlayerTurn } from "../Contexts/PlayerTurnContext";
import { useTurnStep } from "../Contexts/TurnStepContext";
import { useSelectedCard } from "../Contexts/SelectedCardContext";
import { usePlayerHand } from "../Contexts/PlayerHandContext";
import { useOpponentHand } from "../Contexts/OpponentHandContext";

const GameScreenComponent = () => {
    const { playerTurnValue } = usePlayerTurn();
    const { turnStepValue } = useTurnStep();
    const { selectedId } = useSelectedCard();
    const { playerHandValue } = usePlayerHand();
    const { opponentHandValue } = useOpponentHand();
    return (
        <div className="full-background-container" style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_5vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        {(opponentHandValue.cards.length > 0) && <FABCardComponent card={opponentHandValue.cards[0]} />}
                        {(opponentHandValue.cards.length > 1) && <FABCardComponent card={opponentHandValue.cards[1]} />}
                        {(opponentHandValue.cards.length > 2) && <FABCardComponent card={opponentHandValue.cards[2]} />}
                        {(opponentHandValue.cards.length > 3) && <FABCardComponent card={opponentHandValue.cards[3]} />}
                    </div>
                </div>
            </div>
            <div className="mid_bar">
                <div className="vflex">
                <ActiveTurnComponent player_turn={playerTurnValue} />
                </div>
                <div className="flexgrow" />
                <div className="vflex">
                    <InstructionComponent turn_step={turnStepValue} />
                    <div className="flexgrow" />
                    <NextButtonComponent selected_id={selectedId} />
                    <div className="flexgrow10" />
                </div>
            </div>
            <div className="center">
                <div>
                    <div className="hflex">
                        {(playerHandValue.cards.length > 0) && <FABCardComponent card={playerHandValue.cards[0]} />}
                        {(playerHandValue.cards.length > 1) && <FABCardComponent card={playerHandValue.cards[1]} />}
                        {(playerHandValue.cards.length > 2) && <FABCardComponent card={playerHandValue.cards[2]} />}
                        {(playerHandValue.cards.length > 3) && <FABCardComponent card={playerHandValue.cards[3]} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameScreenComponent;
