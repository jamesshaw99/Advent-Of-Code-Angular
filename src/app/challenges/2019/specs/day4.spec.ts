import { year2019day4 } from '../day4';

describe('2019 day4', () => {
  let instance: year2019day4;

  beforeEach(() => {
    instance = new year2019day4();
  });

  describe('part1', () => {
    it('counts 111111 as valid (double, never decreases)', () => {
      instance.input = ['111111-111111'];
      instance.preChallenge();
      expect(instance.part1()).toBe('1 different passwords meet the criteria');
    });

    it('rejects 223450 (contains a decreasing pair)', () => {
      instance.input = ['223450-223450'];
      instance.preChallenge();
      expect(instance.part1()).toBe('0 different passwords meet the criteria');
    });

    it('rejects 123789 (no repeated digit)', () => {
      instance.input = ['123789-123789'];
      instance.preChallenge();
      expect(instance.part1()).toBe('0 different passwords meet the criteria');
    });
  });

  describe('part2', () => {
    it('counts 112233 as valid under the stricter adjacency rule', () => {
      instance.input = ['112233-112233'];
      instance.preChallenge();
      expect(instance.part2()).toBe('1 different passwords meet the criteria');
    });

    it('rejects 123444 (triple digit is not an isolated double)', () => {
      instance.input = ['123444-123444'];
      instance.preChallenge();
      expect(instance.part2()).toBe('0 different passwords meet the criteria');
    });

    it('counts 111122 as valid (still contains an isolated double 22)', () => {
      instance.input = ['111122-111122'];
      instance.preChallenge();
      expect(instance.part2()).toBe('1 different passwords meet the criteria');
    });
  });
});
