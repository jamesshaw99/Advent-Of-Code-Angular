import { year2022day5 } from '../day5';

describe('2022 day5', () => {
  const officialInput = [
    '    [D]    ',
    '[N] [C]    ',
    '[Z] [M] [P]',
    ' 1   2   3 ',
    '',
    'move 1 from 2 to 1',
    'move 3 from 1 to 3',
    'move 2 from 2 to 1',
    'move 1 from 1 to 2',
  ];

  let dayInstance: year2022day5;

  beforeEach(() => {
    dayInstance = new year2022day5();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('finds the top crate of each stack after moving one crate at a time', () => {
      expect(dayInstance.part1()).toBe('Top crates: CMZ');
    });
  });

  describe('part2', () => {
    it('finds the top crate of each stack after moving multiple crates while preserving order', () => {
      expect(dayInstance.part2()).toBe('Top crates: MCD');
    });
  });
});
