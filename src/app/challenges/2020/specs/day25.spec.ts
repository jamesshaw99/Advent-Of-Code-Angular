import { year2020day25 } from '../day25';

describe('2020 day25', () => {
  let instance: year2020day25;

  beforeEach(() => {
    instance = new year2020day25();
    instance.input = ['5764801', '17807724'];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('derives the encryption key from the card and door public keys', () => {
      expect(instance.part1()).toBe('14897079');
    });
  });

  describe('part2', () => {
    it('has no puzzle to solve (50th star, awarded automatically)', () => {
      expect(instance.part2()).toBe('I Won');
    });
  });
});
