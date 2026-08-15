import { year2019day10 } from '../day10';

describe('2019 day10', () => {
  let instance: year2019day10;

  beforeEach(() => {
    instance = new year2019day10();
    instance.input = [
      '.#..##.###...#######',
      '##.############..##.',
      '.#.######.########.#',
      '.###.#######.####.#.',
      '#####.##.#.##.###.##',
      '..#####..#.#########',
      '####################',
      '#.####....###.#.#.##',
      '##.#################',
      '#####.##.###..####..',
      '..######..##.#######',
      '####.##.####...##..#',
      '.#####..#.######.###',
      '##...#.##########...',
      '#.##########.#######',
      '.####.#.###.###.#.##',
      '....##.##.###..#####',
      '.#.#.###########.###',
      '#.#.#.#####.####.###',
      '###.##.####.##.#..##',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the best asteroid station with the most other asteroids in direct line of sight', () => {
      expect(instance.part1()).toBe('Asteroids visible from best station: 210');
    });
  });

  describe('part2', () => {
    it('finds the 200th asteroid vaporized by the rotating laser', () => {
      expect(instance.part2()).toBe('200th asteroid vaporized: 802');
    });
  });
});
