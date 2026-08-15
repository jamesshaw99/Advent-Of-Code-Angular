import { year2021day11 } from '../day11';

describe('2021 day11', () => {
  const officialInput = [
    '5483143223',
    '2745854711',
    '5264556173',
    '6141336146',
    '6357385478',
    '4167524645',
    '2176841721',
    '6882881134',
    '4846848554',
    '5283751526',
  ];

  let dayInstance: year2021day11;

  beforeEach(() => {
    dayInstance = new year2021day11();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts the total number of flashes after 100 steps', () => {
      expect(dayInstance.part1()).toBe('Total number of flashes after 100 steps: 1656');
    });
  });

  describe('part2', () => {
    it('finds the first step where all octopuses flash simultaneously', () => {
      expect(dayInstance.part2()).toBe('All flash after 195 steps');
    });
  });
});
