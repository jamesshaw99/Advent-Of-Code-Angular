import { day } from '../../helpers/day';

export class year2018day2 extends day {
  private ids: string[] = [];

  override preChallenge(): void {
    this.ids = this.input;
  }

  override part1(): string {
    let twos = 0;
    let threes = 0;

    for (const id of this.ids) {
      const counts = new Map<string, number>();
      for (const char of id) {
        counts.set(char, (counts.get(char) ?? 0) + 1);
      }

      if ([...counts.values()].includes(2)) {
        twos++;
      }
      if ([...counts.values()].includes(3)) {
        threes++;
      }
    }

    return `Checksum: ${twos * threes}`;
  }

  override part2(): string {
    for (let i = 0; i < this.ids.length; i++) {
      for (let j = i + 1; j < this.ids.length; j++) {
        const common = this.commonLetters(this.ids[i], this.ids[j]);
        if (common !== null) {
          return `Common letters: ${common}`;
        }
      }
    }

    return 'No matching pair of box IDs found';
  }

  private commonLetters(a: string, b: string): string | null {
    let differences = 0;
    let common = '';

    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        common += a[i];
      } else {
        differences++;
        if (differences > 1) {
          return null;
        }
      }
    }

    return differences === 1 ? common : null;
  }
}
