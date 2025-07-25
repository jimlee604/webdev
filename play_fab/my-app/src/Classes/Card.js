/*  Cards are the main interactive pieces of the game. Each card hold multiple defining characteristics determing their impact
    across several axes of the game.
*/
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

export default Card;