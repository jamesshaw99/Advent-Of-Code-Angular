import { day } from '../helpers/day';

export class year2024day3 extends day {
  memory: string = '';
  override preChallenge(): void {
    this.memory = this.input.join('');
  }

  override part1(): string {
    const sum = this.calculate(this.memory);

    return `Results of multiplications: ${sum}`;
  }

  override part2(): string {
    const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const filteredInput = this.memory
      .split("don't()")
      .map((part, index) => {
        if (index === 0) return part;
        const [_disabled, ...enabled] = part.split('do()');
        return enabled.length ? enabled.join() : '';
      })
      .filter((part) => !!part)
      .join();

    const sum = this.calculate(filteredInput);
    return `Results of just enabled multiplications: ${sum}`;
  }

  calculate(input: string): number {
    const mulPattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
    let match;
    let sum = 0;

    while ((match = mulPattern.exec(input)) !== null) {
      const [_, x, y] = match;
      sum += parseInt(x, 10) * parseInt(y, 10);
    }
    return sum;
  }
}
