import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { useId } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";
import { useTurnStep } from "./TurnStepContext";
import { useSelectedCard } from "./SelectedCardContext";
import Card  from "./Card"

const GameScreenComponent = () => {
    const {turnValue} = usePlayerTurn();
    const {turnStepValue} = useTurnStep();
    const {selectedId} = useSelectedCard()
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent card={generateCard(useId(), false)}/>
                        <FABCardComponent card={generateCard(useId(), false)}/>
                        <FABCardComponent card={generateCard(useId(), false)}/>
                        <FABCardComponent card={generateCard(useId(), false)}/>
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
                        <FABCardComponent card={generateCard(useId(), true)}/>
                        <FABCardComponent card={generateCard(useId(), true)}/>
                        <FABCardComponent card={generateCard(useId(), true)}/>
                        <FABCardComponent card={generateCard(useId(), true)}/>
                    </div>
                </div>
            </div>
        </body>
    );
}

function generateCard(id, playerOwned) {
    return new Card(id, 2, 1, 4, 3, playerOwned)
}

export default GameScreenComponent;
