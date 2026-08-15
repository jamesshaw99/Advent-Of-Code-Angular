import { year2021day9 } from '../day9';

describe('2021 day9', () => {
  const officialInput = [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678',
  ];

  let dayInstance: year2021day9;

  beforeEach(() => {
    dayInstance = new year2021day9();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('sums the risk levels of all low points', () => {
      expect(dayInstance.part1()).toBe('Total risk: 15');
    });
  });

  describe('part2', () => {
    it('multiplies together the sizes of the three largest basins', () => {
      expect(dayInstance.part2()).toBe('Product of the three largest basins: 1134');
    });
  });
});
