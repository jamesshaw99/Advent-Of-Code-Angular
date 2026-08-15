import { year2021day14 } from '../day14';

describe('2021 day14', () => {
  const officialInput = [
    'NNCB',
    '',
    'CH -> B',
    'HH -> N',
    'CB -> H',
    'NH -> C',
    'HB -> C',
    'HC -> B',
    'HN -> C',
    'NN -> C',
    'BH -> H',
    'NC -> B',
    'NB -> B',
    'BN -> B',
    'BB -> N',
    'BC -> B',
    'CC -> N',
    'CN -> C',
  ];

  let dayInstance: year2021day14;

  beforeEach(() => {
    dayInstance = new year2021day14();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('finds the quantity difference between the most and least common elements after 10 steps', () => {
      expect(dayInstance.part1()).toBe('Quantity difference: 1588');
    });
  });

  describe('part2', () => {
    it('finds the quantity difference between the most and least common elements after 40 steps', () => {
      expect(dayInstance.part2()).toBe('Quantity difference: 2188189693529');
    });
  });
});
