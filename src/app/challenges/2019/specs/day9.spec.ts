import { ProgramExecutor } from '../../../helpers/intcode/program-executor';
import { year2019day9 } from '../day9';

describe('2019 day9', () => {
  let instance: year2019day9;

  beforeEach(() => {
    instance = new year2019day9();
  });

  describe('part1', () => {
    it('produces a copy of itself as a quine', async () => {
      const program = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
      const computer = new ProgramExecutor(program);
      await computer.run();
      expect(computer.getIo().getOutputsLog()).toEqual(program.split(',').map(Number));
    });

    it('outputs a 16 digit number', async () => {
      instance.input = ['1102,34915192,34915192,7,4,7,99,0'];
      instance.preChallenge();
      const result = await instance.part1();
      const [, keycode] = result.split(': ');
      expect(keycode.length).toBe(16);
    });

    it('outputs the large number in the middle of the program', async () => {
      instance.input = ['104,1125899906842624,99'];
      instance.preChallenge();
      const result = await instance.part1();
      expect(result).toBe('BOOST keycode: 1125899906842624');
    });
  });
});
