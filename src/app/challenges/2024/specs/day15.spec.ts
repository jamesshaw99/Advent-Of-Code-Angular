import { year2024day15 } from '../day15';

describe('2024 day15', () => {
  let instance: year2024day15;

  const smallInput: string[] = [
    '########',
    '#..O.O.#',
    '##@.O..#',
    '#...O..#',
    '#.#.O..#',
    '#...O..#',
    '#......#',
    '########',
    '',
    '<^^>>>vv<v>>v<<',
  ];

  const largeInput: string[] = [
    '##########',
    '#..O..O.O#',
    '#......O.#',
    '#.OO..O.O#',
    '#..O@..O.#',
    '#O#..O...#',
    '#O..O..O.#',
    '#.OO.O.OO#',
    '#....O...#',
    '##########',
    '',
    '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^',
    'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v',
    '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<',
    '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^',
    '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><',
    '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^',
    '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^',
    '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>',
    '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>',
    'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^',
  ];

  beforeEach(() => {
    instance = new year2024day15();
  });

  describe('preChallenge', () => {
    it('should parse the grid, robot position, and move sequence', () => {
      // Arrange
      instance.input = smallInput;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.robotRow).toBe(2);
      expect(instance.robotCol).toBe(2);
      expect(instance.moves).toBe('<^^>>>vv<v>>v<<');
    });
  });

  describe('challenges', () => {
    it('should compute the GPS coordinate sum for the smaller sample in part1', () => {
      // Arrange
      instance.input = smallInput;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe("Sum of all boxes' GPS coordinates: 2028");
    });

    it('should compute the GPS coordinate sum for the larger sample in part1', () => {
      // Arrange
      instance.input = largeInput;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe("Sum of all boxes' GPS coordinates: 10092");
    });

    it('should compute the wide GPS coordinate sum for the larger sample in part2', () => {
      // Arrange
      instance.input = largeInput;
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe("Sum of all wide boxes' GPS coordinates: 9021");
    });
  });

  describe('widen', () => {
    it('should double the width of every tile per the scaling rules', () => {
      // Arrange
      instance.input = [
        '#######',
        '#...#.#',
        '#.....#',
        '#..OO@#',
        '#..O..#',
        '#.....#',
        '#######',
        '',
        '<vv<<^^<<^^',
      ];
      instance.preChallenge();

      // Act
      const wideGrid = instance.widen();

      // Assert
      expect(wideGrid.map((row) => row.join(''))).toEqual([
        '##############',
        '##......##..##',
        '##..........##',
        '##....[][]@.##',
        '##....[]....##',
        '##..........##',
        '##############',
      ]);
    });
  });

  describe('stepWide', () => {
    it('should reproduce the official move-by-move walkthrough for the small widened example', () => {
      // Arrange: matches the AoC walkthrough for this exact grid/move sequence
      instance.input = [
        '#######',
        '#...#.#',
        '#.....#',
        '#..OO@#',
        '#..O..#',
        '#.....#',
        '#######',
        '',
        '<vv<<^^<<^^',
      ];
      instance.preChallenge();
      const wideGrid = instance.widen();
      let robotRow = 3;
      let robotCol = 10;

      // Act
      for (const move of instance.moves) {
        ({ robotRow, robotCol } = instance.stepWide(wideGrid, robotRow, robotCol, move));
      }

      // Assert
      expect(wideGrid.map((row) => row.join(''))).toEqual([
        '##############',
        '##...[].##..##',
        '##...@.[]...##',
        '##....[]....##',
        '##..........##',
        '##..........##',
        '##############',
      ]);
    });
  });

  describe('step', () => {
    beforeEach(() => {
      instance.input = smallInput;
      instance.preChallenge();
    });

    it('should not move the robot when blocked by a wall', () => {
      // Act
      instance.step('<');

      // Assert
      expect(instance.robotRow).toBe(2);
      expect(instance.robotCol).toBe(2);
    });

    it('should move into an empty cell without pushing anything', () => {
      // Act
      instance.step('^');

      // Assert
      expect(instance.robotRow).toBe(1);
      expect(instance.robotCol).toBe(2);
      expect(instance.grid[1][2]).toBe('@');
    });

    it('should push a chain of boxes forward when the space beyond them is empty', () => {
      // Arrange
      instance.step('<');
      instance.step('^');
      instance.step('^');

      // Act
      instance.step('>');

      // Assert
      expect(instance.robotRow).toBe(1);
      expect(instance.robotCol).toBe(3);
      expect(instance.grid[1][3]).toBe('@');
      expect(instance.grid[1][4]).toBe('O');
    });
  });
});
