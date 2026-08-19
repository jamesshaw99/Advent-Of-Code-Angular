import { day } from '../../helpers/day';

interface ClawMachine {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  px: number;
  py: number;
}

export class year2024day13 extends day {
  machines: ClawMachine[] = [];

  override preChallenge(): void {
    this.machines = [];
    let current: Partial<ClawMachine> = {};

    for (const line of this.input) {
      const buttonMatch = line.match(/Button (A|B): X\+(\d+), Y\+(\d+)/);
      const prizeMatch = line.match(/Prize: X=(\d+), Y=(\d+)/);

      if (buttonMatch) {
        const [, label, x, y] = buttonMatch;
        if (label === 'A') {
          current.ax = Number(x);
          current.ay = Number(y);
        } else {
          current.bx = Number(x);
          current.by = Number(y);
        }
      } else if (prizeMatch) {
        const [, x, y] = prizeMatch;
        current.px = Number(x);
        current.py = Number(y);
        this.machines.push(current as ClawMachine);
        current = {};
      }
    }
  }

  override part1(): string {
    const maxPresses = 100;
    let totalCost = 0;

    for (const machine of this.machines) {
      const solution = this.solveMachine(machine);
      if (solution && solution.a <= maxPresses && solution.b <= maxPresses) {
        totalCost += solution.a * 3 + solution.b;
      }
    }

    return `Minimum tokens to win all possible prizes: ${totalCost}`;
  }

  override part2(): string {
    const prizeOffset = 10000000000000;
    let totalCost = 0;

    for (const machine of this.machines) {
      const correctedMachine: ClawMachine = {
        ...machine,
        px: machine.px + prizeOffset,
        py: machine.py + prizeOffset,
      };

      const solution = this.solveMachine(correctedMachine);
      if (solution) {
        totalCost += solution.a * 3 + solution.b;
      }
    }

    return `Minimum tokens to win all possible prizes with corrected coordinates: ${totalCost}`;
  }

  solveMachine(machine: ClawMachine): { a: number; b: number } | null {
    const { ax, ay, bx, by, px, py } = machine;
    const determinant = ax * by - ay * bx;
    if (determinant === 0) {
      return null;
    }

    const aNumerator = px * by - py * bx;
    const bNumerator = ax * py - ay * px;

    if (aNumerator % determinant !== 0 || bNumerator % determinant !== 0) {
      return null;
    }

    const a = aNumerator / determinant;
    const b = bNumerator / determinant;

    if (a < 0 || b < 0) {
      return null;
    }

    return { a, b };
  }
}
