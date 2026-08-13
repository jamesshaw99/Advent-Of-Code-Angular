import { IO } from './io';
import { OpcodeInfo } from './opcode-info';
import { ParameterMode } from './parameter-mode';
import { setupOpcodes } from './setup-opcodes';

export class ProgramExecutor {
  private memory = new Map<number, number>();
  private io: IO;
  private relativePointer = 0;
  private memoryPointer = 0;
  private finished = false;
  private paused = false;

  constructor(program: number[] | string, gameMode = false) {
    setupOpcodes();
    
    const numberProgram = typeof program === 'string'
      ? program.split(',').map(s => Number(s.trim()))
      : program;

    numberProgram.forEach((value, index) => {
      this.memory.set(index, value);
    });

    this.io = new IO(this, gameMode);
  }

  async run(): Promise<string> {
    this.paused = false;

    while (!this.finished && !this.paused) {
      const info = OpcodeInfo.recognise(this.getAtPointer());
      const opcode = info.getOpcodeClass();
      await opcode.run(this);
    }
    return "FINISHED";
  }

  reset(): void {
    this.finished = false;
    this.paused = false;
    this.memoryPointer = 0;
  }

  adjustRelativePointer(offset: number): void {
    this.relativePointer += offset;
  }

  pause(): void {
    this.paused = true;
  }

  stop(): void {
    this.finished = true;
  }

  getAtPointer(): number {
    return this.memory.get(this.memoryPointer) ?? 0;
  }

  getWriteAddress(mode: ParameterMode, arg: number): number {
    switch(mode) {
      case ParameterMode.POSITION:
        return arg;
      case ParameterMode.RELATIVE:
        return this.relativePointer + arg;
      case ParameterMode.IMMEDIATE:
        throw new Error("Parameter that you are writing to can't be in immediate mode");
      default:
        throw new Error("Invalid address parameter mode");
    }
  }

  get(mode: ParameterMode, arg: number): number {
    switch(mode) {
      case ParameterMode.POSITION:
        return this.memory.get(arg) ?? 0;
      case ParameterMode.IMMEDIATE:
        return arg;
      case ParameterMode.RELATIVE:
        return this.memory.get(this.relativePointer + arg) ?? 0;
      default:
        throw new Error("Invalid Parameter Mode");
    }
  }

  getAtPointerAndIncrement(): number {
    const value = this.memory.get(this.memoryPointer) ?? 0;
    this.memoryPointer++;
    return value;
  }

  setMemoryPointer(address: number): void {
    this.memoryPointer = address;
  }

  set(address: number, value: number): void {
    this.memory.set(address, value);
  }

  getIo(): IO {
    return this.io;
  }

  hasFinished(): boolean {
    return this.finished;
  }

  getMemory(): Map<number, number> {
    return new Map(this.memory);
  }
}
