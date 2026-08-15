import { year2021day4 } from '../day4';

describe('2021 day4', () => {
  const officialInput = [
    '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
    '',
    '22 13 17 11  0',
    ' 8  2 23  4 24',
    '21  9 14 16  7',
    ' 6 10  3 18  5',
    ' 1 12 20 15 19',
    '',
    ' 3 15  0  2 22',
    ' 9 18 13 17  5',
    '19  8  7 25 23',
    '20 11 10 24  4',
    '14 21 16 12  6',
    '',
    '14 21 17 24  4',
    '10 16 15  9 19',
    '18  8 23 26 20',
    '22 11 13  6  5',
    ' 2  0 12  3  7',
  ];

  describe('part1', () => {
    it('finds the board that wins first', () => {
      const instance = new year2021day4();
      instance.input = officialInput;
      instance.preChallenge();
      expect(instance.part1()).toBe('Winner: 3, score: 4512');
    });
  });

  describe('part2', () => {
    it('finds the board that wins last', () => {
      const instance = new year2021day4();
      instance.input = officialInput;
      instance.preChallenge();
      expect(instance.part2()).toBe('Winner: 2, score: 1924');
    });

    // Board 1 needs 1,2,3,4,99 to complete its top row; board 2 needs 5,6,7,8,99.
    // Both boards are still active when 99 is drawn, and both complete on that exact
    // number - the case the old `winners.length === 1` check couldn't handle.
    it('picks a last winner when the remaining boards all complete on the same draw', () => {
      const instance = new year2021day4();
      instance.input = [
        '1,2,3,4,5,6,7,8,99',
        '',
        '1 2 3 4 99',
        '101 102 103 104 105',
        '106 107 108 109 110',
        '111 112 113 114 115',
        '116 117 118 119 120',
        '',
        '5 6 7 8 99',
        '201 202 203 204 205',
        '206 207 208 209 210',
        '211 212 213 214 215',
        '216 217 218 219 220',
      ];
      instance.preChallenge();

      expect(instance.part2()).toBe('Winner: 2, score: 416790');
    });
  });
});
