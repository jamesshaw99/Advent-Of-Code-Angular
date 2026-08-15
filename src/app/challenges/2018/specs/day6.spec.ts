import { year2018day6 } from '../day6';

describe('2018 day6', () => {
  let instance: year2018day6;

  beforeEach(() => {
    instance = new year2018day6();
    instance.input = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the largest finite area', () => {
      expect(instance.part1()).toBe('Largest finite area: 17');
    });
  });

  describe('part2', () => {
    it('finds the size of the region within the given total-distance threshold', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((instance as any).regionSize(32)).toBe(16);
    });
  });
});
