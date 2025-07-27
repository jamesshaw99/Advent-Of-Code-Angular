import { day } from '../../helpers/day';

export class year2020day6 extends day {
  private groups: string[][] = [];

  override preChallenge(): void {
    let currentGroup: string[] = [];

    for (const line of this.input) {
      if (line.trim() === '') {
        if (currentGroup.length > 0) {
          this.groups.push(currentGroup);
          currentGroup = [];
        }
      } else {
        currentGroup.push(line);
      }
    }

    if (currentGroup.length > 0) {
      this.groups.push(currentGroup);
    }
  }

  override part1(): string {
    const totalCount = this.groups
      .map((group) => this.getUniqueAnswers(group))
      .reduce((sum, count) => sum + count, 0);

    return `Total count of questions answered 'yes': ${totalCount}`;
  }

  override part2(): string {
    const totalCount = this.groups
      .map((group) => this.getCommonAnswers(group))
      .reduce((sum, count) => sum + count, 0);

    return `Total count of questions everyone answered 'yes': ${totalCount}`;
  }

  private getUniqueAnswers(group: string[]): number {
    const uniqueChars = new Set<string>();

    for (const person of group) {
      for (const char of person) {
        uniqueChars.add(char);
      }
    }

    return uniqueChars.size;
  }

  private getCommonAnswers(group: string[]): number {
    if (group.length === 0) return 0;

    let commonAnswers = new Set(group[0]);

    for (let i = 1; i < group.length; i++) {
      const personAnswers = new Set(group[i]);
      commonAnswers = new Set(
        [...commonAnswers].filter((char) => personAnswers.has(char))
      );
    }

    return commonAnswers.size;
  }
}
