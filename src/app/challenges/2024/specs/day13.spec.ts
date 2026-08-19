import { year2024day13 } from '../day13';

describe('2024 day13', () => {
  let instance: year2024day13;

  const input: string[] = [
    'Button A: X+94, Y+34',
    'Button B: X+22, Y+67',
    'Prize: X=8400, Y=5400',
    '',
    'Button A: X+26, Y+66',
    'Button B: X+67, Y+21',
    'Prize: X=12748, Y=12176',
    '',
    'Button A: X+17, Y+86',
    'Button B: X+84, Y+37',
    'Prize: X=7870, Y=6450',
    '',
    'Button A: X+69, Y+23',
    'Button B: X+27, Y+71',
    'Prize: X=18641, Y=10279',
  ];

  beforeEach(() => {
    instance = new year2024day13();
  });

  describe('preChallenge', () => {
    it('should parse each machine into its button and prize coordinates', () => {
      // Arrange
      instance.input = input;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.machines).toEqual([
        { ax: 94, ay: 34, bx: 22, by: 67, px: 8400, py: 5400 },
        { ax: 26, ay: 66, bx: 67, by: 21, px: 12748, py: 12176 },
        { ax: 17, ay: 86, bx: 84, by: 37, px: 7870, py: 6450 },
        { ax: 69, ay: 23, bx: 27, by: 71, px: 18641, py: 10279 },
      ]);
    });
  });

  describe('challenges', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should calculate the minimum tokens for winnable prizes in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Minimum tokens to win all possible prizes: 480');
    });

    it('should only find prizes winnable after correcting for the unit conversion error in part2', () => {
      // Arrange: per the puzzle, only the 2nd and 4th machines become winnable after adding the offset
      const offset = 10000000000000;
      const machine2 = instance.solveMachine({
        ...instance.machines[1],
        px: instance.machines[1].px + offset,
        py: instance.machines[1].py + offset,
      });
      const machine4 = instance.solveMachine({
        ...instance.machines[3],
        px: instance.machines[3].px + offset,
        py: instance.machines[3].py + offset,
      });
      const expectedCost =
        (machine2 ? machine2.a * 3 + machine2.b : 0) + (machine4 ? machine4.a * 3 + machine4.b : 0);

      // Act
      const result = instance.part2();

      // Assert
      expect(machine2).not.toBeNull();
      expect(machine4).not.toBeNull();
      expect(result).toBe(
        `Minimum tokens to win all possible prizes with corrected coordinates: ${expectedCost}`
      );
    });
  });

  describe('solveMachine', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should solve a winnable machine', () => {
      // Act
      const result = instance.solveMachine(instance.machines[0]);

      // Assert
      expect(result).toEqual({ a: 80, b: 40 });
    });

    it('should return null for an unwinnable machine', () => {
      // Act
      const result = instance.solveMachine(instance.machines[1]);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null when the determinant is zero', () => {
      // Act
      const result = instance.solveMachine({
        ax: 1,
        ay: 2,
        bx: 2,
        by: 4,
        px: 10,
        py: 20,
      });

      // Assert
      expect(result).toBeNull();
    });

    it('should flip winnability after adding the part2 unit conversion offset', () => {
      // Arrange
      const offset = 10000000000000;

      // Act & Assert: machine 1 and machine 3 are winnable pre-correction...
      expect(instance.solveMachine(instance.machines[0])).not.toBeNull();
      expect(instance.solveMachine(instance.machines[2])).not.toBeNull();

      // ...but become unwinnable once the offset is applied
      expect(
        instance.solveMachine({
          ...instance.machines[0],
          px: instance.machines[0].px + offset,
          py: instance.machines[0].py + offset,
        })
      ).toBeNull();
      expect(
        instance.solveMachine({
          ...instance.machines[2],
          px: instance.machines[2].px + offset,
          py: instance.machines[2].py + offset,
        })
      ).toBeNull();

      // ...while machine 2 and machine 4, unwinnable pre-correction, become winnable
      expect(instance.solveMachine(instance.machines[1])).toBeNull();
      expect(instance.solveMachine(instance.machines[3])).toBeNull();

      const corrected2 = instance.solveMachine({
        ...instance.machines[1],
        px: instance.machines[1].px + offset,
        py: instance.machines[1].py + offset,
      })!;
      const corrected4 = instance.solveMachine({
        ...instance.machines[3],
        px: instance.machines[3].px + offset,
        py: instance.machines[3].py + offset,
      })!;

      expect(corrected2).not.toBeNull();
      expect(corrected4).not.toBeNull();
      expect(corrected2.a * 26 + corrected2.b * 67).toBe(instance.machines[1].px + offset);
      expect(corrected2.a * 66 + corrected2.b * 21).toBe(instance.machines[1].py + offset);
      expect(corrected4.a * 69 + corrected4.b * 27).toBe(instance.machines[3].px + offset);
      expect(corrected4.a * 23 + corrected4.b * 71).toBe(instance.machines[3].py + offset);
    });
  });
});
