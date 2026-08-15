import { year2021day5 } from '../day5';

describe('2021 day5', () => {
  const officialInput = [
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2',
  ];

  let dayInstance: year2021day5;

  beforeEach(() => {
    dayInstance = new year2021day5();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts overlaps considering only horizontal and vertical lines', () => {
      expect(dayInstance.part1()).toBe('overlap points: 5');
    });
  });

  describe('part2', () => {
    it('counts overlaps considering horizontal, vertical, and diagonal lines', () => {
      expect(dayInstance.part2()).toBe('overlap points: 12');
    });
  });
});
