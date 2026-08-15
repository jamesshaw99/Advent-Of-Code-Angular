import { year2019day15 } from '../day15';

describe('2019 day15', () => {
  let instance: year2019day15;

  beforeEach(() => {
    instance = new year2019day15();

    const program =
      '3,600,1007,600,3,601,1005,601,56,1008,600,4,602,1002,602,2,602,101,-1,602,602,' +
      '1,500,602,603,1008,603,-2,604,1005,604,56,1008,603,3,605,1005,605,56,1001,603,0,' +
      '500,1008,603,2,606,101,1,606,607,4,607,1105,1,0,4,900,1105,1,0';

    instance.input = [program];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the shortest path to the oxygen system (2 steps east)', async () => {
      expect(await instance.part1()).toBe('Shortest Path to oxygen: 2');
    });
  });

  describe('part2', () => {
    it('finds how long oxygen takes to fill the reachable corridor (3 minutes)', async () => {
      expect(await instance.part2()).toBe('Minutes for oxygen to spread: 3');
    });
  });
});
