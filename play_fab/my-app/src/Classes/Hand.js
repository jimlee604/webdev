import Card from "./Card"

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* A hand represents the cards each player has in posssession. */
class Hand {
    static maxHandSize = 4;

    constructor(cards, player) {
        this.cards = cards;
        this.player = player;
    }

    removeCard(card) {
        this.cards.remove(card)
    }

    refill() {
        while (this.cards.length < Hand.maxHandSize) {
            // clean up code to static vars
            this.cards.push(new Card(crypto.randomUUID(), randInt(1,3), randInt(1,3), randInt(2,9), randInt(2,3), this.player))
        }
    }
}

export default Hand