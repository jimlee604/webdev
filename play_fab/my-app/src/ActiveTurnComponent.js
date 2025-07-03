const ActiveTurnComponent = (props) => {
    let turn_class = "turn_text " + (props.player_turn ? "player_turn" : "opponent_turn")
    return (
        <div>
            {props.player_turn ? <div className="height_30vh"></div> : null}
            {props.player_turn ? <p className={turn_class}><b>Your Turn</b></p> : <p>Opponent Turn</p>}
            {!props.player_turn ? <div className="height_30vh"></div> : null}
        </div>
    );
}

export default ActiveTurnComponent;
