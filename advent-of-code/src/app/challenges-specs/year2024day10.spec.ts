import { year2024day10 } from '../challenges/year2024day10';

describe('year2024day10', () => {
  let instance: year2024day10;

  beforeEach(() => {
    instance = new year2024day10();
    instance.input = [
      '89010123',
      '78121874',
      '87430965',
      '96549874',
      '45678903',
      '32019012',
      '01329801',
      '10456732',
    ];
    instance.preChallenge();
  });

  describe('preChallenge', () => {
    it('should parse the input into a map', () => {
      //Assert
      expect(instance.map).toEqual([
        [8, 9, 0, 1, 0, 1, 2, 3],
        [7, 8, 1, 2, 1, 8, 7, 4],
        [8, 7, 4, 3, 0, 9, 6, 5],
        [9, 6, 5, 4, 9, 8, 7, 4],
        [4, 5, 6, 7, 8, 9, 0, 3],
        [3, 2, 0, 1, 9, 0, 1, 2],
        [0, 1, 3, 2, 9, 8, 0, 1],
        [1, 0, 4, 5, 6, 7, 3, 2],
      ]);
    });
  });

  describe('part1', () => {
    it('should return the sum of the scores of all trailheads', () => {
      //Act
      const result = instance.part1();

      //Assert
      expect(result).toBe('Sum of the scores of all trailheads 36');
    });
  });

    describe('part2', () => {
        it('should return the sum of the ratings of all trailheads', () => {
        //Act
        const result = instance.part2();
    
        //Assert
        expect(result).toBe('Sum of the ratings of all trailheads 81');
        });
    });

  describe('isInBounds', () => {
    it('should return true if the point is within the bounds of the map', () => {
      //Act
      const result = instance.isInBounds({ x: 1, y: 1 });

      //Assert
      expect(result).toBe(true);
    });

    it('should return false if the point is outside the bounds of the map', () => {
      //Act & Assert
      expect(instance.isInBounds({ x: 4, y: 8 })).toBe(false);
      expect(instance.isInBounds({ x: 4, y: -1 })).toBe(false);
      expect(instance.isInBounds({ x: 8, y: 4 })).toBe(false);
      expect(instance.isInBounds({ x: -1, y: 4 })).toBe(false);
    });
  });

  describe('getNeighbors', () => {
    it('should return the neighbors of a point that are within the bounds of the map', () => {
      //Act
      const result = instance.getNeighbors({ x: 1, y: 1 });

      //Assert
      expect(result).toEqual([
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 2 },
      ]);
    });
  });

  describe('findTrailsFromTrailhead', () => {
    it('should return all the points that are reachable from a trailhead', () => {
      //Act
      const result = instance.findTrailsFromTrailhead({ x: 0, y: 2 });

      //Assert
      expect(result).toEqual([
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 5 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 3 },
      ]);
    });
  });

  describe('calculateScore', () => {
    it('should return the number of unique nines that are reachable from a trailhead', () => {
      //Act
      const result = instance.calculateScore({ x: 0, y: 2 });

      //Assert
      expect(result).toBe(5);
    });
  });

  describe('findTrailheads', () => {
    it('should return all the trailheads', () => {
      //Act
      const result = instance.findTrailheads();

      //Assert
      expect(result).toEqual([
        { x: 0, y: 2 },
        { x: 0, y: 4 },
        { x: 2, y: 4 },
        { x: 4, y: 6 },
        { x: 5, y: 2 },
        { x: 5, y: 5 },
        { x: 6, y: 0 },
        { x: 6, y: 6 },
        { x: 7, y: 1 }
      ]);
    });
  });

  describe('findDistinctTrails', () => {
    it('should return the number of distinct trails that are reachable from a trailhead', () => {
      //Act
      const result = instance.findDistinctTrails({ x: 0, y: 2 });

      //Assert
      expect(result).toBe(20);
    });
  });
});
