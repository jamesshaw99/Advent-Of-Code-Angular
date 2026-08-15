import { year2022day7 } from '../day7';

describe('2022 day7', () => {
  const officialInput = [
    '$ cd /',
    '$ ls',
    'dir a',
    '14848514 b.txt',
    '8504156 c.dat',
    'dir d',
    '$ cd a',
    '$ ls',
    'dir e',
    '29116 f',
    '2557 g',
    '62596 h.lst',
    '$ cd e',
    '$ ls',
    '584 i',
    '$ cd ..',
    '$ cd ..',
    '$ cd d',
    '$ ls',
    '4060174 j',
    '8033020 d.log',
    '5626152 d.ext',
    '7214296 k',
  ];

  let dayInstance: year2022day7;

  beforeEach(() => {
    dayInstance = new year2022day7();
    dayInstance.input = officialInput;
  });

  describe('part1', () => {
    it('sums the total size of directories no larger than 100000', () => {
      expect(dayInstance.part1()).toBe('sum of sub 100000 directories: 95437');
    });
  });

  describe('part2', () => {
    it('finds the smallest directory that frees up enough space when deleted', () => {
      expect(dayInstance.part2()).toBe('Size of smallest directory to delete: 24933642');
    });
  });
});
