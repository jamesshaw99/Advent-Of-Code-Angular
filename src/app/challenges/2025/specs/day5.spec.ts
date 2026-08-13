import { year2025day5 } from '../day5';

describe('2025 day 5', () => {
  let instance: year2025day5;
  const input: string[] = [
    '3-5',
    '10-14',
    '16-20',
    '12-18',
    '',
    '1',
    '5',
    '8',
    '11',
    '17',
    '32',
  ];

  beforeEach(() => {
    instance = new year2025day5();
    instance.input = input;
    instance.preChallenge();
  });

  describe('PreChallenge', () => {
    it('should filter out fresh ranges and ingredient ids', () => {
      // Arrange
      const freshRanges = [
        {start: 3, end: 5},
        {start: 10, end: 14},
        {start: 16, end: 20},
        {start: 12, end: 18}
      ];
      const ingredientIds = [1, 5, 8, 11, 17, 32];

      // Assert
      expect(instance.freshRanges).toEqual(freshRanges);
      expect(instance.ingredientIds).toEqual(ingredientIds);
    });
  });

  describe('Challenges', () => {
    it('Part 1 should count the number of fresh ingredients from the provided list', () => {
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('3 ingredients are fresh');
    });

    it('Part 2 should count the number of IDs considered fresh from the ranges', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('14 IDs are fresh');
    });
  });
});
