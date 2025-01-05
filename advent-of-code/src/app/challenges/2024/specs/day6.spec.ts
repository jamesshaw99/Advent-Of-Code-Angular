import { year2024day6 } from '../day6';

describe('2024 day6', () => {
  const input = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ];

  let challenge: year2024day6;

  beforeEach(() => {
    challenge = new year2024day6();
    challenge.input = input;
    challenge.preChallenge();
  });

  describe('preChallenge', () => {
    it('should correctly initialize the challenge', () => {
      expect(challenge.guardPosition).toEqual({ row: 6, col: 4 });
      expect(challenge.directionIndex).toEqual(0); // Facing up
    });
  });

  describe('part1', () => {
    it('should correctly calculate the number of distinct positions visited', () => {
      const result = challenge.part1();
      expect(result).toBe('Distinct positions visited: 41'); // Matches the example
    });
  });

  describe('part2', () => {
    it('should correctly calculate the number of obstruction points to cause a loop', () => {
      const result = challenge.part2();
      expect(result).toBe('Possible obstruction positions: 6'); // Matches the example
    });
  });

  describe('simulateWithObstacle', () => {
    it('should correctly simulate with a given obstruction', () => {
      const obstacle = { row: 6, col: 3 };
      const isLoop = challenge.simulateWithObstacle(obstacle);
      expect(isLoop).toBe(true);
    });

    it('should return false if no loop detected', () => {
      const obstacle = { row: 1, col: 1 };
      const isLoop = challenge.simulateWithObstacle(obstacle);
      expect(isLoop).toBe(false);
    });
  });

  describe('findGuard', () => {
    it('should return the location of the guard', () => {
    challenge.map = challenge.input.map((row) => row.split(''));
        const location = challenge.findGuard();
        expect(location.row).toBe(6);
        expect(location.col).toBe(4);
    })

    it('should throw error when guard not found', () => {
        expect(() => challenge.findGuard()).toThrow(new Error('Guard not found on the map'));
    });
  })

  describe('markVisited', () => {
    it(`should mark location with an 'x'`, () => {
        expect(challenge.map[1][1]).toBe('.');
        challenge.markVisited(1,1);

        expect(challenge.map[1][1]).toBe('X');
    })
  })

  describe('canMoveForward', () => {
    it('should return true if guard is out of map', () => {
        challenge.guardPosition = { row: 0, col: 0 };
        
        challenge.directionIndex = 0 //up
        expect(challenge.canMoveForward()).toBe(true);
        
        challenge.directionIndex = 3 //left
        expect(challenge.canMoveForward()).toBe(true);

        challenge.guardPosition = { row: challenge.map.length, col: challenge.map[0].length };
        
        challenge.directionIndex = 1 //right
        expect(challenge.canMoveForward()).toBe(true);
        
        challenge.directionIndex = 2 //down
        expect(challenge.canMoveForward()).toBe(true);
    })
  })
});
