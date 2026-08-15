import { year2021day12 } from '../day12';

describe('2021 day12', () => {
  const officialInput = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];

  let dayInstance: year2021day12;

  beforeEach(() => {
    dayInstance = new year2021day12();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('counts paths that visit small caves at most once', () => {
      expect(dayInstance.part1()).toBe('Total number of paths: 10');
    });
  });

  describe('part2', () => {
    it('counts paths that allow a single small cave to be visited twice', () => {
      expect(dayInstance.part2()).toBe('Total number of paths: 36');
    });
  });
});
