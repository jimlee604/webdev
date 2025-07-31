import Card from "./Card.ts"

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* A hand represents the cards each player has in posssession. */
class Hand {
    static maxHandSize = 4;
    static minCardCost = 1;
    static maxCardCost = 3;
    static minCardPitch = 1;
    static maxCardPitch = 3;
    static minCardAttack = 4;
    static maxCardAttack = 9;
    static minCardBlock = 2;
    static maxCardBlock = 3;

    public cards: Card[];
    public player: boolean

    constructor(cards, player) {
        this.cards = cards;
        this.player = player;
    }

    removeCard(card) {
        const index: number = this.cards.indexOf(card);
        if (index !== -1) {
            this.cards.splice(index, 1);
        }
    }

    refill() {
        while (this.cards.length < Hand.maxHandSize) {
            this.cards.push(new Card(
                crypto.randomUUID(),
                randInt(Hand.minCardCost, Hand.maxCardCost),
                randInt(Hand.minCardPitch, Hand.maxCardPitch),
                randInt(Hand.minCardAttack, Hand.maxCardAttack),
                randInt(Hand.minCardBlock, Hand.maxCardBlock),
                this.player));
        }
    }
}

export default Hand;