import { year2019day18 } from '../day18';

describe('2019 day18', () => {
  let instance: year2019day18;

  beforeEach(() => {
    instance = new year2019day18();
  });

  describe('part1', () => {
    const examples: [string[], number][] = [
      [
        [
          '#########',
          '#b.A.@.a#',
          '#########'
        ],
        8
      ],
      [
        [
          '########################',
          '#f.D.E.e.C.b.A.@.a.B.c.#',
          '######################.#',
          '#d.....................#',
          '########################'
        ],
        86
      ],
      [
        [
          '########################',
          '#...............b.C.D.f#',
          '#.######################',
          '#.....@.a.B.c.d.A.e.F.g#',
          '########################'
        ],
        132
      ],
      [
        [
          '#################',
          '#i.G..c...e..H.p#',
          '########.########',
          '#j.A..b...f..D.o#',
          '########@########',
          '#k.E..a...g..B.n#',
          '########.########',
          '#l.F..d...h..C.m#',
          '#################'
        ],
        136
      ],
      [
        [
          '########################',
          '#@..............ac.GI.b#',
          '###d#e#f################',
          '###A#B#C################',
          '###g#h#i################',
          '########################'
        ],
        81
      ]
    ];

    for (const [maze, expectedSteps] of examples) {
      it(`collects all keys in ${expectedSteps} steps for a ${maze[0].length}x${maze.length} vault`, () => {
        instance.input = maze;
        instance.preChallenge();
        expect(instance.part1()).toBe(`${expectedSteps}`);
      });
    }
  });

  describe('part2', () => {
    it('collects all keys across four split-entrance robots in 8 steps', () => {
      instance.input = [
        '#######',
        '#a.#Cd#',
        '##...##',
        '##.@.##',
        '##...##',
        '#cB#Ab#',
        '#######'
      ];
      instance.preChallenge();
      expect(instance.part2()).toBe('8');
    });
  });
});
