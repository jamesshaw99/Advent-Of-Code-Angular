import { day } from '../../helpers/day';

export class year2023day10 extends day {
  grid: string[][] = [];
  visited: boolean[][] = [];

  override preChallenge(): void {
    const rows = this.input.length;
    const cols = this.input[0].length;

    this.grid = new Array(rows);
    this.visited = new Array(rows);

    for (let i = 0; i < rows; i++) {
      const rowString = this.input[i].trim();
      this.grid[i] = new Array(cols);
      this.visited[i] = new Array(cols).fill(false);
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = rowString.charAt(j);
      }
    }
  }

  override part1(): string {
    const steps = this.findFarthestPoint();
    return `Steps to farthest point: ${steps}`;
  }

  override part2(): string {
    const enclosedTiles = this.countEnclosedTiles();
    return `Tiles enclosed by the loop: ${enclosedTiles}`;
  }

  findFarthestPoint(): number {
    const distances: number[][] = Array.from({ length: this.grid.length }, () =>
      new Array(this.grid[0].length).fill(0)
    );
    const startCoords = this.findStartCoordinates();

    this.dfs(startCoords[0], startCoords[1], distances, 0);

    return this.getMaxDistance(distances) - 1;
  }

  getMaxDistance(distances: number[][]): number {
    let maxDistance = 0;
    for (const distance of distances) {
      for (const j of distance) {
        if (j > maxDistance) {
          maxDistance = j;
        }
      }
    }
    return maxDistance;
  }

  findStartCoordinates(): number[] {
    const startCoords = [-1, -1];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 'S') {
          startCoords[0] = i;
          startCoords[1] = j;
        }
      }
    }
    return startCoords;
  }

  dfs(
    startRow: number,
    startCol: number,
    distances: number[][],
    curDistance: number
  ): void {
    const numRows = this.grid.length;
    const numCols = this.grid[0].length;

    const stack: [number, number, number][] = [];
    stack.push([startRow, startCol, curDistance]);

    while (stack.length > 0) {
      const [row, col, distance] = stack.pop()!;

      if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        this.grid[row][col] === '.'
      ) {
        continue;
      }

      const currentDistance = this.getDistance(row, col, distance);

      if (distances[row][col] !== 0 && distances[row][col] <= currentDistance) {
        continue;
      }

      distances[row][col] = currentDistance;
      this.visited[row][col] = true;

      if (this.isValidMove(1, row, col)) {
        stack.push([row - 1, col, currentDistance]); // Up
      }
      if (this.isValidMove(2, row, col)) {
        stack.push([row + 1, col, currentDistance]); // Down
      }
      if (this.isValidMove(3, row, col)) {
        stack.push([row, col - 1, currentDistance]); // Left
      }
      if (this.isValidMove(4, row, col)) {
        stack.push([row, col + 1, currentDistance]); // Right
      }
    }
  }

  getDistance(row: number, col: number, curDistance: number): number {
    const upDis = this.isValidMove(1, row, col) ? curDistance : 0;
    const downDis = this.isValidMove(2, row, col) ? curDistance : 0;
    const leftDis = this.isValidMove(3, row, col) ? curDistance : 0;
    const rightDis = this.isValidMove(4, row, col) ? curDistance : 0;

    return Math.max(Math.max(upDis, downDis), Math.max(leftDis, rightDis)) + 1;
  }

  isValidMove(dir: number, row: number, col: number): boolean {
    const numRows = this.grid.length;
    const numCols = this.grid[0].length;

    if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
      return false;
    }

    const currentCell = this.grid[row][col];
    let neighbourCell;

    switch (dir) {
      case 1:
        neighbourCell = row - 1 >= 0 ? this.grid[row - 1][col] : '.';
        return (
          'S|JL'.indexOf(currentCell) >= 0 && '|F7'.indexOf(neighbourCell) >= 0
        );
      case 2:
        neighbourCell = row + 1 < numRows ? this.grid[row + 1][col] : '.';
        return (
          'S|F7'.indexOf(currentCell) >= 0 && '|LJ'.indexOf(neighbourCell) >= 0
        );
      case 3:
        neighbourCell = col - 1 >= 0 ? this.grid[row][col - 1] : '.';
        return (
          'S-7J'.indexOf(currentCell) >= 0 && '-LF'.indexOf(neighbourCell) >= 0
        );
      case 4:
        neighbourCell = col + 1 < numCols ? this.grid[row][col + 1] : '.';
        return (
          'S-LF'.indexOf(currentCell) >= 0 && '-7J'.indexOf(neighbourCell) >= 0
        );
      default:
        return false;
    }
  }

  countEnclosedTiles(): number {
    let enclosedTiles = 0;

    for (let i = 0; i < this.grid.length; i++) {
      let inLoop = false;
      for (let j = 0; j < this.grid[i].length; j++) {
        inLoop = this.isCellInLoop(i, j, inLoop);

        if (inLoop && !this.visited[i][j]) {
          enclosedTiles++;
        }
      }
    }

    return enclosedTiles;
  }

  isCellInLoop(row: number, col: number, current: boolean): boolean {
    if (this.visited[row][col] && this.grid[row][col] == '|') {
      return !current;
    }
    if (this.visited[row][col] && this.grid[row][col] == '7') {
      for (let x = col; x > 0; x--) {
        if (this.grid[row][x] == 'F') {
          break;
        }
        if (this.grid[row][x] == 'L') {
          return !current;
        }
      }
    }
    if (this.visited[row][col] && this.grid[row][col] == 'J') {
      for (let x = col; x > 0; x--) {
        if (this.grid[row][x] == 'L') {
          break;
        }
        if (this.grid[row][x] == 'F') {
          return !current;
        }
      }
    }
    return current;
  }
}
