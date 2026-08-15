import { year2020day11 } from '../day11';

describe('2020 day11', () => {
  let instance: year2020day11;

  beforeEach(() => {
    instance = new year2020day11();
    instance.input = [
      'L.LL.LL.LL',
      'LLLLLLL.LL',
      'L.L.L..L..',
      'LLLL.LL.LL',
      'L.LL.LL.LL',
      'L.LLLLL.LL',
      '..L.L.....',
      'LLLLLLLLLL',
      'L.LLLLLL.L',
      'L.LLLLL.LL',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts occupied seats once the adjacent-seat rules stabilize', () => {
      expect(instance.part1()).toBe('Number of occupied seats: 37');
    });
  });

  describe('part2', () => {
    it('counts occupied seats once the visible-seat rules stabilize', () => {
      expect(instance.part2()).toBe('Number of occupied seats: 26');
    });
  });
});
