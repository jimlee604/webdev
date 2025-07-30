import { useOpponentLife } from "../Contexts/OpponentLifeContext.ts";
import { usePlayerLife } from "../Contexts/PlayerLifeContext.ts";

const ActiveTurnComponent = (props) => {
    const { playerLifeValue } = usePlayerLife();
    const { opponentLifeValue } = useOpponentLife();
    return (
        <div className="game_logistics_panel">
            <div>
                <p className="life">Opponent: <b>{opponentLifeValue}</b></p>
                <p className="life">Player: <b>{playerLifeValue}</b></p>
            </div>
            {props.player_turn == true
                ?
                <p className="turn_text player_turn">Your Turn</p>
                :
                <p className="turn_text opponent_turn">Opponent Turn</p>
            }
        </div>
    );
}

export default ActiveTurnComponent;
