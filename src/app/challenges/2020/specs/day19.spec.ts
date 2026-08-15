import { year2020day19 } from '../day19';

describe('2020 day19', () => {
  describe('part1', () => {
    it('counts messages matching rule 0 (simple example)', () => {
      const instance = new year2020day19();
      instance.input = [
        '0: 4 1 5',
        '1: 2 3 | 3 2',
        '2: 4 4 | 5 5',
        '3: 4 5 | 5 4',
        '4: "a"',
        '5: "b"',
        '',
        'ababbb',
        'bababa',
        'abbbab',
        'aaabbb',
        'aaaabbb',
      ];
      instance.preChallenge();
      expect(instance.part1()).toBe('2 messages match rule 0');
    });

    it('counts messages matching rule 0 without the self-referential rules 8/11 (larger example)', () => {
      const instance = new year2020day19();
      instance.input = LARGER_EXAMPLE;
      instance.preChallenge();
      expect(instance.part1()).toBe('3 messages match rule 0');
    });
  });

  describe('part2', () => {
    // part2() doesn't read rules 8/11 from the input at all - it hardcodes the
    // "count repeated rule 42 matches, then rule 31 matches" logic that only works
    // because this puzzle's rule 0 is "8 11" with 8: 42 | 42 8 and 11: 42 31 | 42 11 31.
    // So the same (unmodified) larger example input is reused here.
    it('counts messages matching rule 0 once the self-referential rules 8/11 are accounted for', () => {
      const instance = new year2020day19();
      instance.input = LARGER_EXAMPLE;
      instance.preChallenge();
      expect(instance.part2()).toBe('12 messages match rule 0');
    });
  });
});

const LARGER_EXAMPLE = [
  '42: 9 14 | 10 1',
  '9: 14 27 | 1 26',
  '10: 23 14 | 28 1',
  '1: "a"',
  '11: 42 31',
  '5: 1 14 | 15 1',
  '19: 14 1 | 14 14',
  '12: 24 14 | 19 1',
  '16: 15 1 | 14 14',
  '31: 14 17 | 1 13',
  '6: 14 14 | 1 14',
  '2: 1 24 | 14 4',
  '0: 8 11',
  '13: 14 3 | 1 12',
  '15: 1 | 14',
  '17: 14 2 | 1 7',
  '23: 25 1 | 22 14',
  '28: 16 1',
  '4: 1 1',
  '20: 14 14 | 1 15',
  '3: 5 14 | 16 1',
  '27: 1 6 | 14 18',
  '14: "b"',
  '21: 14 1 | 1 14',
  '25: 1 1 | 1 14',
  '22: 14 14',
  '8: 42',
  '26: 14 22 | 1 20',
  '18: 15 15',
  '7: 14 5 | 1 21',
  '24: 14 1',
  '',
  'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
  'bbabbbbaabaabba',
  'babbbbaabbbbbabbbbbbaabaaabaaa',
  'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
  'bbbbbbbaaaabbbbaaabbabaaa',
  'bbbababbbbaaaaaaaabbababaaababaabab',
  'ababaaaaaabaaab',
  'ababaaaaabbbaba',
  'baabbaaaabbaaaababbaababb',
  'abbbbabbbbaaaababbbbbbaaaababb',
  'aaaaabbaabaaaaababaa',
  'aaaabbaaaabbaaa',
  'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
  'babaaabbbaaabaababbaabababaaab',
  'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
];
