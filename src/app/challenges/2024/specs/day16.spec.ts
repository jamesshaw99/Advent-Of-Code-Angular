import { year2024day16 } from '../day16';

describe('2024 day16', () => {
  let instance: year2024day16;

  const sample1: string[] = [
    '###############',
    '#.......#....E#',
    '#.#.###.#.###.#',
    '#.....#.#...#.#',
    '#.###.#####.#.#',
    '#.#.#.......#.#',
    '#.#.#####.###.#',
    '#...........#.#',
    '###.#.#####.#.#',
    '#...#.....#.#.#',
    '#.#.#.###.#.#.#',
    '#.....#...#.#.#',
    '#.###.#.#.#.#.#',
    '#S..#.....#...#',
    '###############',
  ];

  const sample2: string[] = [
    '#################',
    '#...#...#...#..E#',
    '#.#.#.#.#.#.#.#.#',
    '#.#.#.#...#...#.#',
    '#.#.#.#.###.#.#.#',
    '#...#.#.#.....#.#',
    '#.#.#.#.#.#####.#',
    '#.#...#.#.#.....#',
    '#.#.#####.#.###.#',
    '#.#.#.......#...#',
    '#.#.###.#####.###',
    '#.#.#...#.....#.#',
    '#.#.#.#####.###.#',
    '#.#.#.........#.#',
    '#.#.#.#########.#',
    '#S#.............#',
    '#################',
  ];

  beforeEach(() => {
    instance = new year2024day16();
  });

  describe('preChallenge', () => {
    it('should locate the start and end tiles', () => {
      // Arrange
      instance.input = sample1;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.startRow).toBe(13);
      expect(instance.startCol).toBe(1);
      expect(instance.endRow).toBe(1);
      expect(instance.endCol).toBe(13);
    });
  });

  describe('challenges', () => {
    it('should find the lowest score in part1 for sample 1', () => {
      // Arrange
      instance.input = sample1;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Lowest possible score: 7036');
    });

    it('should find the lowest score in part1 for sample 2', () => {
      // Arrange
      instance.input = sample2;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Lowest possible score: 11048');
    });

    it('should count tiles on the best paths in part2 for sample 1', () => {
      // Arrange
      instance.input = sample1;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Tiles on at least one best path: 45');
    });

    it('should count tiles on the best paths in part2 for sample 2', () => {
      // Arrange
      instance.input = sample2;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Tiles on at least one best path: 64');
    });
  });

  describe('neighbors', () => {
    beforeEach(() => {
      instance.input = sample1;
      instance.preChallenge();
    });

    it('should include a forward move when the next tile is open', () => {
      // Act
      const edges = instance.neighbors({ row: 13, col: 1, dir: 1 });

      // Assert
      expect(edges).toContainEqual({ node: { row: 13, col: 2, dir: 1 }, cost: 1 });
    });

    it('should always include both turn options at cost 1000', () => {
      // Act
      const edges = instance.neighbors({ row: 13, col: 1, dir: 1 });

      // Assert
      expect(edges).toContainEqual({ node: { row: 13, col: 1, dir: 2 }, cost: 1000 });
      expect(edges).toContainEqual({ node: { row: 13, col: 1, dir: 0 }, cost: 1000 });
    });
  });
});
