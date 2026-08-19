import { year2024day20 } from '../day20';

describe('2024 day20', () => {
  let instance: year2024day20;

  const input: string[] = [
    '###############',
    '#...#...#.....#',
    '#.#.#.#.#.###.#',
    '#S#...#.#.#...#',
    '#######.#.#.###',
    '#######.#.#...#',
    '#######.#.###.#',
    '###..E#...#...#',
    '###.#######.###',
    '#...###...#...#',
    '#.#####.#.###.#',
    '#.#...#.#.#...#',
    '#.#.#.#.#.#.###',
    '#...#...#...###',
    '###############',
  ];

  beforeEach(() => {
    instance = new year2024day20();
    instance.input = input;
    instance.preChallenge();
  });

  describe('preChallenge', () => {
    it('should locate the start position and compute distances along the track', () => {
      // Assert
      expect(instance.startRow).toBe(3);
      expect(instance.startCol).toBe(1);
      expect(instance.distanceFromStart[3][1]).toBe(0);
      expect(instance.distanceFromStart[2][2]).toBe(-1); // a wall stays unvisited
    });
  });

  describe('countCheatsWithMinimumSavings', () => {
    it('should count every cheat that saves at least 2 picoseconds', () => {
      // Act
      const result = instance.countCheatsWithMinimumSavings(2);

      // Assert
      expect(result).toBe(44);
    });

    it('should count only the largest cheats when the threshold is high', () => {
      // Act
      const result = instance.countCheatsWithMinimumSavings(50);

      // Assert
      expect(result).toBe(1);
    });

    it('should count cheats saving at least 20 picoseconds', () => {
      // Act
      const result = instance.countCheatsWithMinimumSavings(20);

      // Assert
      expect(result).toBe(5);
    });

    it('should count 20-picosecond cheats saving at least 50 picoseconds', () => {
      // Act
      const result = instance.countCheatsWithMinimumSavings(50, 20);

      // Assert
      expect(result).toBe(285);
    });
  });

  describe('challenges (part2)', () => {
    it('should report 0 cheats saving at least 100 picoseconds on this tiny track', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe(
        'Cheats saving at least 100 picoseconds with up to 20-picosecond cheats: 0'
      );
    });
  });
});
