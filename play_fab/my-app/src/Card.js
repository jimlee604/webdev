class Card {
    constructor(id, cost, pitch, attack, block, playerOwned) {
        this.id = id;
        this.cost = cost;
        this.pitch = pitch;
        this.attack = attack;
        this.block = block;
        this.playerOwned = playerOwned;
    }
}

export default Card