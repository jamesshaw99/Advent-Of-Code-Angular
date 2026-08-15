import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day19 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    let count = 0;
    for (let y = 0; y < 50; y++) {
      for (let x = 0; x < 50; x++) {
        if (await this.check(x, y)) {
          count++;
        }
      }
    }
    return `Total Affected Points: ${count}`;
  }

  override async part2(): Promise<string> {
    const [, firstY] = await this.find(100, 30);
    const [x, y] = await this.find(firstY - 30, 1);
    return `Result: ${x * 10000 + y}`;
  }

  private async find(yStart: number, yOffset: number): Promise<[number, number]> {
    const xToY = await this.getXtoY();

    for (let y = yStart; ; y += yOffset) {
      let trackingBeam = false;
      for (let x = Math.floor(y * xToY); ; x++) {
        const beam = await this.check(x, y);
        if (!trackingBeam) {
          trackingBeam = beam;
        } else if (!beam || !(await this.check(x + 99, y))) {
          break;
        }
        if (await this.check(x, y + 99)) {
          return [x, y];
        }
      }
    }
  }

  private async getXtoY(): Promise<number> {
    for (let x = 0; ; x++) {
      if (await this.check(x, 100)) {
        return x / 100;
      }
    }
  }

  private async check(x: number, y: number): Promise<boolean> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().addInput(x);
    computer.getIo().addInput(y);
    await computer.run();
    return computer.getIo().getLastOutput() === 1;
  }
}
