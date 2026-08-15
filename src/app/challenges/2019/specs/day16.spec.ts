import { year2019day16 } from '../day16';

describe('2019 day16', () => {
  let instance: year2019day16;

  beforeEach(() => {
    instance = new year2019day16();
  });

  describe('part1', () => {
    it('finds the first 8 digits after 100 phases (80871224585914546619083218645595)', () => {
      instance.input = ['80871224585914546619083218645595'];
      instance.preChallenge();
      expect(instance.part1()).toBe('First 8 digits: 24176176');
    });

    it('finds the first 8 digits after 100 phases (19617804207202209144916044189917)', () => {
      instance.input = ['19617804207202209144916044189917'];
      instance.preChallenge();
      expect(instance.part1()).toBe('First 8 digits: 73745418');
    });

    it('finds the first 8 digits after 100 phases (69317163492948606335995924319873)', () => {
      instance.input = ['69317163492948606335995924319873'];
      instance.preChallenge();
      expect(instance.part1()).toBe('First 8 digits: 52432133');
    });
  });

  describe('part2', () => {
    it('finds the 8 message digits at the offset (03036732577212944063491565474664)', () => {
      instance.input = ['03036732577212944063491565474664'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First 8 digits: 84462026');
    });

    it('finds the 8 message digits at the offset (02935109699940807407585447034323)', () => {
      instance.input = ['02935109699940807407585447034323'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First 8 digits: 78725270');
    });

    it('finds the 8 message digits at the offset (03081770884921959731165446850517)', () => {
      instance.input = ['03081770884921959731165446850517'];
      instance.preChallenge();
      expect(instance.part2()).toBe('First 8 digits: 53553731');
    });
  });
});
