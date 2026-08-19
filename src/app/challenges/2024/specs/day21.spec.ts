import { year2024day21 } from '../day21';

describe('2024 day21', () => {
  let instance: year2024day21;

  const input: string[] = ['029A', '980A', '179A', '456A', '379A'];

  beforeEach(() => {
    instance = new year2024day21();
    instance.input = input;
    instance.preChallenge();
  });

  describe('preChallenge', () => {
    it('should parse the list of codes', () => {
      // Assert
      expect(instance.codes).toEqual(['029A', '980A', '179A', '456A', '379A']);
    });
  });

  describe('challenges', () => {
    it('should compute the total complexity in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Sum of code complexities: 126384');
    });
  });

  describe('sequenceCost', () => {
    it('should compute the shortest sequence length for each sample code at depth 2', () => {
      // Act & Assert
      expect(instance.sequenceCost('numeric', '029A', 2)).toBe(68);
      expect(instance.sequenceCost('numeric', '980A', 2)).toBe(60);
      expect(instance.sequenceCost('numeric', '179A', 2)).toBe(68);
      expect(instance.sequenceCost('numeric', '456A', 2)).toBe(64);
      expect(instance.sequenceCost('numeric', '379A', 2)).toBe(64);
    });
  });

  describe('complexity', () => {
    it('should multiply the shortest sequence length by the numeric part of the code', () => {
      // Act & Assert
      expect(instance.complexity('029A', 2)).toBe(1972);
      expect(instance.complexity('980A', 2)).toBe(58800);
      expect(instance.complexity('379A', 2)).toBe(24256);
    });
  });

  describe('challenges (part2)', () => {
    it('should scale the same recursive cost function up to 25 robots', () => {
      // Act
      const result = instance.part2();
      const totalComplexity = instance.codes.reduce(
        (sum, code) => sum + instance.complexity(code, 25),
        0
      );

      // Assert
      expect(result).toBe(`Sum of code complexities with 25 robots: ${totalComplexity}`);
      // more robot layers can only ever cost at least as much as fewer layers
      expect(instance.sequenceCost('numeric', '029A', 25)).toBeGreaterThan(
        instance.sequenceCost('numeric', '029A', 2)
      );
    });

    it('should always cost exactly 1 press to activate without moving, at any depth', () => {
      // Act & Assert
      expect(instance.moveCost('directional', 'A', 'A', 0)).toBe(1);
      expect(instance.moveCost('directional', 'A', 'A', 2)).toBe(1);
      expect(instance.moveCost('directional', 'A', 'A', 25)).toBe(1);
    });
  });
});
