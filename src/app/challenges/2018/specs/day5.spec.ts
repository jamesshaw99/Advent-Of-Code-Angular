import { year2018day5 } from '../day5';

describe('2018 day5', () => {
  let instance: year2018day5;

  beforeEach(() => {
    instance = new year2018day5();
    instance.input = ['dabAcCaCBAcCcaDA'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('fully reacts the polymer and counts remaining units', () => {
      expect(instance.part1()).toBe('Units remaining: 10');
    });
  });

  describe('part2', () => {
    it('finds the shortest polymer after removing the most problematic unit type', () => {
      expect(instance.part2()).toBe('Shortest polymer after removing one unit type: 4');
    });
  });
});
