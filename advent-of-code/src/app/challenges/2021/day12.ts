import { BigCave, Cave, SmallCave } from '../../helpers/cave';
import { day } from '../../helpers/day';

export class year2021day12 extends day {
  private caveMap = new Map<string, Cave>();
  private start: Cave | null = null;
  private end: Cave | null = null;

  override preChallenge(): void {
    for (const line of this.input) {
      this.addData(line.split('-'));
    }
  }

  override part1(): string {
    return `Total number of paths: ${this.walk(new Set(), this.start!)}`;
  }

  override part2(): string {
    return `Total number of paths: ${this.walkWithRepeat(
      new Set(),
      this.start!,
      false
    )}`;
  }

  private addData(nodes: string[]): void {
    const firstCave = this.createCave(nodes[0]);
    const secondCave = this.createCave(nodes[1]);

    firstCave.addCave(secondCave);
    secondCave.addCave(firstCave);

    if (nodes[0] === 'start') {
      this.start = firstCave;
    } else if (nodes[1] === 'start') {
      this.start = secondCave;
    }

    if (nodes[0] === 'end') {
      this.end = firstCave;
    } else if (nodes[1] === 'end') {
      this.end = secondCave;
    }
  }

  private createCave(value: string): Cave {
    let cave = this.caveMap.get(value);
    if (!cave) {
      cave =
        value === value.toLowerCase()
          ? new SmallCave(value)
          : new BigCave(value);
      this.caveMap.set(value, cave);
    }
    return cave;
  }

  private walk(visited: Set<Cave>, current: Cave): number {
    if (current.value === 'end') {
      return 1;
    }

    if (current.isSmall && visited.has(current)) {
      return 0;
    }

    visited.add(current);

    let sum = 0;
    for (const cave of current.links) {
      sum += this.walk(new Set(visited), cave);
    }

    return sum;
  }

  private walkWithRepeat(
    visited: Set<Cave>,
    current: Cave,
    usedDouble: boolean
  ): number {
    if (current.value === 'end') {
      return 1;
    }

    if (visited.has(current)) {
      if (current.value === 'start' || (current.isSmall && usedDouble)) {
        return 0;
      }
      if (current.isSmall) {
        usedDouble = true;
      }
    }

    visited.add(current);

    let sum = 0;
    for (const cave of current.links) {
      sum += this.walkWithRepeat(new Set(visited), cave, usedDouble);
    }

    return sum;
  }
}
