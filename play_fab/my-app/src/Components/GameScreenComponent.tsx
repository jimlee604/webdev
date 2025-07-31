import ActiveTurnComponent from "./ActiveTurnComponent.tsx"
import FABCardComponent from "./FABCardComponent.tsx";
import InstructionComponent from "./InstructionComponent.tsx";
import NextButtonComponent from "./NextButtonComponent.tsx"
import { usePlayerHand } from "../Contexts/PlayerHandContext.ts";
import { usePlayerTurn } from "../Contexts/PlayerTurnContext.ts";
import { useOpponentHand } from "../Contexts/OpponentHandContext.ts";
import { useSelectedCard } from "../Contexts/SelectedCardContext.ts";
import { useTurnStep } from "../Contexts/TurnStepContext.ts";
import { TurnStep } from "../Classes/TurnStep.ts";

const GameScreenComponent = () => {
    const { playerTurnValue } = usePlayerTurn();
    const { turnStepValue } = useTurnStep();
    const { selectedId } = useSelectedCard();
    const { playerHandValue } = usePlayerHand();
    const { opponentHandValue } = useOpponentHand();
    const endGame = (turnStepValue == TurnStep.PLAYER_WIN) || (turnStepValue == TurnStep.PLAYER_LOSE)

    return (
        <div className="full-background-container" style={{ backgroundColor: '#8ecde2ff' }}>
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
                <div className="vflex width_40vh">
                    <ActiveTurnComponent player_turn={playerTurnValue} />
                </div>
                <div className="vflex width_60vh">
                    <div className="height_30vh instructions_panel">
                        <InstructionComponent turn_step={turnStepValue} />
                    </div>
                    <div className={"height_20vh" + (endGame ? " hidden-but-takes-space" : "")}>
                        <NextButtonComponent selected_id={selectedId} />
                    </div>
                    <div className="height_5vh" />
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
