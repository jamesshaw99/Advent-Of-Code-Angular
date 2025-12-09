import { day } from '../../helpers/day';
import { Point } from '../../models/point';

export class year2025day7 extends day {
  grid: string[][] = [];
  beamStart!: Point;
  rows!: number;
  cols!: number;

  override preChallenge(): void {
    this.grid = this.input.map((line) => line.split(''));
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;

    for (let x = 0; x < this.cols; x++) {
      if (this.grid[0][x] === 'S') {
        this.beamStart = { x, y: 1 };
        break;
      }
    }
  }

  override part1(): string {
    const beamQueue = [this.beamStart];
    const activatedSplitters = new Set<string>();

    const processedBeams = new Set<string>();

    while (beamQueue.length > 0) {
      const beam = beamQueue.shift()!;
      const beamKey = `${beam.x}, ${beam.y}`;

      if (processedBeams.has(beamKey)) {
        continue;
      }
      processedBeams.add(beamKey);

      let currentRow = beam.y;
      const currentCol = beam.x;

      while (currentRow < this.rows) {
        if (this.grid[currentRow][currentCol] === '^') {
          const splitterKey = `${currentRow},${currentCol}`;

          if (!activatedSplitters.has(splitterKey)) {
            activatedSplitters.add(splitterKey);
          }

          if (currentCol > 0) {
            beamQueue.push({ x: currentCol - 1, y: currentRow + 1 });
          }
          if (currentCol < this.cols - 1) {
            beamQueue.push({ x: currentCol + 1, y: currentRow + 1 });
          }

          break;
        }
        currentRow++;
      }
    }

    return `The beam will be split ${activatedSplitters.size} times`;
  }

  override part2(): string {
    const memo = new Map<string, number>();

    const countTimelines = (x: number, y: number): number => {
      if (y >= this.rows) {
        return 1;
      }

      const stateKey = `${x},${y}`;
      if (memo.has(stateKey)) {
        return memo.get(stateKey)!;
      }

      let currentY = y;
      while (currentY < this.rows && this.grid[currentY][x] !== '^') {
        currentY++;
      }

      let result: number;

      if (currentY >= this.rows) {
        result = 1;
      } else {
        let count = 0;

        if (x > 0) {
          count += countTimelines(x - 1, currentY + 1);
        }

        if (x < this.cols - 1) {
          count += countTimelines(x + 1, currentY + 1);
        }

        result = count;
      }

      memo.set(stateKey, result);
      return result;
    };

    const totalTimelines = countTimelines(this.beamStart.x, this.beamStart.y);

    return `A single tachyon particle would end up on ${totalTimelines} different timelines`;
  }
}
