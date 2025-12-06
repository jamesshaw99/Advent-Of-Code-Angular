import { day } from '../../helpers/day';

export class year2025day3 extends day {
  override part1(): string | Promise<string> {
    const total = this.input
      .map((bank) => this.findMaxJoltage(bank, 2))
      .reduce((sum, joltage) => sum + joltage, 0);

    return `Total joltage of the banks: ${total}`;
  }

  override part2(): string | Promise<string> {
    const total = this.input
      .map((bank) => this.findMaxJoltage(bank, 12))
      .reduce((sum, joltage) => sum + joltage, 0);

    return `Total joltage of the banks: ${total}`;
  }

  findMaxJoltage(bank: string, digitsNeeded: number): number {

    if (bank.length < digitsNeeded) {
      throw new Error(`Bank ${bank} has fewer than ${digitsNeeded} digits`);
    }

    const result: string[] = [];
    let startPos = 0;

    // For each of the 12 positions we need to fill
    for (let pos = 0; pos < digitsNeeded; pos++) {
      const digitsRemaining = digitsNeeded - pos - 1;
      const mustLeaveAtLeast = digitsRemaining;
      const canSearchUntil = bank.length - mustLeaveAtLeast;

      // Find the largest digit in the valid range
      let maxDigit = bank[startPos];
      let maxDigitPos = startPos;

      for (let i = startPos; i < canSearchUntil; i++) {
        if (bank[i] > maxDigit) {
          maxDigit = bank[i];
          maxDigitPos = i;
        }
      }

      result.push(maxDigit);
      startPos = maxDigitPos + 1;
    }

    return parseInt(result.join(''));
  }
}
