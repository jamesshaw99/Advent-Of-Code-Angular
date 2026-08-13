import { year2025day10 } from '../day10';

describe('2025 day 10', () => {
  let instance: year2025day10;
  const input: string[] = [
    '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',
    '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',
    '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
  ];

  beforeEach(() => {
    instance = new year2025day10();
    instance.input = input;
    instance.preChallenge();
  });

  describe('PreChallenge', () => {
    it('should create array of machines from input', () => {
      // Arrange
      const expectedMachine = {
        targetLights: [false, true, true, false],
        buttons: [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]],
        joltageTargets: [3, 5, 4, 7],
      };

      // Assert
      expect(instance.machines).toContain(expectedMachine);
    });
  });

  describe('Challenges', () => {
    it('Part 1 should calculate the fewest button presses required to correctly configure the lights on all machines', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Fewest button presses to configure all machines: 7');
    });

    it('Part 2 should calculate the fewest button presses required to correctly configure the joltage requirements', () => {
        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('Fewest button presses to configure all Joltage requirements: 33')
    })
  });
});
