import { year2024day5 } from '../day5';

describe('2024 day5', () => {
  let challenge: year2024day5;

  beforeEach(() => {
    challenge = new year2024day5();
    challenge.input = [
        '47|53',
        '97|13',
        '97|61',
        '97|47',
        '75|29',
        '61|13',
        '75|53',
        '29|13',
        '97|29',
        '53|29',
        '61|53',
        '97|53',
        '61|29',
        '47|13',
        '75|47',
        '97|75',
        '47|61',
        '75|61',
        '47|29',
        '75|13',
        '53|13',
        '',
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47'
    ];
  });

  describe('part1', () => {
    it('should calculate the sum of middle pages for ordered updates', () => {
      challenge.preChallenge();

      const result = challenge.part1();

      expect(result).toBe('Middle page total number: 143');
    });
  });

  describe('part2', () => {
    it('should calculate the sum of middle pages for reordered updates', () => {
      challenge.preChallenge();

      const result = challenge.part2();

      expect(result).toBe('Middle page total number: 123');
    });
  });

  describe('preChallenge', () => {
    it('should parse order rules and updates correctly', () => {
      challenge.preChallenge();

      expect(challenge['orderRules'].size).toBe(6);
      expect(challenge['orderRules'].get(47)).toEqual(new Set([53,13,61,29]));
      expect(challenge['orderRules'].get(97)).toEqual(new Set([13,61,47,29,53,75]));
      expect(challenge['orderRules'].get(75)).toEqual(new Set([29,53,47,61,13]));
      expect(challenge['orderRules'].get(61)).toEqual(new Set([13,53,29]));
      expect(challenge['orderRules'].get(29)).toEqual(new Set([13]));
      expect(challenge['orderRules'].get(53)).toEqual(new Set([29,13]));
      expect(challenge['updates']).toEqual([
        [75,47,61,53,29],
        [97,61,53,29,13],
        [75,29,13],
        [75,97,47,61,53],
        [61,13,29],
        [97,13,75,29,47]
      ]);
    });
  });

  describe('isOrdered', () => {
    it('should return true for an ordered update', () => {
      challenge['orderRules'].set(1, new Set([2]));
      challenge['orderRules'].set(2, new Set([3]));

      const result = challenge.isOrdered([1, 2, 3]);
      expect(result).toBeTrue();
    });

    it('should return false for an unordered update', () => {
      challenge['orderRules'].set(1, new Set([2]));
      challenge['orderRules'].set(2, new Set([3]));

      const result = challenge.isOrdered([3, 2, 1]);
      expect(result).toBeFalse();
    });
  });

  describe('topologicalSort', () => {
    it('should sort an unordered update correctly', () => {
      challenge['orderRules'].set(1, new Set([2]));
      challenge['orderRules'].set(2, new Set([3]));

      const result = challenge.topologicalSort([3, 2, 1]);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return the original order for an already ordered update', () => {
      challenge['orderRules'].set(1, new Set([2]));
      challenge['orderRules'].set(2, new Set([3]));

      const result = challenge.topologicalSort([1, 2, 3]);
      expect(result).toEqual([1, 2, 3]);
    });
  });
});
