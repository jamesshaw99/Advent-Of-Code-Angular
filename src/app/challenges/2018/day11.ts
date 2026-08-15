import { day } from '../../helpers/day';

const GRID_SIZE = 300;

export class year2018day11 extends day {
  private serial = 0;
  private prefixSums: number[][] = [];

  override preChallenge(): void {
    this.serial = Number(this.input[0]);
    this.prefixSums = this.buildPrefixSums(this.serial);
  }

  override part1(): string {
    const { x, y } = this.bestSquare(3);
    return `${x},${y}`;
  }

  override part2(): string {
    let best = { x: 0, y: 0, size: 0, power: -Infinity };

    for (let size = 1; size <= GRID_SIZE; size++) {
      const candidate = this.bestSquare(size);
      if (candidate.power > best.power) {
        best = { ...candidate, size };
      }
    }

    return `${best.x},${best.y},${best.size}`;
  }

  private bestSquare(size: number): { x: number; y: number; power: number } {
    let best = { x: 0, y: 0, power: -Infinity };

    for (let x = 1; x <= GRID_SIZE - size + 1; x++) {
      for (let y = 1; y <= GRID_SIZE - size + 1; y++) {
        const power = this.squareSum(x, y, size);
        if (power > best.power) {
          best = { x, y, power };
        }
      }
    }

    return best;
  }

  private squareSum(x: number, y: number, size: number): number {
    const x2 = x + size - 1;
    const y2 = y + size - 1;
    return (
      this.prefixSums[x2][y2] -
      this.prefixSums[x - 1][y2] -
      this.prefixSums[x2][y - 1] +
      this.prefixSums[x - 1][y - 1]
    );
  }

  private buildPrefixSums(serial: number): number[][] {
    const prefix: number[][] = Array.from({ length: GRID_SIZE + 1 }, () => new Array(GRID_SIZE + 1).fill(0));

    for (let x = 1; x <= GRID_SIZE; x++) {
      for (let y = 1; y <= GRID_SIZE; y++) {
        const power = this.powerLevel(x, y, serial);
        prefix[x][y] = power + prefix[x - 1][y] + prefix[x][y - 1] - prefix[x - 1][y - 1];
      }
    }

    return prefix;
  }

  private powerLevel(x: number, y: number, serial: number): number {
    const rackId = x + 10;
    let power = rackId * y;
    power += serial;
    power *= rackId;
    power = Math.floor(power / 100) % 10;
    return power - 5;
  }
}
