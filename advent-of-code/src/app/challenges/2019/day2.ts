import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

export class year2019day2 extends day {
  text!: string;

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const computer = new ProgramExecutor(this.text);
    computer.set(1, 12);
    computer.set(2, 2);
    await computer.run();
    computer.setMemoryPointer(0);
    return `Value at position 0: ${computer.getAtPointer()}`;
  }

  override async part2(): Promise<string> {
    for (let k = 0; k < 100; k++) {
      for (let j = 0; j < 100; j++) {
        const computer = new ProgramExecutor(this.text);
        computer.set(1, k);
        computer.set(2, j);
        await computer.run();
        computer.setMemoryPointer(0);
        if (computer.getAtPointer() === 19690720) {
          return `100 * noun * verb = ${(k * 100 + j)}`;
        }
      }
    }
    return 'Program failed';
  }
}
