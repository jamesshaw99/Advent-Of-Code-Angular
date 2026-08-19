import { year2024day17 } from '../day17';

describe('2024 day17', () => {
  let instance: year2024day17;

  const input: string[] = [
    'Register A: 729',
    'Register B: 0',
    'Register C: 0',
    '',
    'Program: 0,1,5,4,3,0',
  ];

  beforeEach(() => {
    instance = new year2024day17();
  });

  describe('preChallenge', () => {
    it('should parse the registers and program', () => {
      // Arrange
      instance.input = input;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.registerA).toBe(729n);
      expect(instance.registerB).toBe(0n);
      expect(instance.registerC).toBe(0n);
      expect(instance.program).toEqual([0, 1, 5, 4, 3, 0]);
    });
  });

  describe('challenges', () => {
    it('should produce the expected output string in part1', () => {
      // Arrange
      instance.input = input;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Program output: 4,6,3,5,6,3,5,2,1,0');
    });
  });

  describe('findLowestQuineA', () => {
    it('should find the lowest initial A that makes the program output a copy of itself', () => {
      // Act
      const result = instance.findLowestQuineA([0, 3, 5, 4, 3, 0]);

      // Assert
      expect(result).toBe(117440n);
    });

    it('should not overflow 32-bit bitwise operations when the search explores very large candidate A values', () => {
      // Arrange: a 16-instruction program (matching the shape of real puzzle inputs) that
      // requires searching candidate A values far beyond the 32-bit integer range
      const program = [2, 4, 1, 7, 7, 5, 0, 3, 4, 0, 1, 7, 5, 5, 3, 0];

      // Act
      const result = instance.findLowestQuineA(program);

      // Assert
      expect(result).not.toBeNull();
      expect(instance.runProgram(result!, 0n, 0n, program).output).toEqual(program);
    });
  });

  describe('challenges (part2)', () => {
    it('should report the lowest quine A for the part2 example program', () => {
      // Arrange
      instance.input = [
        'Register A: 2024',
        'Register B: 0',
        'Register C: 0',
        '',
        'Program: 0,3,5,4,3,0',
      ];
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Lowest initial A that outputs a copy of the program: 117440');
    });
  });

  describe('runProgram (worked examples)', () => {
    it('should set register B to 1 if register C contains 9 and the program is 2,6', () => {
      // Act
      const result = instance.runProgram(0n, 0n, 9n, [2, 6]);

      // Assert
      expect(result.b).toBe(1n);
    });

    it('should output 0,1,2 if register A contains 10 and the program is 5,0,5,1,5,4', () => {
      // Act
      const result = instance.runProgram(10n, 0n, 0n, [5, 0, 5, 1, 5, 4]);

      // Assert
      expect(result.output).toEqual([0, 1, 2]);
    });

    it('should output 4,2,5,6,7,7,7,7,3,1,0 and leave A at 0 if A contains 2024 and the program is 0,1,5,4,3,0', () => {
      // Act
      const result = instance.runProgram(2024n, 0n, 0n, [0, 1, 5, 4, 3, 0]);

      // Assert
      expect(result.output).toEqual([4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
      expect(result.a).toBe(0n);
    });

    it('should set register B to 26 if register B contains 29 and the program is 1,7', () => {
      // Act
      const result = instance.runProgram(0n, 29n, 0n, [1, 7]);

      // Assert
      expect(result.b).toBe(26n);
    });

    it('should set register B to 44354 if B contains 2024 and C contains 43690 and the program is 4,0', () => {
      // Act
      const result = instance.runProgram(0n, 2024n, 43690n, [4, 0]);

      // Assert
      expect(result.b).toBe(44354n);
    });

    it('should not truncate XOR results when B or C exceed the 32-bit integer range', () => {
      // Act: values chosen well above 2^31 (2147483648), where JS's `^` operator would
      // incorrectly wrap if registers were plain numbers instead of bigints
      const result = instance.runProgram(0n, 274877906944n, 1n, [1, 5]);

      // Assert
      expect(result.b).toBe(274877906944n ^ 5n);
    });
  });
});
