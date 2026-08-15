import { year2020day17 } from '../day17';

describe('2020 day17', () => {
  let instance: year2020day17;

  beforeEach(() => {
    instance = new year2020day17();
    instance.input = ['.#.', '..#', '###'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts active cubes after 6 cycles in 3D', () => {
      expect(instance.part1()).toBe('Remaining active cubes after 6th cycle: 112');
    });
  });

  describe('part2', () => {
    it('counts active cubes after 6 cycles in 4D', () => {
      expect(instance.part2()).toBe('Remaining active cubes after 6th cycle: 848');
    });
  });
});
