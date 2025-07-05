import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import InstructionComponent from "./InstructionComponent";
import { useContext } from "react";
import { ActiveTurnContext } from "./App";
import { usePlayerTurn } from "./PlayerTurnContext";

const GameScreenComponent = () => {
    const {value, setValue} = usePlayerTurn();
    const player_turn = value
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent playerOwned={false}/>
                        <FABCardComponent playerOwned={false}/>
                        <FABCardComponent playerOwned={false}/>
                        <FABCardComponent playerOwned={false}/>
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
                        <FABCardComponent playerOwned={true}/>
                        <FABCardComponent playerOwned={true}/>
                        <FABCardComponent playerOwned={true}/>
                        <FABCardComponent playerOwned={true}/>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
