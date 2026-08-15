import { year2020day18 } from '../day18';

describe('2020 day18', () => {
  let instance: year2020day18;

  beforeEach(() => {
    instance = new year2020day18();
    instance.input = [
      '1 + 2 * 3 + 4 * 5 + 6',
      '1 + (2 * 3) + (4 * (5 + 6))',
      '2 * 3 + (4 * 5)',
      '5 + (8 * 3 + 9 + 3 * 4 * 3)',
      '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
      '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('sums expressions evaluated left-to-right with equal precedence', () => {
      expect(instance.part1()).toBe('Sum of resulting values: 26457');
    });
  });

  describe('part2', () => {
    it('sums expressions evaluated with addition before multiplication', () => {
      expect(instance.part2()).toBe('Sum of results: 694173');
    });
  });
});
