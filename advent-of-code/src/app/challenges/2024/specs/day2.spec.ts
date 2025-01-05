import { year2024day2 } from '../day2';

describe('2024 day2', () => {
  let instance: year2024day2;

  const input: string[] = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9',
  ];

  beforeEach(() => {
    instance = new year2024day2();

    instance.input = input;
  });

  describe('part1', () => {
    it('should correctly count the number of safe reports', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Number of safe reports: 2');
    });
  });

  describe('part2', () => {
    it('should correctly count the number of safe reports with dampener', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Number of safe reports with dampener: 4');
    });
  });

  describe('isSafeReport', () => {
    it('should return true for a report with strictly increasing valid differences', () => {
      // Arrange
      const levels = [1, 3, 6, 7, 9];

      // Act
      const result = instance.isSafeReport(levels);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return true for a report with strictly decreasing valid differences', () => {
      // Arrange
      const levels = [7, 6, 4, 2, 1];

      // Act
      const result = instance.isSafeReport(levels);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false for a report with invalid differences', () => {
      // Arrange
      const levels = [1, 2, 7, 8, 9];

      // Act
      const result = instance.isSafeReport(levels);

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false for a report with mixed increasing and decreasing differences', () => {
      // Arrange
      const levels = [1, 3, 2, 5];

      // Act
      const result = instance.isSafeReport(levels);

      // Assert
      expect(result).toBeFalse();
    });
  });

  describe('isSafeWithDampener', () => {
    it('should return true if removing one level makes the report safe', () => {
      // Arrange
      const levels = [1, 3, 2, 4, 5]; // Removing 3 makes it safe

      // Act
      const result = instance.isSafeWithDampener(levels);

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false if no single removal can make the report safe', () => {
      // Arrange
      const levels = [9, 7, 6, 2, 1];

      // Act
      const result = instance.isSafeWithDampener(levels);

      // Assert
      expect(result).toBeFalse();
    });

    it('should return true if the original report is already safe', () => {
      // Arrange
      const levels = [1, 3, 6, 7, 9];

      // Act
      const result = instance.isSafeWithDampener(levels);

      // Assert
      expect(result).toBeTrue();
    });
  });

  describe('edge cases', () => {
    it('should handle an empty input list gracefully in part1', () => {
      // Arrange
      instance.input = [];

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Number of safe reports: 0');
    });

    it('should handle an empty input list gracefully in part2', () => {
      // Arrange
      instance.input = [];

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Number of safe reports with dampener: 0');
    });

    it('should handle single-element reports', () => {
      // Arrange
      const levels = [5];

      // Act
      const safeReportResult = instance.isSafeReport(levels);
      const safeWithDampenerResult = instance.isSafeWithDampener(levels);

      // Assert
      expect(safeReportResult).toBeTrue(); // Single element is trivially safe
      expect(safeWithDampenerResult).toBeTrue();
    });
  });
});
