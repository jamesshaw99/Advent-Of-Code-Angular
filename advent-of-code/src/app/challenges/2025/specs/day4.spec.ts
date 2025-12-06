import { year2025day4 } from '../day4';

describe('2025 day 4', () => {
  let instance: year2025day4;
  const input: string[] = [
    '..@@.@@@@.',
    '@@@.@.@.@@',
    '@@@@@.@.@@',
    '@.@@@@..@.',
    '@@.@@@@.@@',
    '.@@@@@@@.@',
    '.@.@.@.@@@',
    '@.@@@.@@@@',
    '.@@@@@@@@.',
    '@.@.@@@.@.',
  ];

  beforeEach(() => {
    instance = new year2025day4();
    instance.input = input;
    instance.preChallenge();
  });

  describe('Challenges', () => {
    it('part 1 should calculate the number of accessible rolls', () => {
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('13 rolls can be accessed by a forklift')
    })

    it('part 2 should calculate the number of rolls that can be removed', () => {
        // Arrange
        instance.part1();

        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('43 rolls can be removed')
    })
  })
});
