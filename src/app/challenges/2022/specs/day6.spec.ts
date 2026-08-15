import { year2022day6 } from '../day6';

describe('2022 day6', () => {
  function run(buffer: string): year2022day6 {
    const instance = new year2022day6();
    instance.input = [buffer];
    instance.preChallenge();
    return instance;
  }

  describe('part1', () => {
    it.each([
      ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
      ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
      ['nppdvjthqldpwncqszvftbrmjlhg', 6],
      ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
      ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
    ])('finds the start-of-packet marker for %s', (buffer, expected) => {
      expect(run(buffer).part1()).toBe(`Complete after ${expected} characters`);
    });
  });

  describe('part2', () => {
    it.each([
      ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
      ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
      ['nppdvjthqldpwncqszvftbrmjlhg', 23],
      ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
      ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
    ])('finds the start-of-message marker for %s', (buffer, expected) => {
      expect(run(buffer).part2()).toBe(`complete after ${expected} characters`);
    });
  });
});
