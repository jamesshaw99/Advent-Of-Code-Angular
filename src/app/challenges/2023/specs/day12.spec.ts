import { year2023day12 } from '../day12';

describe('2023 day12', () => {
  const officialInput = [
    '???.### 1,1,3',
    '.??..??...?##. 1,1,3',
    '?#?#?#?#?#?#?#? 1,3,1,6',
    '????.#...#... 4,1,1',
    '????.######..#####. 1,6,5',
    '?###???????? 3,2,1',
  ];

  describe('part1', () => {
    it('sums the number of valid arrangements for each row', () => {
      const dayInstance = new year2023day12();
      dayInstance.input = officialInput;
      expect(dayInstance.part1()).toBe('Total arrangements: 21');
    });
  });

  describe('part2', () => {
    it('sums the number of valid arrangements after unfolding each row fivefold', () => {
      const dayInstance = new year2023day12();
      dayInstance.input = officialInput;
      expect(dayInstance.part2()).toBe('Total arrangements: 525152');
    });
  });
});
