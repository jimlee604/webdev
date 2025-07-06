import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { useId } from "react";
import { usePlayerTurn } from "./PlayerTurnContext";

const GameScreenComponent = () => {
    const {value} = usePlayerTurn();
    const player_turn = value
    const selectedId = "«r0»"
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={false}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={false}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={false}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={false}/>
                    </div>
                </div>
            </div>
            <div className="mid_bar">
                <ActiveTurnComponent player_turn = {player_turn}/>
                <div className="flexgrow" />
                <div className="vflex">
                    <InstructionComponent />
                    <div className="flexgrow" />
                    <NextButtonComponent />
                    <div className="flexgrow10" />
                </div>
            </div>
            <div className="center">
                <div>
                    <div className="hflex">
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={true}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={true}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={true}/>
                        <FABCardComponent id={useId()} selectedId={selectedId} playerOwned={true}/>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
