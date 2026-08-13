import { day } from '../../helpers/day';

export class year2020day9 extends day {
  private data: number[] = [];
  private invalidNumber: number | null = null;

  override preChallenge(): void {
    this.data = this.input.map(Number);
  }

  override part1(): string {
    const preambleLen = 25;

    for (let i = preambleLen; i < this.data.length; i++) {
      if (!this.hasTwoSum(i, preambleLen)) {
        this.invalidNumber = this.data[i];
        return `First invalid number: ${this.invalidNumber}`;
      }
    }

    return 'Could not find invalid number';
  }

  override part2(): string {
    const target = this.invalidNumber ?? Number(this.part1());

    let left = 0;
    let right = 0;
    let sum = this.data[0];

    while (right < this.data.length - 1) {
      if (sum === target && right > left) {
        const range = this.data.slice(left, right + 1);
        const min = Math.min(...range);
        const max = Math.max(...range);
        return `Encryption weakness: ${min + max}`;
      } else if (sum < target) {
        right++;
        if (right < this.data.length) {
          sum += this.data[right];
        }
      } else {
        sum -= this.data[left];
        left++;
        if (left > right && left < this.data.length) {
          right = left;
          sum = this.data[left];
        }
      }
    }

    return 'Could not find encryption weakness';
  }

  private hasTwoSum(index: number, preambleLen: number): boolean {
    const target = this.data[index];
    const start = index - preambleLen;
    const seen = new Set<number>();

    for (let i = start; i < index; i++) {
      const complement = target - this.data[i];
      if (seen.has(complement)) {
        return true;
      }
      seen.add(this.data[i]);
    }

    return false;
  }
}
