import { day } from '../day'; // Adjust the import path based on your file structure

describe('day Class', () => {
  let instance: day;

  beforeEach(() => {
    instance = new day();
  });

  it('should initialize with an empty input array', () => {
    expect(instance.input).toEqual([]);
  });

  describe('run', () => {
    it('should update input and call methods', () => {
      // Arrange
      const input = ['test input'];

      spyOn(instance, 'preChallenge').and.callThrough();
      spyOn(instance, 'part1').and.returnValue('result1');
      spyOn(instance, 'part2').and.returnValue('result2');

      const mockPerformanceNow = jasmine.createSpy('performanceNow');
      mockPerformanceNow.and.returnValues(
        1000, // startPart1
        1100, // endPart1
        1200, // startPart2
        1250 // endPart2
      );
      globalThis.performance = { now: mockPerformanceNow } as unknown as Performance;

      // Act
      const result = instance.run(input);

      // Assert
      expect(instance.input).toBe(input);
      expect(instance.preChallenge).toHaveBeenCalled();
      expect(instance.part1).toHaveBeenCalled();
      expect(instance.part2).toHaveBeenCalled();
      expect(result.part1).toBe('result1');
      expect(result.part2).toBe('result2');

      expect(result.timePart1).toBeCloseTo(100.0, 2);
      expect(result.timePart2).toBeCloseTo(50.0, 2);
    });
  });

  it('should return "not implemented" for part1 by default', () => {
    expect(instance.part1()).toBe('not implemented');
  });

  it('should return "not implemented" for part2 by default', () => {
    expect(instance.part2()).toBe('not implemented');
  });

  it('should not throw an error in preChallenge()', () => {
    expect(() => instance.preChallenge()).not.toThrow();
  });
});
