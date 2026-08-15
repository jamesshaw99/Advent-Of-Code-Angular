import { year2023day11 } from '../day11';

describe('2023 day11', () => {
  const officialInput = [
    '...#......',
    '.......#..',
    '#.........',
    '..........',
    '......#...',
    '.#........',
    '.........#',
    '..........',
    '.......#..',
    '#...#.....',
  ];

  let dayInstance: year2023day11;

  beforeEach(() => {
    dayInstance = new year2023day11();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('sums the shortest path between every pair of galaxies after doubling empty rows/columns', () => {
      expect(dayInstance.part1()).toBe('Sum of shortest paths: 374');
    });

    it('matches the 10x and 100x expansion examples given for this same image', () => {
      expect(dayInstance.computeTotalDistance(10)).toBe(1030);
      expect(dayInstance.computeTotalDistance(100)).toBe(8410);
    });
  });

  describe('part2', () => {
    it('sums the shortest path between every pair of galaxies after a million-fold expansion', () => {
      expect(dayInstance.part2()).toBe('Sum of shortest paths: 82000210');
    });
  });
});
