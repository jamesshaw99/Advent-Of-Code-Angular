import { day } from '../../helpers/day';
import { bfs } from '../../helpers/graphSearch';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

enum Direction {
  NORTH = 1,
  SOUTH = 2,
  WEST = 3,
  EAST = 4
}

const WALL = 0;
const EMPTY = 1;
const OXYGEN = 2;

const OPPOSITE: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.NORTH,
  [Direction.WEST]: Direction.EAST,
  [Direction.EAST]: Direction.WEST
};

const MOVE_DELTA: Record<Direction, { dx: number; dy: number }> = {
  [Direction.NORTH]: { dx: 0, dy: 1 },
  [Direction.SOUTH]: { dx: 0, dy: -1 },
  [Direction.WEST]: { dx: -1, dy: 0 },
  [Direction.EAST]: { dx: 1, dy: 0 }
};

export class year2019day15 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const map = await this.discoverMap();
    const distances = bfs('0,0', key => key, node => this.openNeighbors(map, node), node => map.get(node) === OXYGEN);
    const oxygen = [...distances.entries()].find(([, result]) => map.get(result.node) === OXYGEN);
    return `Shortest Path to oxygen: ${oxygen?.[1].distance}`;
  }

  override async part2(): Promise<string> {
    const map = await this.discoverMap();
    const oxygenKey = [...map.entries()].find(([, value]) => value === OXYGEN)?.[0] as string;
    const distances = bfs(oxygenKey, key => key, node => this.openNeighbors(map, node));
    const minutesToFill = Math.max(...[...distances.values()].map(result => result.distance));
    return `Minutes for oxygen to spread: ${minutesToFill}`;
  }

  private openNeighbors(map: Map<string, number>, node: string): string[] {
    const [x, y] = node.split(',').map(Number);
    return [
      `${x + 1},${y}`,
      `${x - 1},${y}`,
      `${x},${y + 1}`,
      `${x},${y - 1}`
    ].filter(key => map.has(key) && map.get(key) !== WALL);
  }

  private async discoverMap(): Promise<Map<string, number>> {
    const computer = new ProgramExecutor(this.text);
    computer.getIo().enableOutputInterrupt(true);

    const map = new Map<string, number>([['0,0', EMPTY]]);
    const travelled: Direction[] = [];
    let x = 0;
    let y = 0;

    while (true) {
      let breadcrumbTravel = false;
      let toTravel = this.findUnexploredDirection(map, x, y);

      if (toTravel === null) {
        if (travelled.length === 0) {
          break;
        }
        toTravel = OPPOSITE[travelled.pop()!];
        breadcrumbTravel = true;
      }

      computer.getIo().addInput(toTravel);
      await computer.run();
      const result = computer.getIo().getLastOutput();

      const { dx, dy } = MOVE_DELTA[toTravel];
      const nextX = x + dx;
      const nextY = y + dy;
      map.set(`${nextX},${nextY}`, result);

      if (result !== WALL) {
        if (!breadcrumbTravel) {
          travelled.push(toTravel);
        }
        x = nextX;
        y = nextY;
      }

      if (travelled.length === 0 && this.findUnexploredDirection(map, x, y) === null) {
        break;
      }
    }

    return map;
  }

  private findUnexploredDirection(map: Map<string, number>, x: number, y: number): Direction | null {
    if (!map.has(`${x},${y + 1}`)) {
      return Direction.NORTH;
    }
    if (!map.has(`${x},${y - 1}`)) {
      return Direction.SOUTH;
    }
    if (!map.has(`${x + 1},${y}`)) {
      return Direction.EAST;
    }
    if (!map.has(`${x - 1},${y}`)) {
      return Direction.WEST;
    }
    return null;
  }
}
