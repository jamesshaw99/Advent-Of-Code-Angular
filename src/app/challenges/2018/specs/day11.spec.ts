import { year2018day11 } from '../day11';

describe('2018 day11', () => {
  let instance: year2018day11;

  beforeEach(() => {
    instance = new year2018day11();
  });

  describe('power level calculation', () => {
    it.each([
      [3, 5, 8, 4],
      [122, 79, 57, -5],
      [217, 196, 39, 0],
      [101, 153, 71, 4],
    ])('computes the power level at (%i,%i) for serial %i as %i', (x, y, serial, expected) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((instance as any).powerLevel(x, y, serial)).toBe(expected);
    });
  });

  describe('part1', () => {
    it('finds the 3x3 square with the largest total power (serial 18)', () => {
      instance.input = ['18'];
      instance.preChallenge();
      expect(instance.part1()).toBe('33,45');
    });

    it('finds the 3x3 square with the largest total power (serial 42)', () => {
      instance.input = ['42'];
      instance.preChallenge();
      expect(instance.part1()).toBe('21,61');
    });
  });

  describe('part2', () => {
    it('finds the square of any size with the largest total power (serial 18)', () => {
      instance.input = ['18'];
      instance.preChallenge();
      expect(instance.part2()).toBe('90,269,16');
    });

    it('finds the square of any size with the largest total power (serial 42)', () => {
      instance.input = ['42'];
      instance.preChallenge();
      expect(instance.part2()).toBe('232,251,12');
    });
  });
});
