import { ConwayCubes } from '../../helpers/conwayCubes';
import { day } from '../../helpers/day';

export class year2020day17 extends day {
  private lines: string[] = [];

  override preChallenge(): void {
    this.lines = this.input.slice();
  }

  override part1(): string {
    const conway = ConwayCubes.from(this.lines, 3);
    conway.transitionToNextState(6);
    return `Remaining active cubes after 6th cycle: ${conway.activeCubesCount()}`;
  }

  override part2(): string {
    const conway = ConwayCubes.from(this.lines, 4);
    conway.transitionToNextState(6);
    return `Remaining active cubes after 6th cycle: ${conway.activeCubesCount()}`;
  }
}
