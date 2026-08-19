import { day } from '../../helpers/day';

interface RunResult {
  output: number[];
  a: bigint;
  b: bigint;
  c: bigint;
}

export class year2024day17 extends day {
  registerA = 0n;
  registerB = 0n;
  registerC = 0n;
  program: number[] = [];

  override preChallenge(): void {
    for (const line of this.input) {
      const registerMatch = line.match(/Register ([ABC]): (\d+)/);
      const programMatch = line.match(/Program: (.+)/);

      if (registerMatch) {
        const [, name, value] = registerMatch;
        if (name === 'A') this.registerA = BigInt(value);
        else if (name === 'B') this.registerB = BigInt(value);
        else this.registerC = BigInt(value);
      } else if (programMatch) {
        this.program = programMatch[1].split(',').map(Number);
      }
    }
  }

  override part1(): string {
    const result = this.runProgram(this.registerA, this.registerB, this.registerC, this.program);
    return `Program output: ${result.output.join(',')}`;
  }

  override part2(): string {
    const lowestA = this.findLowestQuineA(this.program);
    return `Lowest initial A that outputs a copy of the program: ${lowestA}`;
  }

  findLowestQuineA(program: number[]): bigint | null {
    const search = (candidateA: bigint, index: number): bigint | null => {
      if (index < 0) return candidateA;

      for (let digit = 0n; digit < 8n; digit++) {
        const nextA = candidateA * 8n + digit;
        const output = this.runProgram(nextA, 0n, 0n, program).output;
        const expectedTail = program.slice(index);

        if (
          output.length === expectedTail.length &&
          output.every((value, i) => value === expectedTail[i])
        ) {
          const result = search(nextA, index - 1);
          if (result !== null) return result;
        }
      }

      return null;
    };

    return search(0n, program.length - 1);
  }

  runProgram(a: bigint, b: bigint, c: bigint, program: number[]): RunResult {
    const output: number[] = [];
    let ip = 0;

    const combo = (operand: number): bigint => {
      switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
          return BigInt(operand);
        case 4:
          return a;
        case 5:
          return b;
        case 6:
          return c;
        default:
          throw new Error(`Invalid combo operand: ${operand}`);
      }
    };

    while (ip < program.length) {
      const opcode = program[ip];
      const operand = program[ip + 1];

      switch (opcode) {
        case 0:
          a = a / (2n ** combo(operand));
          ip += 2;
          break;
        case 1:
          b = b ^ BigInt(operand);
          ip += 2;
          break;
        case 2:
          b = combo(operand) % 8n;
          ip += 2;
          break;
        case 3:
          ip = a !== 0n ? operand : ip + 2;
          break;
        case 4:
          b = b ^ c;
          ip += 2;
          break;
        case 5:
          output.push(Number(combo(operand) % 8n));
          ip += 2;
          break;
        case 6:
          b = a / (2n ** combo(operand));
          ip += 2;
          break;
        case 7:
          c = a / (2n ** combo(operand));
          ip += 2;
          break;
        default:
          throw new Error(`Invalid opcode: ${opcode}`);
      }
    }

    return { output, a, b, c };
  }
}
