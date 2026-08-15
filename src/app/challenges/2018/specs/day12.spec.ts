import { year2018day12 } from '../day12';

describe('2018 day12', () => {
  let instance: year2018day12;

  beforeEach(() => {
    instance = new year2018day12();
    instance.input = [
      'initial state: #..#.#..##......###...###',
      '',
      '...## => #',
      '..#.. => #',
      '.#... => #',
      '.#.#. => #',
      '.#.## => #',
      '.##.. => #',
      '.#### => #',
      '#.#.# => #',
      '#.### => #',
      '##.#. => #',
      '##.## => #',
      '###.. => #',
      '###.# => #',
      '####. => #',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('sums the numbers of plant-containing pots after 20 generations', () => {
      expect(instance.part1()).toBe('Sum of plant pot numbers: 325');
    });
  });
});
