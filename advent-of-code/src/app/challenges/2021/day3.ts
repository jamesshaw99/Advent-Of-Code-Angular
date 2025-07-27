import { day } from '../../helpers/day';

export class year2021day3 extends day {
  override part1(): string {
    const gamma = this.getVal(true),
      epsilon = this.getVal(false);
    return `Gamma: ${gamma}, Epsilon: ${epsilon}, Power Consumption: ${
      gamma * epsilon
    }`;
  }

  override part2(): string {
    const OxyRating = this.getRating(true),
      CO2 = this.getRating(false);
    return `Oxygen Generator: ${OxyRating}, CO2 Scrubber: ${CO2}, Life Support Rating: ${
      OxyRating * CO2
    }`;
  }

  private getVal(gamma: boolean): number {
    let val = '';

    for (let i = 0; i < this.input[0].length; i++) {
      let ones = 0;
      for (const number of this.input) {
        if (number.charAt(i) === '1') {
          ones++;
        }
      }

      if (ones > this.input.length / 2) {
        val += '1';
      } else {
        val += '0';
      }
    }

    if (gamma) {
      return parseInt(val, 2);
    } else {
      const flipped = val
        .split('')
        .map((bit) => (bit === '0' ? '1' : '0'))
        .join('');
      return parseInt(flipped, 2);
    }
  }

  private getRating(oxygen: boolean): number {
    let inputCopy = [...this.input];
    let i = 0;

    while (inputCopy.length > 1) {
      let ones = 0;
      for (const number of inputCopy) {
        if (number.charAt(i) === '1') {
          ones++;
        }
      }

      const size = inputCopy.length / 2;
      let val: string;

      if (ones >= size) {
        val = oxygen ? '1' : '0';
      } else {
        val = oxygen ? '0' : '1';
      }

      inputCopy = inputCopy.filter((number) => number.charAt(i) === val);
      i++;
    }

    return parseInt(inputCopy[0], 2);
  }
}
