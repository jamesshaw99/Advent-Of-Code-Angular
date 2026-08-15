import { year2019day22 } from '../day22';

describe('2019 day22', () => {
  let instance: year2019day22;

  beforeEach(() => {
    instance = new year2019day22();
  });

  describe('part1', () => {
    it('deals into new stack (reverses the deck)', () => {
      const deck = instance.shuffleOnce(instance.initialDeck(10), ['deal into new stack']);
      expect(deck).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });

    it('cuts N cards from the top', () => {
      const deck = instance.shuffleOnce(instance.initialDeck(10), ['cut 3']);
      expect(deck).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
    });

    it('cuts N cards from the bottom when N is negative', () => {
      const deck = instance.shuffleOnce(instance.initialDeck(10), ['cut -4']);
      expect(deck).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
    });

    it('deals with increment N', () => {
      const deck = instance.shuffleOnce(instance.initialDeck(10), ['deal with increment 3']);
      expect(deck).toEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3]);
    });

    it('finds the position of a card after the full example shuffle sequence', () => {
      instance.deckSize = 10;
      instance.targetCard = 6;
      instance.input = [
        'deal into new stack',
        'cut -2',
        'deal with increment 7',
        'cut 8',
        'cut -4',
        'deal with increment 7',
        'cut 3',
        'deal with increment 9',
        'deal with increment 3',
        'cut -1',
      ];
      instance.preChallenge();
      expect(instance.part1()).toBe('Position of card 6: 9');
    });
  });

  describe('part2', () => {
    it('matches a brute-force simulation of a single repeat of the shuffle sequence', () => {
      const techniques = ['deal with increment 7', 'deal into new stack', 'deal into new stack'];
      const expectedDeck = instance.shuffleOnce(instance.initialDeck(11), techniques);

      instance.input = techniques;
      instance.cardCount = 11n;
      instance.shuffleRepeats = 1n;

      for (let position = 0; position < 11; position++) {
        instance.targetPosition = BigInt(position);
        expect(instance.part2()).toBe(`Card at position ${position}: ${expectedDeck[position]}`);
      }
    });

    it('matches a brute-force simulation of several repeats of the shuffle sequence', () => {
      const techniques = ['cut 4', 'deal with increment 7', 'deal into new stack', 'cut -3'];
      let expectedDeck = instance.initialDeck(13);
      for (let i = 0; i < 5; i++) {
        expectedDeck = instance.shuffleOnce(expectedDeck, techniques);
      }

      instance.input = techniques;
      instance.cardCount = 13n;
      instance.shuffleRepeats = 5n;

      for (let position = 0; position < 13; position++) {
        instance.targetPosition = BigInt(position);
        expect(instance.part2()).toBe(`Card at position ${position}: ${expectedDeck[position]}`);
      }
    });
  });
});
