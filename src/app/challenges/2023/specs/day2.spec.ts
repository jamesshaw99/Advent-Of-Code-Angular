import { year2023day2 } from '../day2';

describe('2023 day2', () => {
  const officialInput = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
  ];

  let dayInstance: year2023day2;

  beforeEach(() => {
    dayInstance = new year2023day2();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('sums the IDs of games possible with 12 red, 13 green, 14 blue cubes', () => {
      expect(dayInstance.part1()).toBe('Sum of possible games: 8');
    });
  });

  describe('part2', () => {
    it('sums the power of the minimum set of cubes for each game', () => {
      expect(dayInstance.part2()).toBe('Sum of each games power: 2286');
    });
  });
});
