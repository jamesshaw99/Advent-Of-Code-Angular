import { day } from '../../helpers/day';

export class year2018day5 extends day {
  private polymer = '';

  override preChallenge(): void {
    this.polymer = this.input[0];
  }

  override part1(): string {
    return `Units remaining: ${this.react(this.polymer).length}`;
  }

  override part2(): string {
    let shortest = Infinity;

    for (let code = 97; code <= 122; code++) {
      const unit = String.fromCharCode(code);
      const filtered = [...this.polymer].filter(char => char.toLowerCase() !== unit).join('');
      shortest = Math.min(shortest, this.react(filtered).length);
    }

    return `Shortest polymer after removing one unit type: ${shortest}`;
  }

  private react(polymer: string): string {
    const stack: string[] = [];

    for (const unit of polymer) {
      const top = stack[stack.length - 1];
      if (top !== undefined && top !== unit && top.toLowerCase() === unit.toLowerCase()) {
        stack.pop();
      } else {
        stack.push(unit);
      }
    }

    return stack.join('');
  }
}
