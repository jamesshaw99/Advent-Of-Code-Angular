import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

const MOVE_DELTA: Record<Direction, { dx: number; dy: number }> = {
  [Direction.UP]: { dx: 0, dy: 1 },
  [Direction.RIGHT]: { dx: 1, dy: 0 },
  [Direction.DOWN]: { dx: 0, dy: -1 },
  [Direction.LEFT]: { dx: -1, dy: 0 }
};

export class year2019day11 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const paintedPanels = await this.paint(new Map());
    return `Painted ${paintedPanels.size} squares`;
  }

  override async part2(): Promise<string> {
    const paintedPanels = await this.paint(new Map([['0,0', 1]]));
    return this.render(paintedPanels);
  }

  private async paint(panels: Map<string, number>): Promise<Map<string, number>> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().enableOutputInterrupt(true);

    let x = 0;
    let y = 0;
    let facing = Direction.UP;

    while (!computer.hasFinished()) {
      const currentKey = `${x},${y}`;
      computer.getIo().addInput(panels.get(currentKey) ?? 0);

      const outputs = await this.collectOutputs(computer, 2);
      if (outputs.length < 2) {
        break;
      }

      const [colorToPaint, turnDirection] = outputs;
      panels.set(currentKey, colorToPaint);
      facing = turnDirection === 0 ? this.turnLeft(facing) : this.turnRight(facing);

      const { dx, dy } = MOVE_DELTA[facing];
      x += dx;
      y += dy;
    }

    return panels;
  }

  private async collectOutputs(computer: ProgramExecutor, count: number): Promise<number[]> {
    const startLength = computer.getIo().getOutputsLogLength();
    while (!computer.hasFinished() && computer.getIo().getOutputsLogLength() < startLength + count) {
      await computer.run();
    }
    return computer.getIo().getOutputsLogSince(startLength);
  }

  private turnLeft(facing: Direction): Direction {
    return (facing + 3) % 4;
  }

  private turnRight(facing: Direction): Direction {
    return (facing + 1) % 4;
  }

  private render(panels: Map<string, number>): string {
    const coordinates = [...panels.keys()].map(key => key.split(',').map(Number));
    const xs = coordinates.map(([x]) => x);
    const ys = coordinates.map(([, y]) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const rows: string[] = [];
    for (let y = maxY; y >= minY; y--) {
      let row = '';
      for (let x = minX; x <= maxX; x++) {
        row += panels.get(`${x},${y}`) === 1 ? '#' : ' ';
      }
      rows.push(row);
    }

    return rows.join('\n');
  }
}
