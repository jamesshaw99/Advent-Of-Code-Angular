import { year2023day3 } from '../day3';

describe('2023 day3', () => {
  const officialInput = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..',
  ];

  let dayInstance: year2023day3;

  beforeEach(() => {
    dayInstance = new year2023day3();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('sums every part number adjacent to a symbol', () => {
      expect(dayInstance.part1()).toBe('Sum of part numbers: 4361');
    });
  });

  describe('part2', () => {
    it('sums the gear ratios of every * adjacent to exactly two part numbers', () => {
      expect(dayInstance.part2()).toBe('Sum of the gear ratios: 467835');
    });
  });
});
