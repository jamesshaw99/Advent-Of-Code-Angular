import { day } from '../../helpers/day';
import { runUntilCycleOrTerminal } from '../../helpers/cycleDetection';

interface Instruction {
  operation: string;
  argument: number;
}

interface ExecutionResult {
  success: boolean;
  accumulator: number;
}

interface ProgramState {
  pc: number;
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
    const step = (state: ProgramState): ProgramState => {
      const { operation, argument } = instructions[state.pc];

      switch (operation) {
        case 'acc':
          return { pc: state.pc + 1, accumulator: state.accumulator + argument };
        case 'jmp':
          return { pc: state.pc + argument, accumulator: state.accumulator };
        case 'nop':
          return { pc: state.pc + 1, accumulator: state.accumulator };
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    };

    const result = runUntilCycleOrTerminal<ProgramState>(
      { pc: 0, accumulator: 0 },
      step,
      (state) => String(state.pc),
      (state) => state.pc >= instructions.length
    );

    return { success: result.terminated, accumulator: result.state.accumulator };
  }
}
