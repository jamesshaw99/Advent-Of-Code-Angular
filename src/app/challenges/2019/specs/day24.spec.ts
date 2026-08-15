import { year2019day24 } from '../day24';

describe('2019 day24', () => {
  let instance: year2019day24;

  beforeEach(() => {
    instance = new year2019day24();
    instance.input = ['....#', '#..#.', '#..##', '..#..', '#....'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the biodiversity rating of the first repeated grid layout', () => {
      expect(instance.part1()).toBe('Biodiversity rating: 2129920');
    });
  });

  describe('part2', () => {
    it('counts the total bugs across all recursive layers after 10 minutes', () => {
      instance.minutes = 10;
      expect(instance.part2()).toBe('Total bugs across all recursive layers: 99');
    });
  });
});
