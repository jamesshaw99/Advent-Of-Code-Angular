import { day } from '../../helpers/day';

export interface Problem {
  numbers: number[];
  part2numbers: number[];
  operation: '+' | '*';
}

export class year2025day6 extends day {
  problems: Problem[] = [];

  override preChallenge(): void {
    const noCols = this.input[0].trim().split(/\s+/).length;
    this.problems = Array.from(
      { length: noCols },
      () =>
        ({
          numbers: [],
          part2numbers: [],
          operation: '+',
        } as Problem)
    );
    for (const line of this.input) {
      const cols = line.trim().split(/\s+/);
      for (const [index, value] of cols.entries()) {
        if (['+', '*'].includes(value)) {
          this.problems[index].operation = value as '+' | '*';
        } else {
          this.problems[index].numbers.push(Number(value));
        }
      }
    }
    this.parseRightToLeft();
  }

  override part1(): string {
    let total = 0;

    for (const problem of this.problems) {
      if (problem.operation === '+') {
        total += problem.numbers.reduce((sum, num) => sum + num, 0);
      } else {
        total += problem.numbers.reduce((product, num) => product * num, 1);
      }
    }

    return `The grand total is ${total}`;
  }

  override part2(): string {
    let total = 0;

    for (const problem of this.problems) {
      if (problem.operation === '+') {
        total += problem.part2numbers.reduce((sum, num) => sum + num, 0);
      } else {
        total += problem.part2numbers.reduce((product, num) => product * num, 1);
      }
    }

    return `The grand total is ${total}`;
  }

  parseRightToLeft(): void {
    const maxLength = Math.max(...this.input.map(line => line.length));
    const paddedLines = this.input.map(line => line.padEnd(maxLength, ' '));
    
    let problemIndex = 0;
    let currentColumn = 0;
    
    while (currentColumn < maxLength) {
      const columnChars = paddedLines.map(line => line[currentColumn]);
      const isEmptyColumn = columnChars.every(char => char === ' ');
      
      if (isEmptyColumn) {
        currentColumn++;
        continue;
      }
      
      let endColumn = currentColumn;
      while (endColumn < maxLength) {
        const chars = paddedLines.map(line => line[endColumn]);
        const isEmpty = chars.every(char => char === ' ');
        if (isEmpty) break;
        endColumn++;
      }
      
      const numbers: number[] = [];
      
      for (let col = endColumn - 1; col >= currentColumn; col--) {
        const columnDigits: string[] = [];
        
        for (let row = 0; row < paddedLines.length - 1; row++) {
          const char = paddedLines[row][col];
          if (char !== ' ') {
            columnDigits.push(char);
          }
        }
        
        if (columnDigits.length > 0) {
          const number = parseInt(columnDigits.join(''), 10);
          if (!isNaN(number)) {
            numbers.push(number);
          }
        }
      }
      
      if (problemIndex < this.problems.length) {
        this.problems[problemIndex].part2numbers = numbers;
      }
      
      problemIndex++;
      currentColumn = endColumn;
    }
  }
}
