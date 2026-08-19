import { year2024day19 } from '../day19';

describe('2024 day19', () => {
  let instance: year2024day19;

  const input: string[] = [
    'r, wr, b, g, bwu, rb, gb, br',
    '',
    'brwrr',
    'bggr',
    'gbbr',
    'rrbgbr',
    'ubwu',
    'bwurrg',
    'brgr',
    'bbrgwb',
  ];

  beforeEach(() => {
    instance = new year2024day19();
  });

  describe('preChallenge', () => {
    it('should parse the available patterns and desired designs', () => {
      // Arrange
      instance.input = input;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.patterns).toEqual(['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br']);
      expect(instance.designs).toEqual([
        'brwrr',
        'bggr',
        'gbbr',
        'rrbgbr',
        'ubwu',
        'bwurrg',
        'brgr',
        'bbrgwb',
      ]);
    });
  });

  describe('challenges', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should count the number of possible designs in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Number of possible designs: 6');
    });

    it('should count the total number of ways to make every design in part2', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Total number of ways to make every design: 16');
    });
  });

  describe('countWays', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should count every arrangement for a design with multiple decompositions', () => {
      // Act & Assert
      expect(instance.countWays('brwrr')).toBe(2);
      expect(instance.countWays('gbbr')).toBe(4);
      expect(instance.countWays('rrbgbr')).toBe(6);
      expect(instance.countWays('bggr')).toBe(1);
      expect(instance.countWays('bwurrg')).toBe(1);
      expect(instance.countWays('brgr')).toBe(2);
    });

    it('should return 0 for an impossible design', () => {
      // Act & Assert
      expect(instance.countWays('ubwu')).toBe(0);
      expect(instance.countWays('bbrgwb')).toBe(0);
    });
  });

  describe('isDesignPossible', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should return true for a design that can be composed from patterns', () => {
      // Act & Assert
      expect(instance.isDesignPossible('brwrr')).toBe(true);
      expect(instance.isDesignPossible('gbbr')).toBe(true);
    });

    it('should return false for a design that cannot be composed from patterns', () => {
      // Act & Assert
      expect(instance.isDesignPossible('ubwu')).toBe(false);
      expect(instance.isDesignPossible('bbrgwb')).toBe(false);
    });
  });
});
