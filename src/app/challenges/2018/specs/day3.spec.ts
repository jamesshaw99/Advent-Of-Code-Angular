import { year2018day3 } from '../day3';

describe('2018 day3', () => {
  let instance: year2018day3;

  beforeEach(() => {
    instance = new year2018day3();
    instance.input = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts square inches claimed by two or more claims', () => {
      expect(instance.part1()).toBe('Square inches claimed by two or more claims: 4');
    });
  });

  describe('part2', () => {
    it('finds the claim with no overlap', () => {
      expect(instance.part2()).toBe('Claim with no overlap: 3');
    });
  });
});
