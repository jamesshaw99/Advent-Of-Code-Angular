import { day } from '../../helpers/day';

export class year2024day6 extends day {
  map: string[][] = [];
  visited = new Set<string>();
  guardPosition: { row: number; col: number } = { row: 0, col: 0 };
  directionIndex = 0; // Start facing up
  directions = [
    { rowDelta: -1, colDelta: 0 }, // Up
    { rowDelta: 0, colDelta: 1 }, // Right
    { rowDelta: 1, colDelta: 0 }, // Down
    { rowDelta: 0, colDelta: -1 }, // Left
  ];

  override preChallenge(): void {
    this.map = this.input.map((row) => row.split(''));
    this.visited = new Set();
    const { row, col } = this.findGuard();
    this.guardPosition = { row, col };
    this.markVisited(row, col);
  }

  override part1(): string {
    while (true) {
      if (this.canMoveForward()) {
        this.moveGuard();
      } else {
        this.turnRight();
      }

      const { row, col } = this.guardPosition;
      if (
        row < 0 ||
        row >= this.map.length ||
        col < 0 ||
        col >= this.map[0].length
      ) {
        break;
      }
    }
    return `Distinct positions visited: ${this.visited.size}`;
  }

  override part2(): string {
    this.preChallenge() //reset map
    const possibleObstructions: { row: number; col: number }[] = [];
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (
          this.map[row][col] === '.' &&
          !(row === this.guardPosition.row && col === this.guardPosition.col)
        ) {
          if (this.simulateWithObstacle({ row, col })) {
            possibleObstructions.push({ row, col });
          }
        }
      }
    }
    return `Possible obstruction positions: ${possibleObstructions.length}`;
  }

  findGuard(): { row: number; col: number } {
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (['^', '>', 'v', '<'].includes(this.map[row][col])) {
          this.directionIndex = ['^', '>', 'v', '<'].indexOf(
            this.map[row][col]
          );
          return { row, col };
        }
      }
    }
    throw new Error('Guard not found on the map');
  }

  markVisited(row: number, col: number): void {
    this.visited.add(`${row},${col}`);
    this.map[row][col] = 'X';
  }

  canMoveForward(): boolean {
    const { row, col } = this.guardPosition;
    const { rowDelta, colDelta } = this.directions[this.directionIndex];
    const nextRow = row + rowDelta;
    const nextCol = col + colDelta;
    if (
      nextRow < 0 ||
      nextRow >= this.map.length ||
      nextCol < 0 ||
      nextCol >= this.map[0].length
    ) {
      return true;
    }
    return this.map[nextRow][nextCol] !== '#';
  }

  moveGuard(): void {
    const { rowDelta, colDelta } = this.directions[this.directionIndex];
    this.markVisited(this.guardPosition.row, this.guardPosition.col);
    this.guardPosition.row += rowDelta;
    this.guardPosition.col += colDelta;
  }

  turnRight(): void {
    this.directionIndex = (this.directionIndex + 1) % 4;
  }

  simulateWithObstacle(obstacle: {
    row: number;
    col: number;
  }): boolean {
    const mapCopy = this.map.map((row) => [...row]);
    mapCopy[obstacle.row][obstacle.col] = '#'; // Place the obstacle

    const visitedStates = new Set<string>();
    let currentPosition = { ...this.guardPosition };
    let currentDirection = this.directionIndex;
    while (true) {
      const stateKey = `${currentPosition.row},${currentPosition.col},${currentDirection}`;
      if (visitedStates.has(stateKey)) {
        return true; // Loop detected
      }
      visitedStates.add(stateKey);

      const { rowDelta, colDelta } = this.directions[currentDirection];
      const nextRow = currentPosition.row + rowDelta;
      const nextCol = currentPosition.col + colDelta;

      if (
        nextRow < 0 ||
        nextRow >= mapCopy.length ||
        nextCol < 0 ||
        nextCol >= mapCopy[0].length
      ) {
        return false; // out of map
      } else if (mapCopy[nextRow][nextCol] === '#') {
        // Turn right if blocked or out of bounds
        currentDirection = (currentDirection + 1) % 4;
      } else {
        // Move forward
        currentPosition = { row: nextRow, col: nextCol };
      }
    }
  }
}
