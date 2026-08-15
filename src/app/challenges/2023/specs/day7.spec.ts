import { year2023day7 } from '../day7';

describe('2023 day7', () => {
  const officialInput = ['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483'];

  describe('part1', () => {
    it('ranks hands by strength and sums bid times rank', () => {
      const dayInstance = new year2023day7();
      dayInstance.input = officialInput;
      dayInstance.preChallenge();
      expect(dayInstance.part1()).toBe('Total Winnings: 6440');
    });
  });

  describe('part2', () => {
    it('treats J as a joker that strengthens hand type but weakens tie-breaks', () => {
      const dayInstance = new year2023day7();
      dayInstance.input = officialInput;
      dayInstance.preChallenge();
      expect(dayInstance.part2()).toBe('Total Winnings: 5905');
    });
  });
});
