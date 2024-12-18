import { day } from '../helpers/day';

interface Card {
  id: number;
  winningNumbers: Set<number>;
  numbersYouHave: Set<number>;
}

export class year2023day4 extends day {
  cardCopies = new Map<number, number>();

  override part1(): string {
    const cards = this.input.map(this.parseCard);
    const cardsTotalSum = cards.reduce(
      (sum, card) => sum + this.getCardScore(card),
      0
    );
    return `Total points: ${cardsTotalSum}`;
  }

  override part2(): string {
    const cards = this.input.map(this.parseCard);
    let cardsWon = 0;
    cards.forEach((card) => {
      const { numberInCommonCount, multiplier } =
        this.createCopiesFromCard(card);
      const copiesWonFromCard = numberInCommonCount * multiplier;
      cardsWon += copiesWonFromCard;
    });
    const totalCards = cardsWon + cards.length;
    return `Total number of cards: ${totalCards}`;
  }

  parseCard(card: string): Card {
    const [name, numbers] = card.split(':');
const id = parseInt(name.split(' ').pop()!, 10);

    const [winningNumbersList, numbersYouHaveList] = numbers
      .split('|')
      .map((numArray) =>
        numArray
          .trim()
          .split(' ')
          .filter((num) => num !== '')
          .map((num) => parseInt(num, 10))
      );
    const winningNumbers = new Set(winningNumbersList);
    const numbersYouHave = new Set(numbersYouHaveList);
    return {
      id,
      winningNumbers,
      numbersYouHave,
    };
  }

  getCardNumberInCommonCount(card: Card) {
    let numberInCommonCount = 0;
    for (const num of card.numbersYouHave) {
      if (card.winningNumbers.has(num)) {
        numberInCommonCount += 1;
      }
    }
    return numberInCommonCount;
  }

  getCardScore(card: Card): number {
    const numberInCommonCount = this.getCardNumberInCommonCount(card);
    const score =
      numberInCommonCount === 0 ? 0 : Math.pow(2, numberInCommonCount - 1);
    return score;
  }
  
  createCopiesFromCard(card: Card) {
    const numberInCommonCount = this.getCardNumberInCommonCount(card);
    const copiesCount = this.cardCopies.get(card.id) ?? 0;
    const multiplier = copiesCount + 1;
    for (let i = 1; i <= numberInCommonCount; i++) {
      const nextCardId = card.id + i;
      const nextCardCopiesCount = this.cardCopies.get(nextCardId) ?? 0;
      const newNextCardCopiesCount = nextCardCopiesCount + multiplier;
      this.cardCopies.set(nextCardId, newNextCardCopiesCount);
    }
    return { numberInCommonCount, multiplier };
  }
}
