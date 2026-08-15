import { year2020day5 } from '../day5';

describe('2020 day5', () => {
  let instance: year2020day5;

  beforeEach(() => {
    instance = new year2020day5();
  });

  describe('part1', () => {
    it('decodes boarding passes and reports the highest seat ID', () => {
      instance.input = ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Highest seat ID: 820');
    });
  });

  describe('part2', () => {
    // AoC gives no worked example for part2 (it depends on gaps in your own boarding
    // pass list). This constructs a small contiguous range (seat IDs 10,11,13,14) with
    // a single gap at 12, whose neighbours (11 and 13) are present, per the puzzle rules.
    it('finds the single missing seat ID whose neighbours are both present', () => {
      instance.input = ['FFFFFFBLRL', 'FFFFFFBLRR', 'FFFFFFBRLR', 'FFFFFFBRRL'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Id of my seat: 12');
    });
  });
});
