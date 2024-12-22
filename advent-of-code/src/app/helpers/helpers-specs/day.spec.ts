import { day } from '../day'; // Adjust the import path based on your file structure

describe('day Class', () => {
  let instance: day;

  beforeEach(() => {
    instance = new day();
  });

  it('should initialize with an empty input array', () => {
    expect(instance.input).toEqual([]);
  });

  it('should update input and call methods in run()', () => {
    // Arrange
    const input = ['test input'];

    spyOn(instance, 'preChallenge').and.callThrough();
    spyOn(instance, 'part1').and.returnValue('result1');
    spyOn(instance, 'part2').and.returnValue('result2');

    // Act
    const result = instance.run(input);

    // Assert
    expect(instance.input).toBe(input);
    expect(instance.preChallenge).toHaveBeenCalled();
    expect(instance.part1).toHaveBeenCalled();
    expect(instance.part2).toHaveBeenCalled();
    expect(result).toEqual({
      part1: 'result1',
      part2: 'result2'
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
