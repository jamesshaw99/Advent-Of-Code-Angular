import { day } from '../../helpers/day';

export class year2023day1 extends day {
  private values: number[] = [];

  public override part1(): string {
    this.setValues(this.input);
    return 'Sum of values: ' + this.values.reduce((a, b) => a + b, 0);
  }

  public override part2(): string {
    const newInput = this.modifyInput(this.input);
    this.setValues(newInput);
    return 'Sum of values: ' + this.values.reduce((a, b) => a + b, 0);
  }

  private modifyInput(input: string[]): string[] {
    const map: Record<string, string> = {
      one: 'o1e',
      two: 't2',
      three: '3e',
      four: '4',
      five: '5e',
      six: '6',
      seven: '7n',
      eight: '8t',
      nine: '9e',
    };

    const newInput: string[] = [];
    for (let line of input) {
      for (const [key, value] of Object.entries(map)) {
        line = line.replace(new RegExp(key, 'g'), value);
      }
      newInput.push(line);
    }
    return newInput;
  }

  private setValues(strings: string[]): void {
    this.values = [];
    for (const line of strings) {
      const allMatches: string[] = [];
      const regex = /(\d)/g;
      let match;
      while ((match = regex.exec(line)) !== null) {
        allMatches.push(match[0]);
      }
      if (allMatches.length > 0) {
        this.values.push(
          parseInt(allMatches[0] + allMatches[allMatches.length - 1])
        );
      }
    }
  }
}
