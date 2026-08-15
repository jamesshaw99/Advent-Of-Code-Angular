import { year2022day4 } from '../day4';

describe('2022 day4', () => {
  const officialInput = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8'];

  let dayInstance: year2022day4;

  beforeEach(() => {
    dayInstance = new year2022day4();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('counts pairs where one range fully contains the other', () => {
      expect(dayInstance.part1()).toBe('Fully contained pairs: 2');
    });
  });

  describe('part2', () => {
    it('counts pairs where the ranges overlap at all', () => {
      expect(dayInstance.part2()).toBe('Overlapping pairs: 4');
    });
  });
});
