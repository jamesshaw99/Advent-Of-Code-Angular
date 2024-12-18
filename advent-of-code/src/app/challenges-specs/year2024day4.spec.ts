import { year2024day4 } from '../challenges/year2024day4';

describe('year2024day4', () => {
  let instance: year2024day4;

  beforeEach(() => {
    instance = new year2024day4();
    instance.input = [
        'MMMSXXMASM',
        'MSAMXMSMSA',
        'AMXSXMAAMM',
        'MSAMASMSMX',
        'XMASAMXAMM',
        'XXAMMXXAMA',
        'SMSMSASXSS',
        'SAXAMASAAA',
        'MAMMMXMMMM',
        'MXMXAXMASX'
    ]
  });

  describe('part1', () => {
    it('should count occurrences of the word "XMAS" in all directions', () => {
      const result = instance.part1();
      expect(result).toBe("The word 'XMAS' appears 18 times");
    });

    it('should return 0 if the word "XMAS" is not present', () => {
      instance.input = [
        'ABCD',
        'EFGH',
        'IJKL',
        'MNOP'
      ];

      const result = instance.part1();
      expect(result).toBe("The word 'XMAS' appears 0 times");
    });

    it('should handle input with multiple occurrences in different orientations', () => {
      instance.input = [
        'XMAS',
        'SMAX',
        'SMAX',
        'XMAS',
      ];

      const result = instance.part1();
      expect(result).toBe("The word 'XMAS' appears 4 times");
    });
  });

  describe('part2', () => {
    it('should count occurrences of "X-MAS" patterns', () => {
      const result = instance.part2();
      expect(result).toBe("An X-MAS appears 9 times");
    });

    it('should return 0 if there are no "X-MAS" patterns', () => {
      instance.input = [
        'ABCD',
        'EFGH',
        'IJKL',
        'MNOP',
      ];

      const result = instance.part2();
      expect(result).toBe("An X-MAS appears 0 times");
    });
  });
});
