import { year2020day8 } from '../day8';

describe('2020 day8', () => {
  let instance: year2020day8;

  beforeEach(() => {
    instance = new year2020day8();
    instance.input = [
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('reports the accumulator value right before the program loops', () => {
      expect(instance.part1()).toBe('Value of accumulator: 5');
    });
  });

  describe('part2', () => {
    it('fixes the single corrupted jmp/nop and reports the accumulator at termination', () => {
      expect(instance.part2()).toBe('Value of accumulator at program termination: 8');
    });
  });
});
