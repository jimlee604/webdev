import Card from "./Card"

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Hand {

    constructor(cards, player) {
        this.cards = cards;
        this.player = player;
    }

    removeCard(card) {
        this.cards.remove(card)
    }

    refill() {
        while (this.cards.length < 4) {
            // clean up code to static vars
            this.cards.push(new Card(crypto.randomUUID(), randInt(1,3), randInt(1,3), randInt(2,5), randInt(2,3), this.player))
        }
    }
}

export default Hand