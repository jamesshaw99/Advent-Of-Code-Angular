import { year2019day2 } from '../day2';

describe('2019 day2', () => {
  let instance: year2019day2;

  beforeEach(() => {
    instance = new year2019day2();
  });

  describe('preChallenge', () => {
    it('should store the first line of input as text', () => {
      const mockInput = ['1,0,0,0,99', 'second line'];
      instance.input = mockInput;

      instance.preChallenge();

      expect(instance.text).toBe('1,0,0,0,99');
    });

    it('should handle single line input', () => {
      const mockInput = ['1,9,10,3,2,3,11,0,99,30,40,50'];
      instance.input = mockInput;

      instance.preChallenge();

      expect(instance.text).toBe('1,9,10,3,2,3,11,0,99,30,40,50');
    });
  });

  describe('part1', () => {
    beforeEach(() => {
      instance.text = '1,1,1,4,99,5,6,0,99';
    });

    it('should create ProgramExecutor with the input text', async () => {
      const result = await instance.part1();
      expect(result).toBe('Value at position 0: 30');
    });
  });
});
