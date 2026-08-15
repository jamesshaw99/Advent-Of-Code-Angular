import { year2019day20 } from '../day20';

describe('2019 day20', () => {
  let instance: year2019day20;

  beforeEach(() => {
    instance = new year2019day20();
  });

  const smallMaze = [
    '         A           ',
    '         A           ',
    '  #######.#########  ',
    '  #######.........#  ',
    '  #######.#######.#  ',
    '  #######.#######.#  ',
    '  #######.#######.#  ',
    '  #####  B    ###.#  ',
    'BC...##  C    ###.#  ',
    '  ##.##       ###.#  ',
    '  ##...DE  F  ###.#  ',
    '  #####    G  ###.#  ',
    '  #########.#####.#  ',
    'DE..#######...###.#  ',
    '  #.#########.###.#  ',
    'FG..#########.....#  ',
    '  ###########.#####  ',
    '             Z       ',
    '             Z       '
  ];

  describe('part1', () => {
    it('finds the shortest outer-to-outer path through the example maze (23 steps)', () => {
      instance.input = smallMaze;
      instance.preChallenge();
      expect(instance.part1()).toBe('23');
    });
  });

  describe('part2', () => {
    it('finds the shortest path once portals recurse into nested maze levels (26 steps)', () => {
      instance.input = smallMaze;
      instance.preChallenge();
      expect(instance.part2()).toBe('26');
    });
  });
});
