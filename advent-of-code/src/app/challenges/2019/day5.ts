import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day5 extends day {
  private text!: string;

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().addInput(1);
    await computer.run();
    return `Diagnostic code: ${computer.getIo().getLastOutput()}`;
  }

  override async part2(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().addInput(5);
    await computer.run();
    return `System diagnostic code: ${computer.getIo().getLastOutput()}`;
  }
}
