import { year2018day13 } from '../day13';

describe('2018 day13', () => {
  let instance: year2018day13;

  beforeEach(() => {
    instance = new year2018day13();
  });

  describe('part1', () => {
    it('finds the location of the first crash', () => {
      instance.input = [
        '/->-\\        ',
        '|   |  /----\\',
        '| /-+--+-\\  |',
        '| | |  | v  |',
        '\\-+-/  \\-+--/',
        '  \\------/   ',
      ];
      instance.preChallenge();
      expect(instance.part1()).toBe('7,3');
    });
  });

  describe('part2', () => {
    it('finds the location of the last remaining cart', () => {
      instance.input = [
        '/>-<\\  ',
        '|   |  ',
        '| /<+-\\',
        '| | | v',
        '\\>+</ |',
        '  |   ^',
        '  \\<->/',
      ];
      instance.preChallenge();
      expect(instance.part2()).toBe('6,4');
    });
  });
});
