import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day9 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().addInput(1);
    await computer.run();
    return `BOOST keycode: ${computer.getIo().getLastOutput()}`;
  }

  override async part2(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().addInput(2);
    await computer.run();
    return `Distress signal coordinates: ${computer.getIo().getLastOutput()}`;
  }
}
