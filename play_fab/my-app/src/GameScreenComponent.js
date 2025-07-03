import FABCardComponent from "./FABCardComponent";
import ActiveTurnComponent from "./ActiveTurnComponent"
import NextButtonComponent from "./NextButtonComponent"
import { useContext } from "react";
import { ActiveTurnContext } from "./App";

const GameScreenComponent = () => {
    const {contextValue, updateContext} = useContext(ActiveTurnContext)
    const player_turn = contextValue
    return (
        <body style={{ backgroundColor: '#9c9c9c' }}>
            <div className='height_10vh' />
            <div className='center'>
                <div>
                    <div className="hflex">
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                    </div>
                </div>
            </div>
            <div className="mid_bar">
                <ActiveTurnComponent player_turn = {player_turn}/>
                <div className="flexgrow" />
                <div className="vflex">
                    <div className="flexgrow" />
                    <NextButtonComponent />
                    <div className="flexgrow10" />
                </div>
            </div>
            <div className="center">
                <div>
                    <div className="hflex">
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                        <FABCardComponent />
                    </div>
                </div>
            </div>
        </body>
    );
}

export default GameScreenComponent;
