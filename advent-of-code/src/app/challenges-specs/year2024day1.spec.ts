import { year2024day1 } from '../challenges/year2024day1';

describe('year2024day1 Class', () => {
  let instance: year2024day1;

  let input: string[] = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'];

  beforeEach(() => {
    instance = new year2024day1();
  });

  describe('preChallenge', () => {
    it('should parse input correctly in preChallenge', () => {
      // Arrange
      instance.input = ['1 2', '3 4', '5 6'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.leftList).toEqual([1, 3, 5]);
      expect(instance.rightList).toEqual([2, 4, 6]);
    });
  });

  describe('challenges', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should calculate total distance correctly in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Total Distance: 11');
    });

    it('should calculate similarity score correctly in part2', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Similarity Score: 31');
    });
  });

  describe('Helper Methods', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should calculate total distance in calculateTotalDistance', () => {
      // Act
      const result = instance.calculateTotalDistance(
        instance.leftList,
        instance.rightList
      );

      // Assert
      expect(result).toBe(11);
    });

    it('should calculate similarity score in calculateSimilarityScore', () => {
      // Act
      const result = instance.calculateSimilarityScore(
        instance.leftList,
        instance.rightList
      );

      // Assert
      expect(result).toBe(31);
    });

    it('should handle edge cases with empty lists in total distance', () => {
      // Act
      const result = instance.calculateTotalDistance([], []);

      // Assert
      expect(result).toBe(0);
    });

    it('should handle edge cases with empty lists in similarity score', () => {
      // Act
      const result = instance.calculateSimilarityScore([], []);

      // Assert
      expect(result).toBe(0);
    });
  });
});
