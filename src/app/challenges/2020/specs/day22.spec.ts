import { year2020day22 } from '../day22';

describe('2020 day22', () => {
  let instance: year2020day22;

  beforeEach(() => {
    instance = new year2020day22();
    instance.input = [
      'Player 1:',
      '9',
      '2',
      '6',
      '3',
      '1',
      '',
      'Player 2:',
      '5',
      '8',
      '4',
      '7',
      '10',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('plays regular Combat and scores the winning deck', () => {
      expect(instance.part1()).toBe("Winning player's score: 306");
    });
  });

  describe('part2', () => {
    it('plays Recursive Combat and scores the winning deck', () => {
      expect(instance.part2()).toBe("Winning player's score: 291");
    });
  });
});
