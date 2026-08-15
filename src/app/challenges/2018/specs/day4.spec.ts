import { year2018day4 } from '../day4';

describe('2018 day4', () => {
  let instance: year2018day4;

  beforeEach(() => {
    instance = new year2018day4();
    instance.input = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('finds the guard with the most minutes asleep and their sleepiest minute', () => {
      expect(instance.part1()).toBe('Guard 10 * minute 24 = 240');
    });
  });

  describe('part2', () => {
    it('finds the guard/minute pair with the single highest sleep count', () => {
      expect(instance.part2()).toBe('Guard 99 * minute 45 = 4455');
    });
  });
});
