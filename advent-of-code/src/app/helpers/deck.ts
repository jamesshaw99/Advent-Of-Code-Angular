export class Deck {
  private cards: number[];

  constructor(cards: number[] = []) {
    this.cards = [...cards];
  }

  public drawCard(): number {
    const card = this.cards.shift();
    if (card === undefined) {
      throw new Error('Cannot draw from empty deck');
    }
    return card;
  }

  public addCards(card1: number, card2: number): void {
    this.cards.push(card1, card2);
  }

  public isEmpty(): boolean {
    return this.cards.length === 0;
  }

  public size(): number {
    return this.cards.length;
  }

  public canRecurse(cardValue: number): boolean {
    return cardValue <= this.cards.length;
  }

  public getSubDeck(size: number): Deck {
    return new Deck(this.cards.slice(0, size));
  }

  public calculateScore(): number {
    return this.cards.reduce(
      (score, card, index) => score + card * (this.cards.length - index),
      0
    );
  }

  public getStateHash(): string {
    return this.cards.join(',');
  }

  public clone(): Deck {
    return new Deck(this.cards);
  }
}
