import { year2020day23 } from '../day23';

describe('2020 day23', () => {
  describe('part1', () => {
    it('plays 100 moves and reports the labels clockwise from cup 1', () => {
      const instance = new year2020day23();
      instance.input = ['389125467'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Labels on cups after 100 moves: 67384529');
    });
  });

  describe('part2', () => {
    // Inherently requires simulating 1,000,000 cups through 10,000,000 moves - there's
    // no smaller equivalent AoC example for this part. Given a longer timeout accordingly.
    it(
      'plays ten million moves with a million cups and multiplies the two cups after cup 1',
      () => {
        const instance = new year2020day23();
        instance.input = ['389125467'];
        instance.preChallenge();
        expect(instance.part2()).toBe('Product of labels after ten million moves: 149245887792');
      },
      30_000
    );
  });
});
