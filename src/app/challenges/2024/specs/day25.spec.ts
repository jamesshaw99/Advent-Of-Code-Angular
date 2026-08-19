import { year2024day25 } from '../day25';

describe('2024 day25', () => {
  let instance: year2024day25;

  const input: string[] = [
    '#####',
    '.####',
    '.####',
    '.####',
    '.#.#.',
    '.#...',
    '.....',
    '',
    '#####',
    '##.##',
    '.#.##',
    '...##',
    '...#.',
    '...#.',
    '.....',
    '',
    '.....',
    '#....',
    '#....',
    '#...#',
    '#.#.#',
    '#.###',
    '#####',
    '',
    '.....',
    '.....',
    '#.#..',
    '###..',
    '###.#',
    '###.#',
    '#####',
    '',
    '.....',
    '.....',
    '.....',
    '#....',
    '#.#..',
    '#.#.#',
    '#####',
  ];

  beforeEach(() => {
    instance = new year2024day25();
    instance.input = input;
    instance.preChallenge();
  });

  describe('preChallenge', () => {
    it('should separate schematics into locks and keys with their column heights', () => {
      // Assert
      expect(instance.locks).toEqual([
        [0, 5, 3, 4, 3],
        [1, 2, 0, 5, 3],
      ]);
      expect(instance.keys).toEqual([
        [5, 0, 2, 1, 3],
        [4, 3, 4, 0, 2],
        [3, 0, 2, 0, 1],
      ]);
    });
  });

  describe('challenges', () => {
    it('should count the number of fitting lock/key pairs in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Number of unique lock/key pairs that fit: 3');
    });
  });

  describe('fits', () => {
    it('should return true when no column exceeds the available space', () => {
      // Act & Assert
      expect(instance.fits([0, 5, 3, 4, 3], [3, 0, 2, 0, 1])).toBe(true);
    });

    it('should return false when a column overlaps', () => {
      // Act & Assert
      expect(instance.fits([0, 5, 3, 4, 3], [5, 0, 2, 1, 3])).toBe(false);
    });
  });
});
