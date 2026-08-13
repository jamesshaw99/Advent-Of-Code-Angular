import { year2025day7 } from '../day7';

describe('2025 day 7', () => {
  let instance: year2025day7;
  const input: string[] = [
    '.......S.......',
    '...............',
    '.......^.......',
    '...............',
    '......^.^......',
    '...............',
    '.....^.^.^.....',
    '...............',
    '....^.^...^....',
    '...............',
    '...^.^...^.^...',
    '...............',
    '..^...^.....^..',
    '...............',
    '.^.^.^.^.^...^.',
    '...............',
  ];

  beforeEach(() => {
    instance = new year2025day7();
    instance.input = input;
    instance.preChallenge();
  });

  describe('Challenges', () => {
    it('Part 1 should calculate number of beam splits', () => {
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('The beam will be split 21 times');
    });

    it('Part 2 should calculate the number of different timelines', () => {
        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('A single tachyon particle would end up on 40 different timelines')
    })
  });
});
