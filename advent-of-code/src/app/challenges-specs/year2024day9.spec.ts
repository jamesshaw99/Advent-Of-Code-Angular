import { year2024day9 } from '../challenges/year2024day9';

fdescribe('year2024day9', () => {
  let instance: year2024day9;

  beforeEach(() => {
    instance = new year2024day9();
    instance.input = ['2333133121414131402'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('should return the correct filesystem checksum', () => {
      //Act
      const result = instance.part1();

      //Assert
      expect(result).toBe('filesystem checksum: 1928');
    });
  });

  describe('part2', () => {
    it('should return the correct filesystem checksum', () => {
      //Act
      const result = instance.part2();

      //Assert
      expect(result).toBe('filesystem checksum: 2858');
    });
  });

  describe('parseDiskMap', () => {

    it('should parse blocks correctly', () => {
        //Act
        const { blocks } = instance.parseDiskMap();

        //Assert
        expect(blocks).toEqual([
            0, 0, null, null, null, 1, 1, 1, null, null, null, 2, null, null, 
            null, 3, 3, 3, null, 4, 4, null, 5, 5, 5, 5, null, 6, 6, 6, 6, 
            null, 7, 7, 7, null, 8, 8, 8, 8, 9, 9
        ]);
    });
    
    it('should parse fileSizes correctly', () => {
        //Act
        const { fileSizes } = instance.parseDiskMap();

        //Assert
        expect(fileSizes.get(0)).toBe(2);
        expect(fileSizes.get(1)).toBe(3);
        expect(fileSizes.get(2)).toBe(1);
        expect(fileSizes.get(3)).toBe(3);
        expect(fileSizes.get(4)).toBe(2);
        expect(fileSizes.get(5)).toBe(4);
        expect(fileSizes.get(6)).toBe(4);
        expect(fileSizes.get(7)).toBe(3);
        expect(fileSizes.get(8)).toBe(4);
        expect(fileSizes.get(9)).toBe(2);
    });
  });

  describe('compactDiskPart1', () => {
    it('should return the correct compacted blocks', () => {
      //Arrange
      const { blocks } = instance.parseDiskMap();

      //Act
      const result = instance.compactDiskPart1(blocks);

      //Assert
      expect(result).toEqual([
        0, 0, 9, 9, 8, 1, 1, 1, 8,
        8, 8, 2, 7, 7, 7, 3, 3, 3,
        6, 4, 4, 6, 5, 5, 5, 5, 6,
        6, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null
      ]);
    });
  });

  describe('compactDiskPart2', () => {
    it('should return the correct compacted blocks', () => {
      //Arrange
      const { blocks, fileSizes } = instance.parseDiskMap();

      //Act
      const result = instance.compactDiskPart2(blocks, fileSizes);

      //Assert
      expect(result).toEqual([
        0, 0, 9, 9, 2, 1, 1, 1, 7, 7,
         7, null, 4, 4, null, 3, 3, 3,
        null, null, null, null, 5, 5, 
        5, 5, null, 6, 6, 6, 6, null,
        null, null, null, null, 8,
        8, 8, 8, null, null
      ]);
    });
  });
});
