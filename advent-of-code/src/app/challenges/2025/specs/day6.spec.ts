import { year2025day6, Problem } from '../day6';

describe('2025 day 6', () => {
  let instance: year2025day6;
  const input: string[] = [
    '123 328  51 64 ',
    ' 45 64  387 23 ',
    '  6 98  215 314',
    '*   +   *   + ',
  ];

  beforeEach(() => {
    instance = new year2025day6();
    instance.input = input;
    instance.preChallenge();
  });

  describe('PreChallenge', () => {
    it('should split input into problems', () => {
      // Arrange
      const problems: Problem[] = [
        {
          numbers: [123, 45, 6],
          part2numbers: [356, 24, 1],
          operation: '*',
        },{
          numbers: [328,64,98],
          part2numbers: [8, 248, 369],
          operation: '+',
        },{
          numbers: [51,387,215],
          part2numbers: [175, 581, 32],
          operation: '*',
        },{
          numbers: [64,23,314],
          part2numbers: [4, 431, 623],
          operation: '+',
        },
      ];
      
      // Assert
      expect(instance.problems).toEqual(problems);
    });
  });

  describe('Challenges', () => {
    it('Part 1 should calculate the grand total', () => {
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('The grand total is 4277556');
    })

    it('Part 2 should calculate the grand total', () => {
        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('The grand total is 3263827');
    })
  })
});
