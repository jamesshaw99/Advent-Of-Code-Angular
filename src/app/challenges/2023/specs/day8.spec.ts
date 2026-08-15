import { year2023day8 } from '../day8';

describe('2023 day8', () => {
  describe('part1', () => {
    it('counts the steps to reach ZZZ from AAA', () => {
      const dayInstance = new year2023day8();
      dayInstance.input = [
        'RL',
        '',
        'AAA = (BBB, CCC)',
        'BBB = (DDD, EEE)',
        'CCC = (ZZZ, GGG)',
        'DDD = (DDD, DDD)',
        'EEE = (EEE, EEE)',
        'GGG = (GGG, GGG)',
        'ZZZ = (ZZZ, ZZZ)',
      ];
      dayInstance.preChallenge();
      expect(dayInstance.part1()).toBe('Number of steps: 2');
    });

    it('repeats the instruction sequence when it runs out before reaching ZZZ', () => {
      const dayInstance = new year2023day8();
      dayInstance.input = [
        'LLR',
        '',
        'AAA = (BBB, BBB)',
        'BBB = (AAA, ZZZ)',
        'ZZZ = (ZZZ, ZZZ)',
      ];
      dayInstance.preChallenge();
      expect(dayInstance.part1()).toBe('Number of steps: 6');
    });
  });

  describe('part2', () => {
    it('simultaneously navigates from every node ending in A until all end in Z', () => {
      const dayInstance = new year2023day8();
      dayInstance.input = [
        'LR',
        '',
        '11A = (11B, XXX)',
        '11B = (XXX, 11Z)',
        '11Z = (11B, XXX)',
        '22A = (22B, XXX)',
        '22B = (22C, 22C)',
        '22C = (22Z, 22Z)',
        '22Z = (22B, 22B)',
        'XXX = (XXX, XXX)',
      ];
      dayInstance.preChallenge();
      expect(dayInstance.part2()).toBe('number of steps: 6');
    });
  });
});
