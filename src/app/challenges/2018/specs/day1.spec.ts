import { year2018day1 } from '../day1';

describe('2018 day1', () => {
  let instance: year2018day1;

  beforeEach(() => {
    instance = new year2018day1();
  });

  describe('part1', () => {
    it('sums frequency changes', () => {
      instance.input = ['+1', '-2', '+3', '+1'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Resulting frequency: 3');
    });

    it('handles a run of positive changes', () => {
      instance.input = ['+1', '+1', '+1'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Resulting frequency: 3');
    });

    it('handles changes that net to zero', () => {
      instance.input = ['+1', '+1', '-2'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Resulting frequency: 0');
    });

    it('handles a run of negative changes', () => {
      instance.input = ['-1', '-2', '-3'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Resulting frequency: -6');
    });
  });

  describe('part2', () => {
    it('finds the first frequency reached twice, repeating the list as needed', () => {
      instance.input = ['+1', '-2', '+3', '+1'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First frequency reached twice: 2');
    });

    it('finds a repeat within a single pass', () => {
      instance.input = ['+1', '-1'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First frequency reached twice: 0');
    });

    it('finds a repeat requiring multiple passes (example 2)', () => {
      instance.input = ['+3', '+3', '+4', '-2', '-4'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First frequency reached twice: 10');
    });

    it('finds a repeat requiring multiple passes (example 3)', () => {
      instance.input = ['-6', '+3', '+8', '+5', '-6'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First frequency reached twice: 5');
    });

    it('finds a repeat requiring multiple passes (example 4)', () => {
      instance.input = ['+7', '+7', '-2', '-7', '-4'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First frequency reached twice: 14');
    });
  });
});
