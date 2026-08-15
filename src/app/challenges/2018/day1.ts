import { day } from '../../helpers/day';

export class year2018day1 extends day {
  private changes: number[] = [];

  override preChallenge(): void {
    this.changes = this.input.map(Number);
  }

  override part1(): string {
    const frequency = this.changes.reduce((sum, change) => sum + change, 0);
    return `Resulting frequency: ${frequency}`;
  }

  override part2(): string {
    const seen = new Set<number>([0]);
    let frequency = 0;

    for (let i = 0; ; i = (i + 1) % this.changes.length) {
      frequency += this.changes[i];
      if (seen.has(frequency)) {
        return `First frequency reached twice: ${frequency}`;
      }
      seen.add(frequency);
    }
  }
}
