import { year2022day3 } from '../day3';

describe('2022 day3', () => {
  const officialInput = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ];

  let dayInstance: year2022day3;

  beforeEach(() => {
    dayInstance = new year2022day3();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('sums the priority of the item type common to both compartments of each rucksack', () => {
      expect(dayInstance.part1()).toBe('Sum of priorities: 157');
    });
  });

  describe('part2', () => {
    it('sums the priority of the badge item type shared by each group of three elves', () => {
      expect(dayInstance.part2()).toBe('Group sum of priorities: 70');
    });
  });
});
