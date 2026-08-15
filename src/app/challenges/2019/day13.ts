import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day13 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    await computer.run();

    const outputs = computer.getIo().getOutputsLog();
    let blockTiles = 0;
    for (let i = 2; i < outputs.length; i += 3) {
      if (outputs[i] === 2) {
        blockTiles++;
      }
    }

    return `${blockTiles} block tiles`;
  }

  override async part2(): Promise<string> {
    const freePlayProgram = `2${this.text.substring(1)}`;
    const computer = new ProgramExecutor(freePlayProgram, true);
    await computer.run();
    return `Score: ${computer.getIo().getScore()}`;
  }
}
