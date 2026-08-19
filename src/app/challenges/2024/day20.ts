import { day } from '../../helpers/day';
import { inBounds, parseCharGrid } from '../../helpers/grid';
import { bfs } from '../../helpers/graphSearch';

function generateCheatOffsets(maxLength: number): [number, number][] {
  const offsets: [number, number][] = [];
  for (let dr = -maxLength; dr <= maxLength; dr++) {
    const remaining = maxLength - Math.abs(dr);
    for (let dc = -remaining; dc <= remaining; dc++) {
      if (dr === 0 && dc === 0) continue;
      offsets.push([dr, dc]);
    }
  }
  return offsets;
}

export class year2024day20 extends day {
  grid: string[][] = [];
  rows = 0;
  cols = 0;
  startRow = 0;
  startCol = 0;
  distanceFromStart: number[][] = [];

  override preChallenge(): void {
    this.grid = parseCharGrid(this.input);
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;

    for (let row = 0; row < this.rows; row++) {
      const col = this.grid[row].indexOf('S');
      if (col !== -1) {
        this.startRow = row;
        this.startCol = col;
        break;
      }
    }

    this.distanceFromStart = Array.from({ length: this.rows }, () =>
      new Array(this.cols).fill(-1)
    );

    const visited = bfs<[number, number]>(
      [this.startRow, this.startCol],
      ([row, col]) => `${row},${col}`,
      ([row, col]) =>
        ([[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][])
          .map(([dr, dc]): [number, number] => [row + dr, col + dc])
          .filter(
            ([r, c]) => inBounds(r, c, this.rows, this.cols) && this.grid[r][c] !== '#'
          )
    );

    for (const { node: [row, col], distance } of visited.values()) {
      this.distanceFromStart[row][col] = distance;
    }
  }

  override part1(): string {
    const count = this.countCheatsWithMinimumSavings(100, 2);
    return `Cheats saving at least 100 picoseconds: ${count}`;
  }

  override part2(): string {
    const count = this.countCheatsWithMinimumSavings(100, 20);
    return `Cheats saving at least 100 picoseconds with up to 20-picosecond cheats: ${count}`;
  }

  countCheatsWithMinimumSavings(minSavings: number, maxCheatLength = 2): number {
    let count = 0;
    const offsets = generateCheatOffsets(maxCheatLength);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const startDistance = this.distanceFromStart[row][col];
        if (startDistance === -1) continue;

        for (const [dr, dc] of offsets) {
          const nr = row + dr;
          const nc = col + dc;
          if (!inBounds(nr, nc, this.rows, this.cols)) continue;

          const endDistance = this.distanceFromStart[nr][nc];
          if (endDistance === -1) continue;

          const cheatLength = Math.abs(dr) + Math.abs(dc);
          const savings = endDistance - startDistance - cheatLength;
          if (savings >= minSavings) {
            count++;
          }
        }
      }
    }

    return count;
  }
}
