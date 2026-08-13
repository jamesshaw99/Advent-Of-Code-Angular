import { year2024day11 } from "../day11";

describe('2024 day11', () => {
  let instance: year2024day11;

  beforeEach(() => {
    instance = new year2024day11();
  });

  describe('preChallenge', () => {
    it('should parse the input into an array of stones', () => {
      // Arrange
      instance.input = ['125 17'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.stones).toEqual([125, 17]);
    });
  });

  describe('part1', () => {
    it('should call blinkStones and return result', () => {
        // Arrange
        instance.input = ['125 17'];
        instance.preChallenge();

        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('Total number of stones after 25 blinks: 55312');
    })
  })

  describe('part2', () => {
    it('should call blinkStones and return result', () => {
        // Arranges
        instance.input = ['125 17'];
        instance.preChallenge();

        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('Total number of stones after 75 blinks: 65601038650482');
    })
  })

  describe('blinkStones', () => {
    it('should return the number of stones after blinking', () => {
      //Arrange
      instance.input = ['0 1 10 99 999'];
      instance.preChallenge();

      //Act
      const result = instance.blinkStones(1);

      // Assert
      expect(result).toBe(7);
    });
  })
});