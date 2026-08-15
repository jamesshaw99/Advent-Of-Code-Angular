import { year2018day14 } from '../day14';

describe('2018 day14', () => {
  let instance: year2018day14;

  beforeEach(() => {
    instance = new year2018day14();
  });

  describe('part1', () => {
    it.each([
      ['9', 'Next ten recipe scores: 5158916779'],
      ['5', 'Next ten recipe scores: 0124515891'],
      ['18', 'Next ten recipe scores: 9251071085'],
      ['2018', 'Next ten recipe scores: 5941429882'],
    ])('finds the ten recipe scores after %s recipes', (input, expected) => {
      instance.input = [input];
      instance.preChallenge();
      expect(instance.part1()).toBe(expected);
    });
  });

  describe('part2', () => {
    it.each([
      ['51589', 'Recipes to the left of the match: 9'],
      ['01245', 'Recipes to the left of the match: 5'],
      ['92510', 'Recipes to the left of the match: 18'],
      ['59414', 'Recipes to the left of the match: 2018'],
    ])('finds how many recipes appear before the sequence %s', (input, expected) => {
      instance.input = [input];
      instance.preChallenge();
      expect(instance.part2()).toBe(expected);
    });
  });
});
