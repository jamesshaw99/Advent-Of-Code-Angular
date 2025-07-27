import { year2024day12 } from '../day12';

describe('2024 day12', () => {
  let instance: year2024day12;

  const testInput = [
    'RRRRIICCFF',
    'RRRRIICCCF',
    'VVRRRCCFFF',
    'VVRCCCJFFF',
    'VVVVCJJCFE',
    'VVIVCCJJEE',
    'VVIIICJJEE',
    'MIIIIIJJEE',
    'MIIISIJEEE',
    'MMMISSJEEE',
  ];

  beforeEach(() => {
    instance = new year2024day12();
  });

  describe('preChallenge', () => {
    it('should parse the input into a grid', () => {
      // Arrange
      instance.input = ['.#.', '..#', '###'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.grid).toEqual([
        ['.', '#', '.'],
        ['.', '.', '#'],
        ['#', '#', '#'],
      ]);
    });
  });

  describe('part1', () => {
    it('should return the total price of fencing based on area * perimeter', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Total price of fencing for all regions: 1930');
    });
  });

  describe('part2', () => {
    it('should return the total price of fencing based on area * sides', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Total price of fencing for all regions: 1206');
    });
  });

  describe('findAllRegions', () => {
    it('should find all regions in the grid', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();

      // Act
      const regions = instance.findAllRegions();

      // Assert
      expect(regions.length).toBe(11);
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'R', area: 12 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'I', area: 4 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'C', area: 14 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'F', area: 10 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'V', area: 13 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'J', area: 11 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'C', area: 1 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'E', area: 13 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'I', area: 14 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'M', area: 5 }));
      expect(regions).toContain(jasmine.objectContaining({ plantType: 'S', area: 3 }));
    });
  });

  describe('floodFillRegion', () => {
    it('should flood fill a region starting from a given cell', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();
      // Act
      const region = instance.floodFillRegion(0, 0, instance.visited);

      // Assert
      expect(region.plantType).toBe('R');
      expect(region.area).toBe(12);
      expect(region.cells).toContain('0,0');
      expect(region.cells).toContain('0,1');
      expect(region.cells).toContain('0,2');
      expect(region.cells).toContain('0,3');
      expect(region.cells).toContain('1,0');
      expect(region.cells).toContain('1,1');
      expect(region.cells).toContain('1,2');
      expect(region.cells).toContain('1,3');
      expect(region.cells).toContain('2,2');
      expect(region.cells).toContain('2,3');
      expect(region.cells).toContain('2,4');
      expect(region.cells).toContain('3,2');
    });
  });

  describe('isValidCell', () => {
    [
        { row: 0, col: 0, expected: true },
        { row: testInput[0].length-1, col: testInput.length-1, expected: true },
        { row: 0, col: -1, expected: false },
        { row: -1, col: 0, expected: false },
        { row: 0, col: testInput.length, expected: false },
        { row: testInput[0].length, col: 0, expected: false },
    ].forEach(({ row, col, expected }) => {
      it(`should return ${expected} for cell (${row}, ${col})`, () => {
        // Arrange
        instance.input = testInput;
        instance.preChallenge();

        // Act
        const result = instance.isValidCell(row, col);

        // Assert
        expect(result).toBe(expected);
      });
    });
  });

  describe('calculatePerimeter', () => {
    it('should calculate the perimeter of a region', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();
      const region = instance.floodFillRegion(0, 0, instance.visited);

      // Act
      const perimeter = instance.calculatePerimeter(region);

      // Assert
      expect(perimeter).toBe(18);
    });
  });

  describe('calculateSides', () => {
    it('should calculate the sides of a region', () => {
      // Arrange
      instance.input = testInput;
      instance.preChallenge();
      const region = instance.floodFillRegion(0, 0, instance.visited);

      // Act
      const sides = instance.calculateSides(region);

      // Assert
      expect(sides).toBe(10);
    });
  });
});
