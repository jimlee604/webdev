const ActiveTurnComponent = (props) => {
    return (
        <div>
            {/* <p className="life">Player Life: 40</p>
            <p className="life">Opponent Life: 40</p> */}
            <div className="height_30vh"></div>
        {props.player_turn
            ?
                <p className="turn_text player_turn">Your Turn</p>
            :
                <p className="turn_text opponent_turn">Opponent Turn</p>
        }
            </div>
    );
}

export default ActiveTurnComponent;
