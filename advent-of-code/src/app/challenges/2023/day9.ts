import { day } from '../../helpers/day';

export class year2023day9 extends day {
  oasisReport: number[][] = [];

  override preChallenge(): void {
    this.input.forEach((line) => {
      const stringArray = line.trim().split(/\s+/);
      const inputList: number[] = stringArray.map(Number);
      this.oasisReport.push(inputList);
    });
  }

  override part1(): string {
    return `Sum of extrapolated values (forward): ${this.solution(true)}`;
  }

  override part2(): string {
    return `Sum of extrapolated values (backwards): ${this.solution(false)}`;
  }

  solution(part1: boolean): number {
    return this.oasisReport.reduce((sum, longs) => {
      return (
        sum +
        (part1
          ? longs[longs.length - 1] + this.calcRes(longs, true)
          : longs[0] - this.calcRes(longs, false))
      );
    }, 0);
  }

  calcRes(longs: number[], part1: boolean): number {
    const deltas = this.connectedPairs(longs).map((i) =>
      this.difference(longs[i - 1], longs[i])
    );

    const distinctCount = new Set(deltas).size;

    if (distinctCount > 1) {
      return part1
        ? deltas[deltas.length - 1] + this.calcRes(deltas, true)
        : deltas[0] - this.calcRes(deltas, false);
    }

    return deltas[deltas.length - 1];
  }

  difference(l1: number, l2: number): number {
    return l2 - l1;
  }

  connectedPairs<A>(list: A[]): number[] {
    return Array.from({ length: list.length - 1 }, (_, i) => i + 1);
  }
}
