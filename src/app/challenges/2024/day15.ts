import { day } from '../../helpers/day';

const DIRECTIONS: Record<string, [number, number]> = {
  '^': [-1, 0],
  v: [1, 0],
  '<': [0, -1],
  '>': [0, 1],
};

const WIDE_TILES: Record<string, string> = {
  '#': '##',
  O: '[]',
  '.': '..',
  '@': '@.',
};

export class year2024day15 extends day {
  gridLines: string[] = [];
  grid: string[][] = [];
  moves = '';
  robotRow = 0;
  robotCol = 0;

  override preChallenge(): void {
    this.gridLines = [];
    this.grid = [];
    this.moves = '';

    let parsingGrid = true;
    for (const line of this.input) {
      if (line.trim() === '') {
        parsingGrid = false;
        continue;
      }

      if (parsingGrid) {
        this.gridLines.push(line);
        this.grid.push(line.split(''));
      } else {
        this.moves += line.trim();
      }
    }

    for (let row = 0; row < this.grid.length; row++) {
      const col = this.grid[row].indexOf('@');
      if (col !== -1) {
        this.robotRow = row;
        this.robotCol = col;
        break;
      }
    }
  }

  override part1(): string {
    for (const move of this.moves) {
      this.step(move);
    }

    return `Sum of all boxes' GPS coordinates: ${this.sumBoxGpsCoordinates()}`;
  }

  step(move: string): void {
    const [dr, dc] = DIRECTIONS[move];
    const nextRow = this.robotRow + dr;
    const nextCol = this.robotCol + dc;
    const nextCell = this.grid[nextRow][nextCol];

    if (nextCell === '#') {
      return;
    }

    if (nextCell === '.') {
      this.grid[this.robotRow][this.robotCol] = '.';
      this.grid[nextRow][nextCol] = '@';
      this.robotRow = nextRow;
      this.robotCol = nextCol;
      return;
    }

    let scanRow = nextRow;
    let scanCol = nextCol;
    while (this.grid[scanRow][scanCol] === 'O') {
      scanRow += dr;
      scanCol += dc;
    }

    if (this.grid[scanRow][scanCol] === '#') {
      return;
    }

    this.grid[scanRow][scanCol] = 'O';
    this.grid[this.robotRow][this.robotCol] = '.';
    this.grid[nextRow][nextCol] = '@';
    this.robotRow = nextRow;
    this.robotCol = nextCol;
  }

  sumBoxGpsCoordinates(): number {
    let total = 0;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === 'O') {
          total += 100 * row + col;
        }
      }
    }
    return total;
  }

  override part2(): string {
    const wideGrid = this.widen();
    let robotRow = 0;
    let robotCol = 0;
    for (let row = 0; row < wideGrid.length; row++) {
      const col = wideGrid[row].indexOf('@');
      if (col !== -1) {
        robotRow = row;
        robotCol = col;
        break;
      }
    }

    for (const move of this.moves) {
      ({ robotRow, robotCol } = this.stepWide(wideGrid, robotRow, robotCol, move));
    }

    return `Sum of all wide boxes' GPS coordinates: ${this.sumWideGpsCoordinates(wideGrid)}`;
  }

  widen(): string[][] {
    return this.gridLines.map((line) =>
      [...line].flatMap((char) => [...WIDE_TILES[char]])
    );
  }

  stepWide(
    grid: string[][],
    robotRow: number,
    robotCol: number,
    move: string
  ): { robotRow: number; robotCol: number } {
    const [dr, dc] = DIRECTIONS[move];

    if (dr === 0) {
      return this.pushHorizontal(grid, robotRow, robotCol, dc);
    }
    return this.pushVertical(grid, robotRow, robotCol, dr);
  }

  pushHorizontal(
    grid: string[][],
    robotRow: number,
    robotCol: number,
    dc: number
  ): { robotRow: number; robotCol: number } {
    const nextCol = robotCol + dc;
    const nextCell = grid[robotRow][nextCol];

    if (nextCell === '#') {
      return { robotRow, robotCol };
    }

    if (nextCell === '.') {
      grid[robotRow][robotCol] = '.';
      grid[robotRow][nextCol] = '@';
      return { robotRow, robotCol: nextCol };
    }

    let scanCol = nextCol;
    while (grid[robotRow][scanCol] === '[' || grid[robotRow][scanCol] === ']') {
      scanCol += dc;
    }

    if (grid[robotRow][scanCol] === '#') {
      return { robotRow, robotCol };
    }

    if (dc > 0) {
      for (let c = scanCol - 1; c >= nextCol; c--) {
        grid[robotRow][c + 1] = grid[robotRow][c];
      }
    } else {
      for (let c = scanCol + 1; c <= nextCol; c++) {
        grid[robotRow][c - 1] = grid[robotRow][c];
      }
    }

    grid[robotRow][robotCol] = '.';
    grid[robotRow][nextCol] = '@';
    return { robotRow, robotCol: nextCol };
  }

  pushVertical(
    grid: string[][],
    robotRow: number,
    robotCol: number,
    dr: number
  ): { robotRow: number; robotCol: number } {
    const nextRow = robotRow + dr;
    const nextCell = grid[nextRow][robotCol];

    if (nextCell === '#') {
      return { robotRow, robotCol };
    }

    if (nextCell === '.') {
      grid[robotRow][robotCol] = '.';
      grid[nextRow][robotCol] = '@';
      return { robotRow: nextRow, robotCol };
    }

    const boxes = this.collectBoxesToPush(grid, nextRow, robotCol, dr);
    if (boxes === null) {
      return { robotRow, robotCol };
    }

    for (const [r, c] of boxes) {
      grid[r][c] = '.';
      grid[r][c + 1] = '.';
    }
    for (const [r, c] of boxes) {
      grid[r + dr][c] = '[';
      grid[r + dr][c + 1] = ']';
    }

    grid[robotRow][robotCol] = '.';
    grid[nextRow][robotCol] = '@';
    return { robotRow: nextRow, robotCol };
  }

  collectBoxesToPush(
    grid: string[][],
    row: number,
    col: number,
    dr: number
  ): [number, number][] | null {
    const leftCol = grid[row][col] === '[' ? col : col - 1;
    const visited = new Set<string>([`${row},${leftCol}`]);
    const boxes: [number, number][] = [[row, leftCol]];
    let head = 0;

    while (head < boxes.length) {
      const [r, c] = boxes[head++];
      const nr = r + dr;

      for (const nc of [c, c + 1]) {
        const cell = grid[nr][nc];
        if (cell === '#') {
          return null;
        }
        if (cell === '[' || cell === ']') {
          const nLeftCol = cell === '[' ? nc : nc - 1;
          const key = `${nr},${nLeftCol}`;
          if (!visited.has(key)) {
            visited.add(key);
            boxes.push([nr, nLeftCol]);
          }
        }
      }
    }

    return boxes;
  }

  sumWideGpsCoordinates(grid: string[][]): number {
    let total = 0;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '[') {
          total += 100 * row + col;
        }
      }
    }
    return total;
  }
}
