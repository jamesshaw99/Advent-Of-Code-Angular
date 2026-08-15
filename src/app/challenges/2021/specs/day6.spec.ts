import { year2021day6 } from '../day6';

describe('2021 day6', () => {
  const officialInput = ['3,4,3,1,2'];

  let dayInstance: year2021day6;

  beforeEach(() => {
    dayInstance = new year2021day6();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts the total lanternfish after 80 days', () => {
      expect(dayInstance.part1()).toBe('After 80, there are a total of 5934 fish');
    });
  });

  describe('part2', () => {
    it('counts the total lanternfish after 256 days', () => {
      expect(dayInstance.part2()).toBe('After 256, there are a total of 26984457539 fish');
    });
  });
});
