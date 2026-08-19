import { day } from '../../helpers/day';
import { lcmAll } from '../../helpers/mathUtils';

type Axes = [number, number, number];

interface Moon {
  pos: Axes;
  vel: Axes;
}

export class year2019day12 extends day {
  steps = 1000;
  private initialPositions: Axes[] = [];

  override preChallenge(): void {
    this.initialPositions = this.input.map((line) => {
      const match = line.match(/x=(-?\d+),\s*y=(-?\d+),\s*z=(-?\d+)/);
      if (!match) {
        throw new Error(`Could not parse moon position: ${line}`);
      }
      return [Number(match[1]), Number(match[2]), Number(match[3])];
    });
  }

  override part1(): string {
    const moons = this.createMoons();

    for (let s = 0; s < this.steps; s++) {
      this.step(moons);
    }

    const totalEnergy = moons.reduce((sum, moon) => {
      const potential = moon.pos.reduce((acc, v) => acc + Math.abs(v), 0);
      const kinetic = moon.vel.reduce((acc, v) => acc + Math.abs(v), 0);
      return sum + potential * kinetic;
    }, 0);

    return `Total energy after ${this.steps} steps: ${totalEnergy}`;
  }

  override part2(): string {
    const cycleLengths = [0, 1, 2].map((axis) => this.findAxisCycleLength(axis));
    const overallCycle = lcmAll(cycleLengths);

    return `Steps until the system repeats its initial state: ${overallCycle}`;
  }

  private createMoons(): Moon[] {
    return this.initialPositions.map((pos) => ({ pos: [...pos] as Axes, vel: [0, 0, 0] as Axes }));
  }

  private step(moons: Moon[]): void {
    for (let i = 0; i < moons.length; i++) {
      for (let j = i + 1; j < moons.length; j++) {
        for (let axis = 0; axis < 3; axis++) {
          if (moons[i].pos[axis] < moons[j].pos[axis]) {
            moons[i].vel[axis]++;
            moons[j].vel[axis]--;
          } else if (moons[i].pos[axis] > moons[j].pos[axis]) {
            moons[i].vel[axis]--;
            moons[j].vel[axis]++;
          }
        }
      }
    }

    for (const moon of moons) {
      for (let axis = 0; axis < 3; axis++) {
        moon.pos[axis] += moon.vel[axis];
      }
    }
  }

  private findAxisCycleLength(axis: number): number {
    const initialPositions = this.initialPositions.map((pos) => pos[axis]);
    const positions = [...initialPositions];
    const velocities = positions.map(() => 0);

    let steps = 0;

    do {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[i] < positions[j]) {
            velocities[i]++;
            velocities[j]--;
          } else if (positions[i] > positions[j]) {
            velocities[i]--;
            velocities[j]++;
          }
        }
      }

      for (let i = 0; i < positions.length; i++) {
        positions[i] += velocities[i];
      }

      steps++;
    } while (!(velocities.every((v) => v === 0) && positions.every((p, i) => p === initialPositions[i])));

    return steps;
  }
}
