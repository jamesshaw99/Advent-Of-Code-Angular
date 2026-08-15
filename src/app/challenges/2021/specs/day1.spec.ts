import { year2021day1 } from '../day1';

describe('2021 day1', () => {
  const officialInput = ['199', '200', '208', '210', '200', '207', '240', '269', '260', '263'];

  let dayInstance: year2021day1;

  beforeEach(() => {
    dayInstance = new year2021day1();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts the number of measurements larger than the previous measurement', () => {
      expect(dayInstance.part1()).toBe('Measurements increased 7 times');
    });
  });

  describe('part2', () => {
    it('counts the number of three-measurement sliding window sums that increase', () => {
      expect(dayInstance.part2()).toBe('Measurements increased 5 times');
    });
  });
});
