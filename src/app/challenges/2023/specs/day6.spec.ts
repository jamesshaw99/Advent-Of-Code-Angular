import { year2023day6 } from '../day6';

describe('2023 day6', () => {
  const officialInput = ['Time:      7  15   30', 'Distance:  9  40  200'];

  describe('part1', () => {
    it('multiplies the number of ways to beat the record in each race', () => {
      const dayInstance = new year2023day6();
      dayInstance.input = officialInput;
      expect(dayInstance.part1()).toBe('Total number of ways to win: 288');
    });
  });

  describe('part2', () => {
    it('finds the number of ways to beat the record in the single combined race', () => {
      const dayInstance = new year2023day6();
      dayInstance.input = officialInput;
      expect(dayInstance.part2()).toBe('Total number of ways to win: 71503');
    });
  });
});
