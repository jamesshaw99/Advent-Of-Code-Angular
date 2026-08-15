import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day21 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const springscript = 'NOT A J\nNOT B T\nOR T J\nNOT C T\nOR T J\nAND D J\nWALK\n';
    return `Hull Damage: ${await this.runSpringdroid(springscript)}`;
  }

  override async part2(): Promise<string> {
    const springscript =
      'NOT A J\nNOT B T\nOR T J\nNOT C T\nOR T J\nAND D J\nNOT E T\nNOT T T\nOR H T\nAND T J\nRUN\n';
    return `Hull Damage: ${await this.runSpringdroid(springscript)}`;
  }

  private async runSpringdroid(springscript: string): Promise<number> {
    const computer = new ProgramExecutor(this.text);
    for (const character of springscript) {
      computer.getIo().addInput(character.charCodeAt(0));
    }
    await computer.run();
    return computer.getIo().getLastOutput();
  }
}
