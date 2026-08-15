import { year2018day9 } from '../day9';

describe('2018 day9', () => {
  let instance: year2018day9;

  beforeEach(() => {
    instance = new year2018day9();
  });

  describe('part1', () => {
    const examples: [string, string][] = [
      ['9 players; last marble is worth 25 points', 'Winning score: 32'],
      ['10 players; last marble is worth 1618 points', 'Winning score: 8317'],
      ['13 players; last marble is worth 7999 points', 'Winning score: 146373'],
      ['17 players; last marble is worth 1104 points', 'Winning score: 2764'],
      ['21 players; last marble is worth 6111 points', 'Winning score: 54718'],
      ['30 players; last marble is worth 5807 points', 'Winning score: 37305'],
    ];

    for (const [input, expected] of examples) {
      it(`computes the winning score for "${input}"`, () => {
        instance.input = [input];
        instance.preChallenge();
        expect(instance.part1()).toBe(expected);
      });
    }
  });

  describe('part2', () => {
    it('plays with 100 times as many marbles', () => {
      instance.input = ['9 players; last marble is worth 25 points'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Winning score with 100x marbles: 22563');
    });
  });
});
