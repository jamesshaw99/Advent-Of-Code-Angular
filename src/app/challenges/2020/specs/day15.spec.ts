import { year2020day15 } from '../day15';

describe('2020 day15', () => {
  describe('part1', () => {
    it('finds the 2020th number spoken', () => {
      const instance = new year2020day15();
      instance.input = ['0,3,6'];
      instance.preChallenge();
      expect(instance.part1()).toBe('The 2020th number spoken is: 436');
    });
  });

  describe('part2', () => {
    // Inherently requires running the full 30,000,000-turn simulation - there is no
    // smaller equivalent AoC example for this part. Given a longer timeout accordingly.
    it(
      'finds the 30000000th number spoken',
      () => {
        const instance = new year2020day15();
        instance.input = ['0,3,6'];
        instance.preChallenge();
        expect(instance.part2()).toBe('The 30000000th number spoken is: 175594');
      },
      30_000
    );
  });
});
