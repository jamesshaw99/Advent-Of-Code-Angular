import { day } from '../../helpers/day';

export class year2019day16 extends day {
  private static readonly basePattern = [0, 1, 0, -1];

  private line = '';
  private digits: number[] = [];

  override preChallenge(): void {
    this.line = this.input[0];
    this.digits = this.line.split('').map(Number);
  }

  override part1(): string {
    let numbers = this.digits.slice();
    for (let phase = 0; phase < 100; phase++) {
      numbers = this.applyPhase(numbers);
    }
    return `First 8 digits: ${numbers.slice(0, 8).join('')}`;
  }

  override part2(): string {
    const offset = Number(this.line.slice(0, 7));
    const repeated = this.line.repeat(10000);
    let numbers = repeated.slice(offset).split('').map(Number);

    for (let phase = 0; phase < 100; phase++) {
      numbers = this.applyPhaseFromSuffix(numbers);
    }

    return `First 8 digits: ${numbers.slice(0, 8).join('')}`;
  }

  private applyPhase(numbers: number[]): number[] {
    const n = numbers.length;
    const output = new Array<number>(n);

    for (let i = 1; i <= n; i++) {
      let total = 0;
      for (let j = 1; j <= n; j++) {
        total += year2019day16.basePattern[Math.floor(j / i) % 4] * numbers[j - 1];
      }
      output[i - 1] = Math.abs(total) % 10;
    }

    return output;
  }

  private applyPhaseFromSuffix(numbers: number[]): number[] {
    const n = numbers.length;
    const output = new Array<number>(n);
    output[n - 1] = numbers[n - 1];

    for (let i = n - 2; i >= 0; i--) {
      output[i] = (numbers[i] + output[i + 1]) % 10;
    }

    return output;
  }
}
