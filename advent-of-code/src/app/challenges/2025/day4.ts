import { day } from '../../helpers/day';

export class year2025day4 extends day {
  grid: string[][] = [];
  rows = 0;
  cols = 0;
  part1Removed = 0;

  adjacentOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  override preChallenge(): void {
    this.grid = this.input.map((line) => line.split(''));
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;
  }

  override part1(): string {
    this.part1Removed = this.findAccessibleRolls();
    return `${this.part1Removed} rolls can be accessed by a forklift`;
  }

  override part2(): string {
    let totalRollsRemoved = this.part1Removed;
    let removedThisRound = totalRollsRemoved;

    while (removedThisRound > 0) {
      removedThisRound = this.findAccessibleRolls();
      totalRollsRemoved += removedThisRound;
    }
    return `${totalRollsRemoved} rolls can be removed`;
  }

  findAccessibleRolls(): number {
    let accessibleCount = 0;
    const tempGrid = structuredClone(this.grid);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === '@') {
          let adjacentRollCount = 0;

          for (const [rowOffset, colOffset] of this.adjacentOffsets) {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;

            if (
              newRow >= 0 &&
              newRow < this.rows &&
              newCol >= 0 &&
              newCol < this.cols
            ) {
              if (this.grid[newRow][newCol] === '@') {
                adjacentRollCount++;
              }
            }
          }

          if (adjacentRollCount < 4) {
            accessibleCount++;
            tempGrid[row][col] = '.';
          }
        }
      }
    }

    this.grid = tempGrid;
    return accessibleCount;
  }
}
