import { year2024day18 } from '../day18';

describe('2024 day18', () => {
  let instance: year2024day18;

  const input: string[] = [
    '5,4',
    '4,2',
    '4,5',
    '3,0',
    '2,1',
    '6,3',
    '2,4',
    '1,5',
    '0,6',
    '3,3',
    '2,6',
    '5,1',
    '1,2',
    '5,5',
    '2,5',
    '6,5',
    '1,4',
    '0,4',
    '6,4',
    '1,1',
    '6,1',
    '1,0',
    '0,5',
    '1,6',
    '2,0',
  ];

  beforeEach(() => {
    instance = new year2024day18();
    instance.gridSize = 7;
    instance.bytesToSimulate = 12;
  });

  describe('preChallenge', () => {
    it('should parse the falling byte coordinates', () => {
      // Arrange
      instance.input = ['5,4', '4,2'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.coordinates).toEqual([
        [5, 4],
        [4, 2],
      ]);
    });
  });

  describe('challenges', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should find the minimum steps to the exit in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Minimum steps to reach the exit: 22');
    });

    it('should find the first blocking byte in part2', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('First byte that blocks the exit: 6,1');
    });
  });

  describe('findFirstBlockingByte', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should return the coordinates of the byte that first cuts off the exit', () => {
      // Act
      const result = instance.findFirstBlockingByte();

      // Assert
      expect(result).toEqual([6, 1]);
    });
  });

  describe('shortestPathAfter', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should return the shortest path length after a given number of bytes have fallen', () => {
      // Act
      const result = instance.shortestPathAfter(12);

      // Assert
      expect(result).toBe(22);
    });

    it('should return -1 when the exit is unreachable', () => {
      // Act
      const result = instance.shortestPathAfter(25);

      // Assert
      expect(result).toBe(-1);
    });
  });
});
