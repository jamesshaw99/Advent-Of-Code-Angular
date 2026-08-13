import { ProgramExecutor } from "./program-executor";

interface GameBoard {
  board: string[][];
  score: number;
  paddleX: number;
  ballX: number;
}

export class IO {
  private inputsLog: number[] = [];
  private outputsLog: number[] = [];
  private inputs: number[] = [];
  private inputsIterator: Iterator<number>;
  private paddleX = 0;
  private ballX = 0;
  private score = 0;
  private outputInterrupt = false;

  constructor(
    private executor: ProgramExecutor,
    private gameMode = false
  ) {
    this.inputsIterator = this.inputs[Symbol.iterator]();
  }

  out(value: number): void {
    if (this.outputInterrupt) {
      this.executor.pause();
    }
    this.outputsLog.push(value);
  }

  async in(): Promise<number> {
    if (this.gameMode) {
      const gameState = this.updateGameState();
      this.score = gameState.score;
      this.paddleX = gameState.paddleX;
      this.ballX = gameState.ballX;
      
      return this.calculateGameInput();
    }

    const result = this.inputsIterator.next();
    if (!result.done) {
      return result.value;
    }

    return 0;
  }

  private updateGameState(): GameBoard {
    const board: string[][] = Array(20).fill(null).map(() => Array(38).fill(' '));
    let score = 0;
    let paddleX = this.paddleX;
    let ballX = this.ballX;

    for (let i = 0; i < this.outputsLog.length; i += 3) {
      const x = this.outputsLog[i];
      const y = this.outputsLog[i + 1];
      const tileId = this.outputsLog[i + 2];

      if (x === -1 && y === 0) {
        score = tileId;
        continue;
      }

      const tile = this.getTileChar(tileId);
      board[y][x] = tile;

      if (tileId === 3) paddleX = x;
      if (tileId === 4) ballX = x;
    }

    return { board, score, paddleX, ballX };
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
    this.inputsIterator = this.inputs[Symbol.iterator]();
  }

  clearInputs(): void {
    this.inputs = [];
    this.inputsIterator = this.inputs[Symbol.iterator]();
  }

  setInputs(inputs: number[]): void {
    this.inputs = [...inputs];
    this.inputsIterator = this.inputs[Symbol.iterator]();
  }

  getOutputsLog(): number[] {
    return [...this.outputsLog];
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
