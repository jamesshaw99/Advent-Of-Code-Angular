import { year2025day11 } from '../day11';

fdescribe('2025 day 11', () => {
  let instance: year2025day11;
  const input1: string[] = [
    'aaa: you hhh',
    'you: bbb ccc',
    'bbb: ddd eee',
    'ccc: ddd eee fff',
    'ddd: ggg',
    'eee: out',
    'fff: out',
    'ggg: out',
    'hhh: ccc fff iii',
    'iii: out'
  ];

  const input2: string[] = [
    'svr: aaa bbb',
    'aaa: fft',
    'fft: ccc',
    'bbb: tty',
    'tty: ccc',
    'ccc: ddd eee',
    'ddd: hub',
    'hub: fff',
    'eee: dac',
    'dac: fff',
    'fff: ggg hhh',
    'ggg: out',
    'hhh: out'
  ];

  beforeEach(() => {
    instance = new year2025day11();
  });

  describe('PreChallenge', () => {
    it('should create map of devices to outputs', () => {
      // Arrange
      const map = new Map<string, string[]>([
        ['aaa', ['you', 'hhh']],
        ['you', ['bbb', 'ccc']],
        ['bbb', ['ddd', 'eee']],
        ['ccc', ['ddd', 'eee', 'fff']],
        ['ddd', ['ggg']],
        ['eee', ['out']],
        ['fff', ['out']],
        ['ggg', ['out']],
        ['hhh', ['ccc', 'fff', 'iii']],
        ['iii', ['out']],
      ]);

      instance.input = input1;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.graph).toEqual(map);
    });
  });

  describe('Challenges', () => {
    it(`Part 1 should calculate how many paths lead from 'you' to 'out'`, () => {
      // Assert
      instance.input = input1;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe(`The total paths from 'you' to 'out' is: 5`);
    });

    it(`Part 2 should find all paths from 'svr' to 'out' via both 'dac' and 'fft'`, () => {
        // Assert
      instance.input = input2;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe(`The total paths from 'svr' to 'out' visiting both 'dac' and 'fft' is: 2`);
    })
  });
});
