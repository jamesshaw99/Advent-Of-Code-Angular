import { Point } from '../../../models/point';
import { year2025day9 } from '../day9';

describe('2025 day 9', () => {
  let instance: year2025day9;
  const input: string[] = [
    '7,1',
    '11,1',
    '11,7',
    '9,7',
    '9,5',
    '2,5',
    '2,3',
    '7,3',
  ];

  beforeEach(() => {
    instance = new year2025day9();
    instance.input = input;
    instance.preChallenge();
  });

  describe('PreChallenge', () => {
    it('should create a list of points from the input', () => {
      // Arrange
      const expected: Point[] = [
        { x: 7, y: 1 },
        { x: 11, y: 1 },
        { x: 11, y: 7 },
        { x: 9, y: 7 },
        { x: 9, y: 5 },
        { x: 2, y: 5 },
        { x: 2, y: 3 },
        { x: 7, y: 3 },
      ];

      // Assert
      expect(instance.redTiles).toEqual(expected);
    });

    it('should create tiles sets for red and green', () => {
      // Arrange
      const redTileSet = new Set<string>([
        '7,1',
        '11,1',
        '11,7',
        '9,7',
        '9,5',
        '2,5',
        '2,3',
        '7,3'
      ]);
      const edgeTiles = new Set<string>([
        '7,1',
        '8,1',
        '9,1',
        '10,1',
        '11,1',
        '11, 1',
        '11, 2',
        '11, 3',
        '11, 4',
        '11, 5',
        '11, 6',
        '11, 7',
        '9,7',
        '10,7',
        '11,7',
        '9, 5',
        '9, 6',
        '9, 7',
        '2,5',
        '3,5',
        '4,5',
        '5,5',
        '6,5',
        '7,5',
        '8,5',
        '9,5',
        '2, 3',
        '2, 4',
        '2, 5',
        '2,3',
        '3,3',
        '4,3',
        '5,3',
        '6,3',
        '7,3',
        '7, 1',
        '7, 2',
        '7, 3'
      ]);

      // Assert
      expect(instance.redTilesSet).toEqual(redTileSet);
      expect(instance.edgeTiles).toEqual(edgeTiles);
    });
  });

  describe('Challenges', () => {
    it('Part 1 should calculate the area of the largest rectangle', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Largest area: 50');
    });

    it('Part 2 should calculate the area of the largest rectangle using only red and green tiles', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Largest area: 24');
    });
  });
});
