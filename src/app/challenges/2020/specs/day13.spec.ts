import { year2020day13 } from '../day13';

describe('2020 day13', () => {
  let instance: year2020day13;

  beforeEach(() => {
    instance = new year2020day13();
    instance.input = ['939', '7,13,x,x,59,x,31,19'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the earliest bus and multiplies its ID by the wait time', () => {
      expect(instance.part1()).toBe('Earliest bus * minutes needed to wait: 295');
    });
  });

  describe('part2', () => {
    it('finds the earliest timestamp where every bus departs at its offset', () => {
      expect(instance.part2()).toBe('Earliest timestamp for all busses: 1068781');
    });
  });
});
