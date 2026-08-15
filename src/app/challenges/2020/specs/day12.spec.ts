import { year2020day12 } from '../day12';

describe('2020 day12', () => {
  let instance: year2020day12;

  beforeEach(() => {
    instance = new year2020day12();
    instance.input = ['F10', 'N3', 'F7', 'R90', 'F11'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('moves the ship directly and reports the Manhattan distance', () => {
      expect(instance.part1()).toBe('Manhattan distance: 25');
    });
  });

  describe('part2', () => {
    it('moves the ship via the rotating waypoint and reports the Manhattan distance', () => {
      expect(instance.part2()).toBe('Manhattan distance: 286');
    });
  });
});
