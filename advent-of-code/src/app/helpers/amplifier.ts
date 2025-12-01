import { ExitReason } from './enums';

export class Amplifier {
  private programMem: number[];
  private programCount = 0;
  inputs: number[] = [];
  private inputIndex = 0;
  private outputs: number[] = [];
  totalOutputs: number[] = [];
  lastExitReason: ExitReason = ExitReason.NEED_INPUT;

  constructor(instructionSet: string) {
    this.programMem = instructionSet.split(',').map(Number);
  }

  addInput(input: number): void {
    this.inputs.push(input);
  }

  addInputs(inputs: number[]): void {
    this.inputs.push(...inputs);
  }

  getAvailableOutputs(): number[] {
    const result = this.outputs;
    this.outputs = [];
    return result;
  }

  runUntilBlockedOrExited(): void {
    this.lastExitReason = this.runProgram();
  }

  private runProgram(): ExitReason {
    while (true) {
      const instruction = this.programMem[this.programCount++];
      const operationCode = instruction % 100;
      const parameterModes = this.extractParameterModes(instruction);
       console.log(instruction, operationCode)
      if (operationCode === 99) {
        return ExitReason.EXITED;
      }
      if (this.isThreeParameterOpCode(operationCode)) {
        this.executeThreeParamOp(operationCode, parameterModes);
      } else if (operationCode === 3 || operationCode === 4) {
        this.executeInputOutput(operationCode, parameterModes);
      } else if (operationCode === 5 || operationCode === 6) {
        this.executeJump(operationCode, parameterModes);
      } else {
        throw new Error(`Unexpected opcode: ${operationCode}`);
      }
    }
  }

  private extractParameterModes(instruction: number): number[] {
    const modes: number[] = [0, 0, 0];
    let modeValue = instruction / 100;
    let index = 0;
    while (modeValue > 0 && index < 3) {
      modes[index] = modeValue % 10;
      modeValue = modeValue / 10;
      index++;
    }

    return modes;
  }

  private getParameter(mode: number): number {
    const param = this.programMem[this.programCount++];
    return mode === 1 ? param : this.programMem[param];
  }

  private executeThreeParamOp(opCode: number, modes: number[]): void {
    const first = this.getParameter(modes[0]);
    const second = this.getParameter(modes[1]);
    const position = this.programMem[this.programCount++];

    let value: number;
    switch (opCode) {
      case 1:
        value = first + second;
        break;
      case 2:
        value = first * second;
        break;
      case 7:
        value = first < second ? 1 : 0;
        break;
      case 8:
        value = first === second ? 1 : 0;
        break;
      default:
        throw new Error(`Unexpected 3-param opcode: ${opCode}`);
    }

    this.programMem[position] = value;
  }

  private executeInputOutput(opCode: number, modes: number[]): void {
    const param = this.programMem[this.programCount++];
    if (opCode === 3) {
      if (this.inputIndex >= this.inputs.length) {
        this.programCount -= 2;
        this.lastExitReason = ExitReason.NEED_INPUT;
        throw new Error('BLOCKED');
      }
      this.programMem[param] = this.inputs[this.inputIndex++];
    } else {
      const value = modes[0] === 1 ? param : this.programMem[param];
      this.outputs.push(value);
      this.totalOutputs.push(value);
    }
  }

  private executeJump(opCode: number, modes: number[]): void {
    const condition = this.getParameter(modes[0]);
    const target = this.getParameter(modes[1]);

    if (
      (opCode === 5 && condition !== 0) ||
      (opCode === 6 && condition === 0)
    ) {
      this.programCount = target;
    }
  }

  private isThreeParameterOpCode(opCode: number): boolean {
    return [1, 2, 7, 8].includes(opCode);
  }
}
