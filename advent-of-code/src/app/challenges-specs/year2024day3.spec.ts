import { year2024day3 } from '../challenges/year2024day3';

describe('year2024day3 Class', () => {
  let instance: year2024day3;
  const input1 = [
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
  ];
  const input2 = [
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
  ];

  beforeEach(() => {
    instance = new year2024day3();
  });

  describe('preChallenge', () => {
    it('should correctly concatenate input into memory', () => {
      // Arrange
      instance.input = input1;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.memory).toBe(
        'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
      );
    });
  });

  describe('part1', () => {
    it('should calculate the sum of all multiplications in memory', () => {
      // Arrange
      instance.input = input1;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Results of multiplications: 161');
    });

    it('should return 0 for memory with no valid multiplications', () => {
      // Arrange
      instance.input = ['add(2,3)', 'sub(4,5)'];
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Results of multiplications: 0');
    });
  });

  describe('part2', () => {
    it('should calculate the sum of enabled multiplications only', () => {
      // Arrange
      instance.input = input2;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Results of just enabled multiplications: 48');
    });

    it('should handle cases with no enabled multiplications', () => {
      // Arrange
      instance.input = ["don't()mul(4,5)don't()mul(6,7)"];
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Results of just enabled multiplications: 0');
    });

    it('should process input with multiple "do()" segments', () => {
      // Arrange
      instance.input = ["do()mul(4,5)don't()mul(6,7)do()mul(8,9)"];
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Results of just enabled multiplications: 92');
    });
  });

  describe('calculate', () => {
    it('should correctly calculate sum of multiplications from a string', () => {
      // Act
      const result = instance.calculate(input1[0]);

      // Assert
      expect(result).toBe(2 * 4 + 5 * 5 + 11 * 8 + 8 * 5); // 8 + 25 + 88 + 40 = 161
    });

    it('should return 0 if no valid multiplications are found', () => {
      // Arrange
      const input = 'add(2,3)sub(4,5)';

      // Act
      const result = instance.calculate(input);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input gracefully', () => {
      // Arrange
      instance.input = [];
      instance.preChallenge();

      // Act
      const part1Result = instance.part1();
      const part2Result = instance.part2();

      // Assert
      expect(part1Result).toBe('Results of multiplications: 0');
      expect(part2Result).toBe('Results of just enabled multiplications: 0');
    });

    it('should handle memory with no valid patterns', () => {
      // Arrange
      instance.input = ['invalid(123,456)', "junk()don't()morejunk"];
      instance.preChallenge();

      // Act
      const part1Result = instance.part1();
      const part2Result = instance.part2();

      // Assert
      expect(part1Result).toBe('Results of multiplications: 0');
      expect(part2Result).toBe('Results of just enabled multiplications: 0');
    });

    it('should handle extremely large inputs', () => {
      // Arrange
      instance.input = Array(1000).fill('mul(1,2)').concat("don't()mul(3,4)");
      instance.preChallenge();

      // Act
      const part1Result = instance.part1();
      const part2Result = instance.part2();

      // Assert
      expect(part1Result).toBe(`Results of multiplications: 2012`);
      expect(part2Result).toBe(`Results of just enabled multiplications: 2000`);
    });
  });
});
