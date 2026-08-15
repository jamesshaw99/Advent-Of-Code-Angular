import { year2019day6 } from '../day6';

describe('2019 day6', () => {
  let instance: year2019day6;

  beforeEach(() => {
    instance = new year2019day6();
  });

  describe('part1', () => {
    it('counts direct and indirect orbits', () => {
      instance.input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Total number of orbits: 42');
    });
  });

  describe('part2', () => {
    it('finds the minimum orbital transfers from YOU to SAN', () => {
      instance.input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Minimum orbital transfers from YOU to SAN: 4');
    });
  });
});
