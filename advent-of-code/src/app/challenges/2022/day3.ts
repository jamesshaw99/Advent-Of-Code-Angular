import { day } from '../../helpers/day';

export class year2022day3 extends day {
  letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  override part1(): string {
    const res = this.input
      .map((line) => this.splitInHalf(line))
      .map((pair) => this.getCommonChar(pair))
      .map((char) => this.computePriority(char))
      .reduce((sum, val) => sum + val, 0);

    return `Sum of priorities: ${res}`;
  }

  override part2(): string {
    let sum = 0;
    for (let i = 0; i < this.input.length; i += 3) {
      const commonChar = this.getCommonChar([
        this.input[i],
        this.input[i + 1],
        this.input[i + 2],
      ]);
      sum += this.computePriority(commonChar);
    }

    return `Group sum of priorities: ${sum}`;
  }

  splitInHalf(inputStr: string): string[] {
    return [
      inputStr.substring(0, inputStr.length / 2),
      inputStr.substring(inputStr.length / 2),
    ];
  }

  getCommonChar(inputs: string[]): string {
    if (inputs.length === 2) {
      const compartment1 = inputs[0];
      const compartment2 = inputs[1];
      for (let i = 0; i < compartment1.length; i++) {
        if (compartment2.indexOf(compartment1.charAt(i)) > -1) {
          return compartment1.charAt(i);
        }
      }
    } else {
      const compartment1 = inputs[0];
      const compartment2 = inputs[1];
      const compartment3 = inputs[2];
      for (let i = 0; i < compartment1.length; i++) {
        if (
          compartment2.indexOf(compartment1.charAt(i)) > -1 &&
          compartment3.indexOf(compartment1.charAt(i)) > -1
        ) {
          return compartment1.charAt(i);
        }
      }
    }
    return '';
  }

  computePriority(i: string): number {
    return this.letters.indexOf(i) + 1;
  }
}
