import { year2023day5 } from '../day5';

describe('2023 day5', () => {
  const officialInput = [
    'seeds: 79 14 55 13',
    '',
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
  ];

  let dayInstance: year2023day5;

  beforeEach(() => {
    dayInstance = new year2023day5();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('finds the lowest location number reachable from the individual seed numbers', () => {
      expect(dayInstance.part1()).toBe('Lowest location: 35');
    });
  });

  describe('part2', () => {
    it('finds the lowest location number reachable from the seed ranges', () => {
      expect(dayInstance.part2()).toBe('Lowest location: 46');
    });
  });
});
