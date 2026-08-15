import { year2021day2 } from '../day2';

describe('2021 day2', () => {
  const officialInput = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

  let dayInstance: year2021day2;

  beforeEach(() => {
    dayInstance = new year2021day2();
    dayInstance.input = officialInput;
    dayInstance.preChallenge();
  });

  describe('part1', () => {
    it('multiplies the final horizontal position by the final depth', () => {
      expect(dayInstance.part1()).toBe('Horizontal: 15, depth: 10, total: 150');
    });
  });

  describe('part2', () => {
    it('multiplies the final horizontal position by the final depth using aim', () => {
      expect(dayInstance.part2()).toBe('Horizontal: 15, depth: 60, total: 900');
    });
  });
});
