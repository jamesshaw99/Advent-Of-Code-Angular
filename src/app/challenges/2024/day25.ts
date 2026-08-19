import { day } from '../../helpers/day';

export class year2024day25 extends day {
  locks: number[][] = [];
  keys: number[][] = [];

  override preChallenge(): void {
    this.locks = [];
    this.keys = [];

    let schematic: string[] = [];
    for (const line of [...this.input, '']) {
      if (line.trim() === '') {
        if (schematic.length > 0) {
          this.addSchematic(schematic);
          schematic = [];
        }
        continue;
      }
      schematic.push(line);
    }
  }

  addSchematic(schematic: string[]): void {
    const isLock = schematic[0] === '#####';
    const heights = this.columnHeights(schematic);

    if (isLock) {
      this.locks.push(heights);
    } else {
      this.keys.push(heights);
    }
  }

  columnHeights(schematic: string[]): number[] {
    const columnCount = schematic[0].length;
    const heights: number[] = [];

    for (let col = 0; col < columnCount; col++) {
      let filled = 0;
      for (const row of schematic) {
        if (row[col] === '#') filled++;
      }
      heights.push(filled - 1);
    }

    return heights;
  }

  override part1(): string {
    const fittingPairs = this.countFittingPairs();
    return `Number of unique lock/key pairs that fit: ${fittingPairs}`;
  }

  override part2(): string | Promise<string> {
    return '2024 complete'
  }

  countFittingPairs(): number {
    let count = 0;

    for (const lock of this.locks) {
      for (const key of this.keys) {
        if (this.fits(lock, key)) {
          count++;
        }
      }
    }

    return count;
  }

  fits(lock: number[], key: number[]): boolean {
    return lock.every((height, col) => height + key[col] <= 5);
  }
}
