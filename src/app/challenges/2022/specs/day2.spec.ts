import { year2022day2 } from '../day2';

describe('2022 day2', () => {
  const officialInput = ['A Y', 'B X', 'C Z'];

  let dayInstance: year2022day2;

  beforeEach(() => {
    dayInstance = new year2022day2();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('scores the strategy guide when column two is the shape to play', () => {
      expect(dayInstance.part1()).toBe('Total score: 15');
    });
  });

  describe('part2', () => {
    it('scores the strategy guide when column two is the desired outcome', () => {
      expect(dayInstance.part2()).toBe('Total score: 12');
    });
  });
});
