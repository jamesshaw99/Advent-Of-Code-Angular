import { ProgramExecutor } from "./program-executor";

export class IO {
  private inputsLog: number[] = [];
  private outputsLog: number[] = [];
  private inputs: number[] = [];
  private inputIndex = 0;
  private paddleX = 0;
  private ballX = 0;
  private score = 0;
  private board: string[][] = Array(20).fill(null).map(() => Array(38).fill(' '));
  private lastGameStateIndex = 0;
  private outputInterrupt = false;
  private emptyInputValue = 0;
  private blockOnEmptyInput = false;

  constructor(
    private executor: ProgramExecutor,
    private gameMode = false
  ) {}

  out(value: number): void {
    if (this.outputInterrupt) {
      this.executor.pause();
    }
    this.outputsLog.push(value);
  }

  async in(): Promise<number> {
    if (this.gameMode) {
      this.updateGameState();
      return this.calculateGameInput();
    }

    if (this.inputIndex < this.inputs.length) {
      return this.inputs[this.inputIndex++];
    }

    return this.emptyInputValue;
  }

  setEmptyInputValue(value: number): void {
    this.emptyInputValue = value;
  }

  hasPendingInput(): boolean {
    return this.inputIndex < this.inputs.length;
  }

  enableBlockOnEmptyInput(enabled: boolean): void {
    this.blockOnEmptyInput = enabled;
  }

  wouldBlockOnInput(): boolean {
    return this.blockOnEmptyInput && !this.gameMode && !this.hasPendingInput();
  }

  private updateGameState(): void {
    for (let i = this.lastGameStateIndex; i < this.outputsLog.length; i += 3) {
      const x = this.outputsLog[i];
      const y = this.outputsLog[i + 1];
      const tileId = this.outputsLog[i + 2];

      if (x === -1 && y === 0) {
        this.score = tileId;
        continue;
      }

      this.board[y][x] = this.getTileChar(tileId);

      if (tileId === 3) this.paddleX = x;
      if (tileId === 4) this.ballX = x;
    }

    this.lastGameStateIndex = this.outputsLog.length;
  }

  private getTileChar(tileId: number): string {
    switch (tileId) {
      case 0: return ' ';  // empty
      case 1: return 'X';  // wall
      case 2: return '#';  // block
      case 3: return '_';  // paddle
      case 4: return 'o';  // ball
      default: return ' ';
    }
  }

  private calculateGameInput(): number {
    if (this.paddleX < this.ballX) return 1;
    if (this.paddleX > this.ballX) return -1;
    return 0;
  }

  addInput(input: number): void {
    this.inputs.push(input);
    this.inputsLog.push(input);
  }

  clearInputs(): void {
    this.inputs = [];
    this.inputIndex = 0;
  }

  setInputs(inputs: number[]): void {
    this.inputs = [...inputs];
    this.inputIndex = 0;
  }

  getOutputsLog(): number[] {
    return [...this.outputsLog];
  }

  getOutputsLogLength(): number {
    return this.outputsLog.length;
  }

  getOutputsLogSince(startIndex: number): number[] {
    return this.outputsLog.slice(startIndex);
  }

  getScore(): number {
    return this.score;
  }

  getInputsLog(): number[] {
    return [...this.inputsLog];
  }

  getExecutor(): ProgramExecutor {
    return this.executor;
  }

  getLastOutput(): number {
    return this.outputsLog[this.outputsLog.length - 1];
  }

  enableOutputInterrupt(outputInterrupt: boolean): void {
    this.outputInterrupt = outputInterrupt;
  }
}
