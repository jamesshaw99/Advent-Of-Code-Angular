import { year2018day2 } from '../day2';

describe('2018 day2', () => {
  let instance: year2018day2;

  beforeEach(() => {
    instance = new year2018day2();
  });

  describe('part1', () => {
    it('computes the checksum from letters appearing exactly twice or three times', () => {
      instance.input = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Checksum: 12');
    });
  });

  describe('part2', () => {
    it('finds the common letters between the two box IDs differing by one character', () => {
      instance.input = ['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Common letters: fgij');
    });
  });
});
