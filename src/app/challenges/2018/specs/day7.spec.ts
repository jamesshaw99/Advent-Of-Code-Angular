import { year2018day7 } from '../day7';

describe('2018 day7', () => {
  let instance: year2018day7;

  beforeEach(() => {
    instance = new year2018day7();
    instance.input = [
      'Step C must be finished before step A can begin.',
      'Step C must be finished before step F can begin.',
      'Step A must be finished before step B can begin.',
      'Step A must be finished before step D can begin.',
      'Step B must be finished before step E can begin.',
      'Step D must be finished before step E can begin.',
      'Step F must be finished before step E can begin.',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('orders steps, preferring the lexicographically smallest ready step', () => {
      expect(instance.part1()).toBe('Step order: CABDFE');
    });
  });

  describe('part2', () => {
    it('simulates multiple workers completing steps in parallel', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((instance as any).simulateWorkers(2, 0)).toBe(15);
    });
  });
});
