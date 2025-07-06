const ActiveTurnComponent = (props) => {
    return (
        props.player_turn
            ?
            <div>
                <div className="height_30vh"></div>
                <p className="turn_text player_turn">Your Turn</p>
            </div>
            :
            <div>
                <p className="turn_text opponent_turn">Opponent Turn</p>
                <div className="height_30vh"></div>
            </div>
    );
}

export default ActiveTurnComponent;
