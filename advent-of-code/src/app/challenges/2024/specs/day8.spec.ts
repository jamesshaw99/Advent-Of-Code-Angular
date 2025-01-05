import { year2024day8 } from '../day8';
import { Point } from '../../../models/point';

describe('2024 day8', () => {
  let dayInstance: year2024day8;

  beforeEach(() => {
    dayInstance = new year2024day8();
    dayInstance.input = [
      '............',
      '........0...',
      '.....0......',
      '.......0....',
      '....0.......',
      '......A.....',
      '............',
      '............',
      '........A...',
      '.........A..',
      '............',
      '............',
    ];
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('should return the correct number of unique antinode locations', () => {
      const result = dayInstance.part1();
      expect(result).toBe('Number of unique antinode locations: 14');
    });
  });

  describe('part2', () => {
    it('should return the correct number of unique antinode locations with resonance', () => {
      const result = dayInstance.part2();
      expect(result).toBe('Number of unique antinodes with resonance: 34');
    });
  });

  describe('preChallenge', () => {
    it('should collect antennas correctly from the input', () => {
      const expected: Record<string, Point[]> = {
        '0': [
          { x: 1, y: 8 },
          { x: 2, y: 5 },
          { x: 3, y: 7 },
          { x: 4, y: 4 },
        ],
        A: [
          { x: 5, y: 6 },
          { x: 8, y: 8 },
          { x: 9, y: 9 },
        ],
      };

      dayInstance.preChallenge();
      expect(dayInstance.antennas).toEqual(expected);
    });
  });

  describe('processAntennas', () => {
    it('should correctly calculate antinode positions without resonance', () => {
      const points: Point[] = [
        { x: 4, y: 6 },
        { x: 6, y: 7 },
      ];
      const antinodePositions = new Set<string>();

      dayInstance.processAntennas(points, antinodePositions, false);

      expect(antinodePositions.size).toBe(2);
      expect(antinodePositions.has('2,5')).toBeTrue();
      expect(antinodePositions.has('8,8')).toBeTrue();
    });

    it('should correctly calculate antinode positions with resonance', () => {
      const points: Point[] = [
        { x: 4, y: 6 },
        { x: 6, y: 7 },
      ];
      const antinodePositions = new Set<string>();

      dayInstance.processAntennas(points, antinodePositions, true);

      expect(antinodePositions.size).toBe(6);
      expect(antinodePositions.has('0,4')).toBeTrue();
      expect(antinodePositions.has('2,5')).toBeTrue();
      expect(antinodePositions.has('4,6')).toBeTrue();
      expect(antinodePositions.has('6,7')).toBeTrue();
      expect(antinodePositions.has('8,8')).toBeTrue();
      expect(antinodePositions.has('10,9')).toBeTrue();
    });
  });
});
