import { day } from '../../helpers/day';
import { inBounds, ORTHOGONAL_DIRECTIONS } from '../../helpers/grid';
import { bfs } from '../../helpers/graphSearch';

export class year2024day18 extends day {
  gridSize = 71;
  bytesToSimulate = 1024;
  coordinates: [number, number][] = [];

  override preChallenge(): void {
    this.coordinates = [];

    for (const line of this.input) {
      const match = line.match(/(\d+),(\d+)/);
      if (match) {
        const [, x, y] = match;
        this.coordinates.push([Number(x), Number(y)]);
      }
    }
  }

  override part1(): string {
    const steps = this.shortestPathAfter(this.bytesToSimulate);
    return `Minimum steps to reach the exit: ${steps}`;
  }

  shortestPathAfter(byteCount: number): number {
    const corrupted = new Set(
      this.coordinates.slice(0, byteCount).map(([x, y]) => `${x},${y}`)
    );

    const target = `${this.gridSize - 1},${this.gridSize - 1}`;
    const start: [number, number] = [0, 0];

    const visited = bfs<[number, number]>(
      start,
      ([x, y]) => `${x},${y}`,
      ([x, y]) =>
        ORTHOGONAL_DIRECTIONS.map(([dr, dc]): [number, number] => [x + dc, y + dr]).filter(
          ([nx, ny]) =>
            inBounds(ny, nx, this.gridSize, this.gridSize) && !corrupted.has(`${nx},${ny}`)
        ),
      ([x, y]) => x === this.gridSize - 1 && y === this.gridSize - 1
    );

    return visited.get(target)?.distance ?? -1;
  }

  override part2(): string {
    const blockingByte = this.findFirstBlockingByte();
    return `First byte that blocks the exit: ${blockingByte ? blockingByte.join(',') : 'none'}`;
  }

  findFirstBlockingByte(): [number, number] | null {
    let low = 1;
    let high = this.coordinates.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (this.shortestPathAfter(mid) === -1) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }

    if (this.shortestPathAfter(low) !== -1) {
      return null;
    }

    return this.coordinates[low - 1];
  }
}
