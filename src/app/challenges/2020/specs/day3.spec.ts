import { year2020day3 } from '../day3';

describe('2020 day3', () => {
  let instance: year2020day3;

  beforeEach(() => {
    instance = new year2020day3();
    instance.input = [
      '..##.......',
      '#...#...#..',
      '.#....#..#.',
      '..#.#...#.#',
      '.#...##..#.',
      '..#.##.....',
      '.#.#.#....#',
      '.#........#',
      '#.##...#...',
      '#...##....#',
      '.#..#...#.#',
    ];
  });

  describe('part1', () => {
    it('counts trees encountered on the right-3-down-1 slope', () => {
      expect(instance.part1()).toBe('We would encounter 7 trees');
    });
  });

  describe('part2', () => {
    it('multiplies the tree counts across all five slopes', () => {
      expect(instance.part2()).toBe('Product of trees on each slope: 336');
    });
  });
});
