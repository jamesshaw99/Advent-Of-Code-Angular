import { day } from '../../helpers/day';

export class year2020day1 extends day {
  private intList: number[] = [];

  override preChallenge(): void {
    this.intList = this.input.map(Number).sort((a, b) => a - b);
  }

  override part1(): string {
    const target = 2020;
    let left = 0;
    let right = this.intList.length - 1;

    while (left < right) {
      const sum = this.intList[left] + this.intList[right];

      if (sum === target) {
        return `Product of entries that sum to 2020: ${(this.intList[left] * this.intList[right])}`;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    return 'Could not find entries';
  }

  override part2(): string {
    const target = 2020;
    const nums = this.intList;

    for (let i = 0; i < nums.length - 2; i++) {
      if (nums[i] >= target) break;

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];

        if (sum === target) {
          return `Product of entries that sum to 2020: ${(nums[i] * nums[left] * nums[right])}`;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }

    return 'Could not find entries';
  }
}
