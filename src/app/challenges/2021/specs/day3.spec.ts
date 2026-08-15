import { year2021day3 } from '../day3';

describe('2021 day3', () => {
  const officialInput = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ];

  let dayInstance: year2021day3;

  beforeEach(() => {
    dayInstance = new year2021day3();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('multiplies the gamma rate by the epsilon rate', () => {
      expect(dayInstance.part1()).toBe('Gamma: 22, Epsilon: 9, Power Consumption: 198');
    });
  });

  describe('part2', () => {
    it('multiplies the oxygen generator rating by the CO2 scrubber rating', () => {
      expect(dayInstance.part2()).toBe(
        'Oxygen Generator: 23, CO2 Scrubber: 10, Life Support Rating: 230'
      );
    });
  });
});
