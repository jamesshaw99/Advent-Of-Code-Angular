import { day } from '../../helpers/day';

export class year2021day14 extends day {
  private template = '';
  private rules = new Map<string, string>();

  override preChallenge(): void {
    this.template = this.input[0];

    for (let i = 2; i < this.input.length; i++) {
      const [pair, insertion] = this.input[i].split(' -> ');
      this.rules.set(pair, insertion);
    }
  }

  override part1(): string {
    return `Quantity difference: ${this.runSimulation(10)}`;
  }

  override part2(): string {
    return `Quantity difference: ${this.runSimulation(40)}`;
  }

  private runSimulation(iterations: number): number {
    let counter = this.initializeCounter();

    for (let step = 0; step < iterations; step++) {
      counter = this.performStep(counter);
    }

    return this.calculateDifference(counter);
  }

  private initializeCounter(): Map<string, number> {
    const counter = new Map<string, number>();

    for (let i = 0; i < this.template.length - 1; i++) {
      const pair = this.template.slice(i, i + 2);
      counter.set(pair, (counter.get(pair) || 0) + 1);
    }

    return counter;
  }

  private performStep(counter: Map<string, number>): Map<string, number> {
    const next = new Map<string, number>();

    for (const [pair, count] of counter) {
      const insertion = this.rules.get(pair);
      if (insertion) {
        const leftPair = pair[0] + insertion;
        const rightPair = insertion + pair[1];

        next.set(leftPair, (next.get(leftPair) || 0) + count);
        next.set(rightPair, (next.get(rightPair) || 0) + count);
      }
    }

    return next;
  }

  private calculateDifference(counter: Map<string, number>): number {
    const charCounts = new Map<string, number>();

    // Count first character of each pair
    for (const [pair, count] of counter) {
      const char = pair[0];
      charCounts.set(char, (charCounts.get(char) || 0) + count);
    }

    // Add the last character of the original template (never changes)
    const lastChar = this.template[this.template.length - 1];
    charCounts.set(lastChar, (charCounts.get(lastChar) || 0) + 1);

    const counts = Array.from(charCounts.values()).filter((count) => count > 0);
    const max = Math.max(...counts);
    const min = Math.min(...counts);

    return max - min;
  }
}
