import { year2024day7 } from '../day7';

describe('2024 day7', () => {
  let dayInstance: year2024day7;

  beforeEach(() => {
    dayInstance = new year2024day7();
    dayInstance.input = [
      '190: 10 19',
      '3267: 81 40 27',
      '83: 17 5',
      '156: 15 6',
      '7290: 6 8 6 15',
      '161011: 16 10 13',
      '192: 17 8 14',
      '21037: 9 7 18 13',
      '292: 11 6 16 20',
    ];
  });

  it('should correctly evaluate expressions with + and *', () => {
    const numbers = [10, 19];
    const operators = ['*'];
    expect(dayInstance.evaluateExpression(numbers, operators)).toBe(190);
  });

  it('should correctly evaluate expressions with ||', () => {
    const numbers = [15, 6];
    const operators = ['||'];
    expect(dayInstance.evaluateExpression(numbers, operators)).toBe(156);
  });

  it('should generate all operator combinations correctly', () => {
    const combinations = dayInstance.generateOperators(2);
    expect(combinations).toEqual([
      ['+', '+'],
      ['+', '*'],
      ['+', '||'],
      ['*', '+'],
      ['*', '*'],
      ['*', '||'],
      ['||', '+'],
      ['||', '*'],
      ['||', '||'],
    ]);
  });

  it('should calculate part1 correctly', () => {
    expect(dayInstance.part1()).toBe('Total Calibration Result: 3749');
  });

  it('should calculate part2 correctly', () => {
    expect(dayInstance.part2()).toBe('Total Calibration Result: 11387');
  });
});
