import { year2024day14 } from '../day14';

describe('2024 day14', () => {
  let instance: year2024day14;

  const input: string[] = [
    'p=0,4 v=3,-3',
    'p=6,3 v=-1,-3',
    'p=10,3 v=-1,2',
    'p=2,0 v=2,-1',
    'p=0,0 v=1,3',
    'p=3,0 v=-2,-2',
    'p=7,6 v=-1,-3',
    'p=3,0 v=-1,-2',
    'p=9,3 v=2,3',
    'p=7,3 v=-1,2',
    'p=2,4 v=2,-3',
    'p=9,5 v=-3,-3',
  ];

  beforeEach(() => {
    instance = new year2024day14();
    instance.width = 11;
    instance.height = 7;
  });

  describe('preChallenge', () => {
    it('should parse robot positions and velocities', () => {
      // Arrange
      instance.input = ['p=0,4 v=3,-3', 'p=6,3 v=-1,-3'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.robots).toEqual([
        { x: 0, y: 4, vx: 3, vy: -3 },
        { x: 6, y: 3, vx: -1, vy: -3 },
      ]);
    });
  });

  describe('challenges', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should calculate the safety factor after 100 seconds in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Safety factor after 100 seconds: 12');
    });
  });

  describe('positionAfter', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should wrap around the edges of the space', () => {
      // Act
      const result = instance.positionAfter({ x: 2, y: 4, vx: 2, vy: -3 }, 5);

      // Assert
      expect(result).toEqual({ x: 1, y: 3 });
    });
  });

  describe('calculateSafetyFactor', () => {
    beforeEach(() => {
      instance.input = input;
      instance.preChallenge();
    });

    it('should multiply the robot counts across all four quadrants', () => {
      // Act
      const result = instance.calculateSafetyFactor(100);

      // Assert
      expect(result).toBe(12);
    });
  });

  describe('findEasterEggSeconds', () => {
    it('should return the first second at which every robot occupies a unique position', () => {
      // Arrange: two robots overlapping at t=0, but at distinct cells from t=1 onward
      instance.width = 5;
      instance.height = 5;
      instance.robots = [
        { x: 0, y: 0, vx: 1, vy: 0 },
        { x: 0, y: 0, vx: 0, vy: 1 },
      ];

      // Act
      const result = instance.findEasterEggSeconds();

      // Assert
      expect(result).toBe(1);
    });

    it('should return -1 when no second within one full cycle has unique positions', () => {
      // Arrange: two robots that always move in lockstep, so they always overlap
      instance.width = 5;
      instance.height = 5;
      instance.robots = [
        { x: 0, y: 0, vx: 1, vy: 1 },
        { x: 0, y: 0, vx: 1, vy: 1 },
      ];

      // Act
      const result = instance.findEasterEggSeconds();

      // Assert
      expect(result).toBe(-1);
    });
  });
});
