import { day } from "../../helpers/day";

export class year2020day10 extends day {
    private adapters: number[] = [];

  override preChallenge(): void {
    this.adapters = this.input.map(Number);
    this.adapters.push(0);
    this.adapters.sort((a, b) => a - b);
    
    const deviceJoltage = Math.max(...this.adapters) + 3;
    this.adapters.push(deviceJoltage);
  }

  override part1(): string {
    let no1Jolt = 0;
    let no3Jolt = 0;

    for (let i = 1; i < this.adapters.length; i++) {
      const difference = this.adapters[i] - this.adapters[i - 1];
      
      if (difference === 1) {
        no1Jolt++;
      } else if (difference === 3) {
        no3Jolt++;
      }
    }

    return `Product of jolt differences: ${no1Jolt * no3Jolt}`;
  }

  override part2(): string {
    const memo = new Map<number, number>();
    const arrangements = this.countArrangements(0, memo);
    return `Total distinct arrangements: ${arrangements}`;
  }

  private countArrangements(index: number, memo: Map<number, number>): number {
    if (index === this.adapters.length - 1) {
      return 1;
    }

    if (memo.has(index)) {
      return memo.get(index)!;
    }

    let arrangements = 0;
    const currentJoltage = this.adapters[index];

    for (let nextIndex = index + 1; nextIndex < this.adapters.length; nextIndex++) {
      const nextJoltage = this.adapters[nextIndex];
      
      if (nextJoltage - currentJoltage <= 3) {
        arrangements += this.countArrangements(nextIndex, memo);
      } else {
        break;
      }
    }

    memo.set(index, arrangements);
    return arrangements;
  }
}