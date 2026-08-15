import { year2019day7 } from '../day7';

describe('2019 day7', () => {
  let instance: year2019day7;

  beforeEach(() => {
    instance = new year2019day7();
  });

  describe('part1', () => {
    it('finds the highest signal for phase sequence 4,3,2,1,0', () => {
      instance.input = ['3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Highest signal from thrusters: 43210');
    });

    it('finds the highest signal for phase sequence 0,1,2,3,4', () => {
      instance.input = ['3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Highest signal from thrusters: 54321');
    });

    it('finds the highest signal for phase sequence 1,0,4,3,2', () => {
      instance.input = ['3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Highest signal from thrusters: 65210');
    });
  });
});
