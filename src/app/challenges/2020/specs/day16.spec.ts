import { year2020day16 } from '../day16';

describe('2020 day16', () => {
  describe('part1', () => {
    it('sums ticket values invalid for every rule', () => {
      const instance = new year2020day16();
      instance.input = [
        'class: 1-3 or 5-7',
        'row: 6-11 or 33-44',
        'seat: 13-40 or 45-50',
        '',
        'your ticket:',
        '7,1,14',
        '',
        'nearby tickets:',
        '7,3,47',
        '40,4,50',
        '55,2,20',
        '38,6,12',
      ];
      instance.preChallenge();
      expect(instance.part1()).toBe('71');
    });
  });

  describe('part2', () => {
    // AoC's own part2 example has no 'departure'-prefixed fields (that naming only
    // appears in real puzzle input), so the fields are renamed here to exercise the
    // multiplication step. Per AoC's own worked resolution: position0=row(11),
    // position1=class(12), position2=seat(13) -> product 11*12*13=1716.
    it('resolves field positions and multiplies the departure fields', () => {
      const instance = new year2020day16();
      instance.input = [
        'departure class: 0-1 or 4-19',
        'departure row: 0-5 or 8-19',
        'departure seat: 0-13 or 16-19',
        '',
        'your ticket:',
        '11,12,13',
        '',
        'nearby tickets:',
        '3,9,18',
        '15,1,5',
        '5,14,9',
      ];
      instance.preChallenge();
      expect(instance.part2()).toBe('1716');
    });
  });
});
