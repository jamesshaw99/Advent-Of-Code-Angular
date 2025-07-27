import { day } from '../../helpers/day';

export class year2020day18 extends day {
  override preChallenge(): void {
    this.input = this.input.map((line) => line.replace(/\s+/g, ''));
  }

  override part1(): string {
    const sum = this.input
      .map((line) => this.doMath(line, true))
      .reduce((acc, val) => acc + val, 0);
    return `Sum of resulting values: ${sum}`;
  }

  override part2(): string {
    const sum = this.input
      .map((line) => this.doMath(line, false))
      .reduce((acc, val) => acc + val, 0);
    return `Sum of results: ${sum}`;
  }

  private doMath(expression: string, part1: boolean): number {
    let pos = -1;
    let ch = -1;

    function nextChar() {
      pos++;
      ch = pos < expression.length ? expression.charCodeAt(pos) : -1;
    }

    function eat(charToEat: number): boolean {
      while (ch === 32) nextChar();
      if (ch === charToEat) {
        nextChar();
        return true;
      }
      return false;
    }

    function parse(): number {
      nextChar();
      const x = parseExpression();
      if (pos < expression.length) {
        throw new Error(`Unexpected: ${String.fromCharCode(ch)}`);
      }
      return x;
    }

    function parseExpression(): number {
      if (part1) {
        let x = parseFactor();
        while (true) {
          if (eat('+'.charCodeAt(0))) x += parseFactor();
          else if (eat('-'.charCodeAt(0))) x -= parseFactor();
          else if (eat('*'.charCodeAt(0))) x *= parseFactor();
          else if (eat('/'.charCodeAt(0))) x /= parseFactor();
          else return x;
        }
      } else {
        let x = parseTerm();
        while (true) {
          if (eat('*'.charCodeAt(0))) x *= parseTerm();
          else if (eat('/'.charCodeAt(0))) x /= parseTerm();
          else return x;
        }
      }
    }

    function parseTerm(): number {
      let x = parseFactor();
      while (true) {
        if (eat('+'.charCodeAt(0))) x += parseFactor();
        else if (eat('-'.charCodeAt(0))) x -= parseFactor();
        else return x;
      }
    }

    function parseFactor(): number {
      if (eat('+'.charCodeAt(0))) return parseFactor();
      if (eat('-'.charCodeAt(0))) return -parseFactor();

      let x: number;
      const startPos = pos;

      if (eat('('.charCodeAt(0))) {
        x = parseExpression();
        if (!eat(')'.charCodeAt(0))) {
          throw new Error("Expected ')'");
        }
      } else if ((ch >= 48 && ch <= 57) || ch === 46) {
        while ((ch >= 48 && ch <= 57) || ch === 46) nextChar();
        x = parseFloat(expression.substring(startPos, pos));
        if (isNaN(x)) {
          throw new Error(
            `Invalid number: ${expression.substring(startPos, pos)}`
          );
        }
      } else {
        throw new Error(`Unexpected: ${String.fromCharCode(ch)}`);
      }

      return x;
    }

    return parse();
  }
}
