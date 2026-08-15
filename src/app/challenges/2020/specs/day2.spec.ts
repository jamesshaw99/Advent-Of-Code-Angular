import { year2020day2 } from '../day2';

describe('2020 day2', () => {
  let instance: year2020day2;

  beforeEach(() => {
    instance = new year2020day2();
    instance.input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts passwords with a valid character count', () => {
      expect(instance.part1()).toBe('2 passwords are valid');
    });
  });

  describe('part2', () => {
    it('counts passwords where exactly one of the two positions holds the letter', () => {
      expect(instance.part2()).toBe('1 passwords are valid');
    });
  });
});
