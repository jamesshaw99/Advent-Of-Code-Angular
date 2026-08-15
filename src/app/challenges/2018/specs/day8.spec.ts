import { year2018day8 } from '../day8';

describe('2018 day8', () => {
  let instance: year2018day8;

  beforeEach(() => {
    instance = new year2018day8();
    instance.input = ['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('sums all metadata entries in the tree', () => {
      expect(instance.part1()).toBe('Sum of all metadata entries: 138');
    });
  });

  describe('part2', () => {
    it('computes the value of the root node', () => {
      expect(instance.part2()).toBe('Value of the root node: 66');
    });
  });
});
