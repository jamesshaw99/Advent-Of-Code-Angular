import { year2020day9 } from '../day9';

describe('2020 day9', () => {
  let instance: year2020day9;

  beforeEach(() => {
    instance = new year2020day9();
    instance.preambleLen = 5;
    instance.input = [
      '35', '20', '15', '25', '47', '40', '62', '55', '65', '95',
      '102', '117', '150', '182', '127', '219', '299', '277', '309', '576',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the first number that is not a sum of two of the preceding 5 numbers', () => {
      expect(instance.part1()).toBe('First invalid number: 127');
    });
  });

  describe('part2', () => {
    it('finds the contiguous range summing to the invalid number and adds its min and max', () => {
      instance.part1();
      expect(instance.part2()).toBe('Encryption weakness: 62');
    });
  });
});
