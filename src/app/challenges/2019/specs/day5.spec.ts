import { year2019day5 } from '../day5';

describe('2019 day5', () => {
  let instance: year2019day5;

  beforeEach(() => {
    instance = new year2019day5();
  });

  // part1 supplies system ID 1, part2 supplies system ID 5 (see preChallenge/part1/part2).
  // Both are fed through the same example programs, so the expected output for each
  // depends on comparing that system ID against the program's hardcoded value of 8.

  describe('part1 (system ID 1)', () => {
    it('outputs 1 for the position-mode less-than test (1 < 8)', async () => {
      instance.input = ['3,9,7,9,10,9,4,9,99,-1,8'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 1');
    });

    it('outputs 0 for the position-mode equals test (1 != 8)', async () => {
      instance.input = ['3,9,8,9,10,9,4,9,99,-1,8'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 0');
    });

    it('outputs 1 for the immediate-mode less-than test (1 < 8)', async () => {
      instance.input = ['3,3,1107,-1,8,3,4,3,99'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 1');
    });

    it('outputs 0 for the immediate-mode equals test (1 != 8)', async () => {
      instance.input = ['3,3,1108,-1,8,3,4,3,99'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 0');
    });

    it('outputs 1 for a non-zero input via the position-mode jump test', async () => {
      instance.input = ['3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 1');
    });

    it('outputs 1 for a non-zero input via the immediate-mode jump test', async () => {
      instance.input = ['3,3,1105,-1,9,1101,0,0,12,4,12,99,1'];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 1');
    });

    it('outputs 999 for the larger example (1 is below 8)', async () => {
      instance.input = [
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
      ];
      instance.preChallenge();
      expect(await instance.part1()).toBe('Diagnostic code: 999');
    });
  });

  describe('part2 (system ID 5)', () => {
    it('outputs 1 for the position-mode less-than test (5 < 8)', async () => {
      instance.input = ['3,9,7,9,10,9,4,9,99,-1,8'];
      instance.preChallenge();
      expect(await instance.part2()).toBe('System diagnostic code: 1');
    });

    it('outputs 0 for the position-mode equals test (5 != 8)', async () => {
      instance.input = ['3,9,8,9,10,9,4,9,99,-1,8'];
      instance.preChallenge();
      expect(await instance.part2()).toBe('System diagnostic code: 0');
    });

    it('outputs 999 for the larger example (5 is below 8)', async () => {
      instance.input = [
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
      ];
      instance.preChallenge();
      expect(await instance.part2()).toBe('System diagnostic code: 999');
    });
  });
});
