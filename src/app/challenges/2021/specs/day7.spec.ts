import { year2021day7 } from '../day7';

describe('2021 day7', () => {
  const officialInput = ['16,1,2,0,4,2,7,1,2,14'];

  let dayInstance: year2021day7;

  beforeEach(() => {
    dayInstance = new year2021day7();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('finds the cheapest alignment position at a constant fuel rate', () => {
      expect(dayInstance.part1()).toBe('Fuel: 37');
    });
  });

  describe('part2', () => {
    it('finds the cheapest alignment position at a triangular fuel rate', () => {
      expect(dayInstance.part2()).toBe('Fuel: 168');
    });
  });
});
