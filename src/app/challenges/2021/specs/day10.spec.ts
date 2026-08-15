import { year2021day10 } from '../day10';

describe('2021 day10', () => {
  const officialInput = [
    '[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]',
  ];

  let dayInstance: year2021day10;

  beforeEach(() => {
    dayInstance = new year2021day10();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('totals the syntax error score of the corrupted lines', () => {
      expect(dayInstance.part1()).toBe('Syntax error score: 26397');
    });
  });

  describe('part2', () => {
    it('finds the middle autocomplete score of the incomplete lines', () => {
      expect(dayInstance.part2()).toBe('Middle score: 288957');
    });
  });
});
