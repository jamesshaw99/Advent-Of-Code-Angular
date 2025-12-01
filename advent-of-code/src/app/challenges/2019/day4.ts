import { day } from '../../helpers/day';

export class year2019day4 extends day {
  private min!: number;
  private max!: number;

  override preChallenge(): void {
    const [min, max] = this.input[0].split('-').map(Number);
    this.min = min;
    this.max = max;
  }

  override part1(): string {
    let count = 0;
    for (let i = this.min; i <= this.max; i++) {
      const value = i.toString();
      if (this.rule1(value) && this.rule2(value) && this.rule3(value)) {
        count++;
      }
    }
    return `${count} different passwords meet the criteria`;
  }

  override part2(): string {
    let count = 0;
    for (let i = this.min; i <= this.max; i++) {
      const value = i.toString();
      if (this.rule1(value) && 
          this.rule2(value) && 
          this.rule3(value) && 
          this.rule4(value)) {
        count++;
      }
    }
    return `${count} different passwords meet the criteria`;
  }

  private rule1(value: string): boolean {
    return value.length === 6;
  }

  private rule2(value: string): boolean {
    return value.split('').some((char, i) => i > 0 && char === value[i - 1]);
  }

  private rule3(value: string): boolean {
    return value.split('').every((char, i) => i === 0 || char >= value[i - 1]);
  }

  private rule4(value: string): boolean {
    return [...new Set(value)].some(char => 
      value.split(char).length - 1 === 2
    );
  }
}
