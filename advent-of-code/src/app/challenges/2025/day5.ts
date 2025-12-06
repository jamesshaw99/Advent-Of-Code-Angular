import { day } from '../../helpers/day';

interface Range {
  start: number;
  end: number;
}
export class year2025day5 extends day {
  freshRanges: Range[] = [];
  ingredientIds: number[] = [];

  override preChallenge(): void {
    let isIngredientList = false;
    for (const line of this.input) {
      if (line == '') {
        isIngredientList = true;
        continue;
      }
      if (isIngredientList) {
        this.ingredientIds.push(Number.parseInt(line));
      } else {
        const [start, end] = line.split('-').map(Number);
        this.freshRanges.push({ start, end });
      }
    }
  }

  override part1(): string {
    const freshCount = this.ingredientIds.filter((id) =>
      this.isIngredientFresh(id)
    ).length;

    return `${freshCount} ingredients are fresh`;
  }

  override part2(): string {
    const sortedRanges = [...this.freshRanges].sort(
      (a, b) => a.start - b.start
    );
    const mergedRanges: Range[] = [sortedRanges[0]];

    for (let i = 1; i < sortedRanges.length; i++) {
      const current = sortedRanges[i];
      const lastMerged = mergedRanges[mergedRanges.length - 1];

      if (current.start <= lastMerged.end + 1) {
        lastMerged.end = Math.max(lastMerged.end, current.end);
      } else {
        mergedRanges.push(current);
      }
    }

    const count = mergedRanges.reduce((total, range) => {
      return total + (range.end - range.start + 1);
    }, 0);
    return `${count} IDs are fresh`;
  }

  isIngredientFresh(id: number): boolean {
    return this.freshRanges.some(
      (range) => id >= range.start && id <= range.end
    );
  }
}
