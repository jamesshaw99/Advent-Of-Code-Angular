import { year2020day14 } from '../day14';

describe('2020 day14', () => {
  describe('part1', () => {
    it('masks written values (value-mask example)', () => {
      const instance = new year2020day14();
      instance.input = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        'mem[8] = 11',
        'mem[7] = 101',
        'mem[8] = 0',
      ];
      instance.preChallenge();
      expect(instance.part1()).toBe('Sum of values left in memory: 165');
    });
  });

  describe('part2', () => {
    it('masks memory addresses with floating bits (address-mask example)', () => {
      const instance = new year2020day14();
      instance.input = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 100',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 1',
      ];
      instance.preChallenge();
      expect(instance.part2()).toBe('Sum of values left in memory: 208');
    });
  });
});
