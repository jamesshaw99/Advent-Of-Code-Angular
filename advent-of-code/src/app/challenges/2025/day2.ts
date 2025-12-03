import { day } from '../../helpers/day';

export class year2025day2 extends day {
  ranges: string[] = [];

  override preChallenge(): void {
    for (const range of this.input[0].split(',')) {
      this.ranges.push(range);
    }
  }

  override part1(): string {
    let total = 0;

    for (const range of this.ranges) {
      const [start, end] = range.split('-').map(Number);

      for (let i = start; i <= end; i++) {
        if (this.hasRepeatingPattern(i, true)) {
          total += i;
        }
      }
    }

    return `Total of invalid IDs: ${total}`;
  }

  override part2(): string {
    let total = 0;

    for (const range of this.ranges) {
      const [start, end] = range.split('-').map(Number);

      for (let i = start; i <= end; i++) {
        if (this.hasRepeatingPattern(i, false)) {
          total += i;
        }
      }
    }

    return `Total of invalid IDs: ${total}`;
  }

  hasRepeatingPattern(num: number, exactlyTwo: boolean): boolean {
    const str = num.toString();
    const len = str.length;

    for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
      if (len % patternLen === 0) {
        const pattern = str.substring(0, patternLen);
        const repetitions = len / patternLen;
        const repeated = pattern.repeat(repetitions);

        if (repeated === str) {
          if (exactlyTwo && repetitions === 2) {
            return true;
          } else if (!exactlyTwo && repetitions >= 2) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
