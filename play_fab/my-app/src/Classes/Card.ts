/*  Cards are the main interactive pieces of the game. Each card hold multiple defining characteristics determing their impact
    across several axes of the game.
*/
class Card {
    private id: string;
    private cost: number;
    private pitch: number;
    private attack: number;
    private block: number;
    private playerOwned: boolean;

    constructor(id: string,
        cost: number,
        pitch: number,
        attack: number,
        block: number,
        playerOwned: boolean) {
        this.id = id;
        this.cost = cost;
        this.pitch = pitch;
        this.attack = attack;
        this.block = block;
        this.playerOwned = playerOwned;
    }
}

export default Card;