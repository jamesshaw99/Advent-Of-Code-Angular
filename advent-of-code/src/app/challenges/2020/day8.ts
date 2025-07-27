import { day } from '../../helpers/day';

interface Instruction {
  operation: string;
  argument: number;
}

interface ExecutionResult {
  success: boolean;
  accumulator: number;
}

export class year2020day8 extends day {
  private instructions: Instruction[] = [];

  override preChallenge(): void {
    this.instructions = this.input.map((line) => this.parseInstruction(line));
  }

  override part1(): string {
    const result = this.executeProgram(this.instructions);
    return `Value of accumulator: ${result.accumulator}`;
  }

  override part2(): string {
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];

      if (instruction.operation !== 'jmp' && instruction.operation !== 'nop') {
        continue;
      }

      const modifiedInstructions = [...this.instructions];
      modifiedInstructions[i] = {
        operation: instruction.operation === 'jmp' ? 'nop' : 'jmp',
        argument: instruction.argument,
      };

      const result = this.executeProgram(modifiedInstructions);
      if (result.success) {
        return `Value of accumulator at program termination: ${result.accumulator}`;
      }
    }

    return 'Something went wrong';
  }

  private parseInstruction(line: string): Instruction {
    const operation = line.substring(0, 3);
    const argument = parseInt(line.substring(4));
    return { operation, argument };
  }

  private executeProgram(instructions: Instruction[]): ExecutionResult {
    let accumulator = 0;
    let programCounter = 0;
    const visited = new Set<number>();

    while (programCounter < instructions.length) {
      if (visited.has(programCounter)) {
        return { success: false, accumulator };
      }

      visited.add(programCounter);
      const { operation, argument } = instructions[programCounter];

      switch (operation) {
        case 'acc':
          accumulator += argument;
          programCounter++;
          break;
        case 'jmp':
          programCounter += argument;
          break;
        case 'nop':
          programCounter++;
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    }

    return { success: true, accumulator };
  }
}
