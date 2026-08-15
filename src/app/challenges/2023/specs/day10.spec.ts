import { year2023day10 } from '../day10';

describe('2023 day10', () => {
  describe('part1', () => {
    it('finds the number of steps to the point farthest along the loop from the start', () => {
      const dayInstance = new year2023day10();
      dayInstance.input = ['.....', '.S-7.', '.|.|.', '.L-J.', '.....'];
      dayInstance.preChallenge();
      expect(dayInstance.part1()).toBe('Steps to farthest point: 4');
    });
  });

  describe('part2', () => {
    it('counts the tiles enclosed by the loop', () => {
      const dayInstance = new year2023day10();
      dayInstance.input = [
        '...........',
        '.S-------7.',
        '.|F-----7|.',
        '.||.....||.',
        '.||.....||.',
        '.|L-7.F-J|.',
        '.|..|.|..|.',
        '.L--J.L--J.',
        '...........',
      ];
      dayInstance.preChallenge();
      dayInstance.part1();
      expect(dayInstance.part2()).toBe('Tiles enclosed by the loop: 4');
    });
  });
});
