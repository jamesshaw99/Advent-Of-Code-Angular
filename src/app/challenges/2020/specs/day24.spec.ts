import { year2020day24 } from '../day24';

describe('2020 day24', () => {
  let instance: year2020day24;

  beforeEach(() => {
    instance = new year2020day24();
    instance.input = [
      'sesenwnenenewseeswwswswwnenewsewsw',
      'neeenesenwnwwswnenewnwwsewnenwseswesw',
      'seswneswswsenwwnwse',
      'nwnwneseeswswnenewneswwnewseswneseene',
      'swweswneswnenwsewnwneneseenw',
      'eesenwseswswnenwswnwnwsewwnwsene',
      'sewnenenenesenwsewnenwwwse',
      'wenwwweseeeweswwwnwwe',
      'wsweesenenewnwwnwsenewsenwwsesesenwne',
      'neeswseenwwswnwswswnw',
      'nenwswwsewswnenenewsenwsenwnesesenew',
      'enewnwewneswsewnwswenweswnenwsenwsw',
      'sweneswneswneneenwnewenewwneswswnese',
      'swwesenesewenwneswnwwneseswwne',
      'enesenwswwswneneswsenwnewswseenwsese',
      'wnwnesenesenenwwnenwsewesewsesesew',
      'nenewswnwewswnenesenwnesewesw',
      'eneswnwswnwsenenwnwnwwseeswneewsenese',
      'neswnwewnwnwseenwseesewsenwsweewe',
      'wseweeenwnesenwwwswnew',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts tiles left black after flipping the given list once', () => {
      expect(instance.part1()).toBe('10 tiles are left with the black side up');
    });
  });

  describe('part2', () => {
    it('counts black tiles after running the daily flip simulation for 100 days', () => {
      expect(instance.part2()).toBe('2208 tiles are black after 100 days');
    });
  });
});
