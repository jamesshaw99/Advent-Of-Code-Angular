import { day } from '../../helpers/day';

type Grid = string[][];

export class year2019day24 extends day {
  minutes = 200;

  private static readonly directions: [number, number][] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  private static readonly surround: [number, number][] = [
    [2, 1],
    [1, 2],
    [2, 3],
    [3, 2],
  ];

  private initialGrid: Grid = [];

  override preChallenge(): void {
    this.initialGrid = this.parseGrid(this.input);
  }

  override part1(): string {
    let grid = this.initialGrid.map((row) => row.slice());
    const seen = new Set<string>();

    while (true) {
      const key = this.gridKey(grid);
      if (seen.has(key)) {
        return `Biodiversity rating: ${this.biodiversityRating(grid)}`;
      }
      seen.add(key);
      grid = this.step(grid);
    }
  }

  override part2(): string {
    const size = 5;
    const depthRange = this.minutes + 1;

    let layers = new Map<number, Grid>();
    for (let depth = -depthRange; depth <= depthRange; depth++) {
      layers.set(depth, this.emptyGrid(size));
    }
    layers.set(0, this.initialGrid.map((row) => row.slice()));

    for (let iteration = 0; iteration < this.minutes; iteration++) {
      const nextLayers = new Map<number, Grid>();

      for (let depth = -depthRange; depth <= depthRange; depth++) {
        const currentGrid = layers.get(depth) as Grid;
        const newGrid = currentGrid.map((row) => row.slice());

        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            if (x === 2 && y === 2) {
              continue;
            }

            const adjacent = this.countAdjacentRecursive(layers, depth, x, y);
            if (currentGrid[y][x] === '#') {
              newGrid[y][x] = adjacent === 1 ? '#' : '.';
            } else {
              newGrid[y][x] = adjacent === 1 || adjacent === 2 ? '#' : '.';
            }
          }
        }

        nextLayers.set(depth, newGrid);
      }

      layers = nextLayers;
    }

    let totalBugs = 0;
    for (const grid of layers.values()) {
      totalBugs += this.countBugs(grid);
    }
    return `Total bugs across all recursive layers: ${totalBugs}`;
  }

  private step(grid: Grid): Grid {
    const newGrid = grid.map((row) => row.slice());

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const adjacent = this.countAdjacent(grid, x, y);
        if (grid[y][x] === '#') {
          newGrid[y][x] = adjacent === 1 ? '#' : '.';
        } else {
          newGrid[y][x] = adjacent === 1 || adjacent === 2 ? '#' : '.';
        }
      }
    }

    return newGrid;
  }

  private countAdjacent(grid: Grid, x: number, y: number): number {
    let count = 0;
    for (const [dx, dy] of year2019day24.directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[ny].length && grid[ny][nx] === '#') {
        count++;
      }
    }
    return count;
  }

  private countAdjacentRecursive(layers: Map<number, Grid>, depth: number, x: number, y: number): number {
    const grid = layers.get(depth) as Grid;
    let count = this.countAdjacent(grid, x, y);

    const outer = layers.get(depth + 1);
    if (outer) {
      if (y === 0 && this.cellAt(outer, year2019day24.surround[0]) === '#') count++;
      if (x === 0 && this.cellAt(outer, year2019day24.surround[1]) === '#') count++;
      if (y === 4 && this.cellAt(outer, year2019day24.surround[2]) === '#') count++;
      if (x === 4 && this.cellAt(outer, year2019day24.surround[3]) === '#') count++;
    }

    const inner = layers.get(depth - 1);
    if (inner) {
      if (x === 2 && y === 1) count += this.countRowBugs(inner, 0);
      if (x === 1 && y === 2) count += this.countColBugs(inner, 0);
      if (x === 2 && y === 3) count += this.countRowBugs(inner, 4);
      if (x === 3 && y === 2) count += this.countColBugs(inner, 4);
    }

    return count;
  }

  private cellAt(grid: Grid, [x, y]: [number, number]): string {
    return grid[y][x];
  }

  private countRowBugs(grid: Grid, row: number): number {
    return grid[row].filter((c) => c === '#').length;
  }

  private countColBugs(grid: Grid, col: number): number {
    return grid.reduce((sum, row) => sum + (row[col] === '#' ? 1 : 0), 0);
  }

  private countBugs(grid: Grid): number {
    return grid.reduce((sum, row) => sum + row.filter((c) => c === '#').length, 0);
  }

  private biodiversityRating(grid: Grid): number {
    let rating = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === '#') {
          rating += 2 ** (y * grid.length + x);
        }
      }
    }
    return rating;
  }

  private gridKey(grid: Grid): string {
    return grid.map((row) => row.join('')).join('\n');
  }

  private parseGrid(lines: string[]): Grid {
    return lines.map((line) => line.split(''));
  }

  private emptyGrid(size: number): Grid {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => '.'));
  }
}
