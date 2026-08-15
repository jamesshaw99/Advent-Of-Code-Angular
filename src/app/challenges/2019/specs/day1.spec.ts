import { year2019day1 } from '../day1';

describe('2019 day1', () => {
  let instance: year2019day1;

  beforeEach(() => {
    instance = new year2019day1();
  });

  describe('part1', () => {
    it('calculates fuel for a single module', () => {
      instance.input = ['12'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Total fuel: 2');
    });

    it('sums fuel across multiple modules', () => {
      instance.input = ['12', '14', '1969', '100756'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Total fuel: 34241');
    });
  });

  describe('part2', () => {
    it('accounts for fuel required by the fuel itself', () => {
      instance.input = ['1969'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Total fuel: 966');
    });

    it('sums recursive fuel requirements across multiple modules', () => {
      instance.input = ['14', '1969', '100756'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Total fuel: 51314');
    });
  });
});
