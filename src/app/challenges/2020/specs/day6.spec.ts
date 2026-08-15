import { year2020day6 } from '../day6';

describe('2020 day6', () => {
  let instance: year2020day6;

  beforeEach(() => {
    instance = new year2020day6();
    instance.input = [
      'abc',
      '',
      'a',
      'b',
      'c',
      '',
      'ab',
      'ac',
      '',
      'a',
      'a',
      'a',
      'a',
      '',
      'b',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('sums the count of questions anyone in each group answered yes to', () => {
      expect(instance.part1()).toBe("Total count of questions answered 'yes': 11");
    });
  });

  describe('part2', () => {
    it('sums the count of questions everyone in each group answered yes to', () => {
      expect(instance.part2()).toBe("Total count of questions everyone answered 'yes': 6");
    });
  });
});
