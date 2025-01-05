import { day } from '../../helpers/day';

export class year2024day2 extends day {
  override part1(): string {
    let safeCount = 0;
    for (const report of this.input) {
      const levels = report.split(/\s+/).map(Number);
      if (this.isSafeReport(levels)) {
        safeCount++;
      }
    }

    return `Number of safe reports: ${safeCount}`;
  }

  override part2(): string {
    let safeCount = 0;
    for (const report of this.input) {
      const levels = report.split(/\s+/).map(Number);
      if (this.isSafeReport(levels) || this.isSafeWithDampener(levels)) {
        safeCount++;
      }
    }

    return `Number of safe reports with dampener: ${safeCount}`;
  }

  isSafeReport(levels: number[]): boolean {
    const differences = [];

    for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];
      differences.push(diff);

      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        return false;
      }
    }

    const allIncreasing = differences.every((d) => d > 0);
    const allDecreasing = differences.every((d) => d < 0);

    return allIncreasing || allDecreasing;
  }

  isSafeWithDampener(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (this.isSafeReport(modifiedLevels)) {
        return true;
      }
    }
    return false;
  }
}
