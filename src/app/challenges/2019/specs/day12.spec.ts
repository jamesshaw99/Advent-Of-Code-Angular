import { year2019day12 } from '../day12';

describe('2019 day12', () => {
  let instance: year2019day12;

  beforeEach(() => {
    instance = new year2019day12();
  });

  describe('part1', () => {
    it('sums total energy (potential * kinetic per moon) after 10 steps for the first example', () => {
      instance.steps = 10;
      instance.input = ['<x=-1, y=0, z=2>', '<x=2, y=-10, z=-7>', '<x=4, y=-8, z=8>', '<x=3, y=5, z=-1>'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Total energy after 10 steps: 179');
    });

    it('sums total energy after 100 steps for the second example', () => {
      instance.steps = 100;
      instance.input = ['<x=-8, y=-10, z=0>', '<x=5, y=5, z=10>', '<x=2, y=-7, z=3>', '<x=9, y=-8, z=-3>'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Total energy after 100 steps: 1940');
    });
  });

  describe('part2', () => {
    it('finds the number of steps before the system repeats its initial state for the first example', () => {
      instance.input = ['<x=-1, y=0, z=2>', '<x=2, y=-10, z=-7>', '<x=4, y=-8, z=8>', '<x=3, y=5, z=-1>'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Steps until the system repeats its initial state: 2772');
    });

    it('finds the number of steps before the system repeats its initial state for the second example', () => {
      instance.input = ['<x=-8, y=-10, z=0>', '<x=5, y=5, z=10>', '<x=2, y=-7, z=3>', '<x=9, y=-8, z=-3>'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Steps until the system repeats its initial state: 4686774924');
    });
  });
});
