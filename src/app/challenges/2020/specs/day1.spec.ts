import { year2020day1 } from '../day1';

describe('2020 day1', () => {
  let instance: year2020day1;

  beforeEach(() => {
    instance = new year2020day1();
    instance.input = ['1721', '979', '366', '299', '675', '1456'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the two entries that sum to 2020 and multiplies them', () => {
      expect(instance.part1()).toBe('Product of entries that sum to 2020: 514579');
    });
  });

  describe('part2', () => {
    it('finds the three entries that sum to 2020 and multiplies them', () => {
      expect(instance.part2()).toBe('Product of entries that sum to 2020: 241861950');
    });
  });
});
