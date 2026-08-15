import { year2023day9 } from '../day9';

describe('2023 day9', () => {
  const officialInput = ['0 3 6 9 12 15', '1 3 6 10 15 21', '10 13 16 21 30 45'];

  let dayInstance: year2023day9;

  beforeEach(() => {
    dayInstance = new year2023day9();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('sums the extrapolated next value of each history', () => {
      expect(dayInstance.part1()).toBe('Sum of extrapolated values (forward): 114');
    });
  });

  describe('part2', () => {
    it('sums the extrapolated previous value of each history', () => {
      expect(dayInstance.part2()).toBe('Sum of extrapolated values (backwards): 2');
    });
  });
});
