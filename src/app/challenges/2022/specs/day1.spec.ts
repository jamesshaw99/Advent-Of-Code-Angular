import { year2022day1 } from '../day1';

describe('2022 day1', () => {
  const officialInput = [
    '1000',
    '2000',
    '3000',
    '',
    '4000',
    '',
    '5000',
    '6000',
    '',
    '7000',
    '8000',
    '9000',
    '',
    '10000',
  ];

  let dayInstance: year2022day1;

  beforeEach(() => {
    dayInstance = new year2022day1();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('finds the most calories carried by a single elf', () => {
      expect(dayInstance.part1()).toBe('The most calories carried by an elf is 24000');
    });
  });

  describe('part2', () => {
    it('sums the calories carried by the top three elves', () => {
      expect(dayInstance.part2()).toBe('The total calories of the top thee elves is 45000');
    });
  });
});
