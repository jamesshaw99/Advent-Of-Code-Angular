import { year2023day1 } from '../day1';

describe('2023 day1', () => {
  describe('part1', () => {
    it('combines the first and last digit on each line', () => {
      const dayInstance = new year2023day1();
      dayInstance.input = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];
      expect(dayInstance.part1()).toBe('Sum of values: 142');
    });
  });

  describe('part2', () => {
    it('also recognises digits spelled out with letters', () => {
      const dayInstance = new year2023day1();
      dayInstance.input = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ];
      expect(dayInstance.part2()).toBe('Sum of values: 281');
    });
  });
});
