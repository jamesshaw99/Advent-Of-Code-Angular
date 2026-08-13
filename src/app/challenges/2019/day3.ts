import { day } from '../../helpers/day';

export class year2019day3 extends day {
  private lines: string[][] = [];
  private closestDistance = Number.MAX_SAFE_INTEGER;
  private shortestWire = Number.MAX_SAFE_INTEGER;

  override preChallenge(): void {
    this.lines = this.input.map(line => line.split(','));
    this.closestDistance = Number.MAX_SAFE_INTEGER;
    this.shortestWire = Number.MAX_SAFE_INTEGER;
  }

  private static getDir(c: string): [number, number] {
    switch (c) {
      case 'U': return [0, 1];
      case 'D': return [0, -1];
      case 'L': return [-1, 0];
      case 'R': return [1, 0];
      default: throw new Error('Invalid direction');
    }
  }

  override part1(): string {
    const wire = new Map<string, number>();
    let [x, y, d] = [0, 0, 0];
    for (const s of this.lines[0]) {
      const [dx, dy] = year2019day3.getDir(s[0]);
      const len = parseInt(s.slice(1), 10);
      for (let j = 0; j < len; j++) {
        x += dx;
        y += dy;
        wire.set(`${x}_${y}`, ++d);
      }
    }
    [x, y, d] = [0, 0, 0];
    for (const s of this.lines[1]) {
      const [dx, dy] = year2019day3.getDir(s[0]);
      const len = parseInt(s.slice(1), 10);
      for (let j = 0; j < len; j++) {
        x += dx;
        y += dy;
        d++;
        const key = `${x}_${y}`;
        if (wire.has(key)) {
          this.closestDistance = Math.min(this.closestDistance, Math.abs(x) + Math.abs(y));
          this.shortestWire = Math.min(this.shortestWire, (wire.get(key) ?? 0) + d);
        }
      }
    }
    return `Distance from central port to closest intersection: ${this.closestDistance}`;
  }

  override part2(): string {
    return `Fewest combined steps: ${this.shortestWire}`;
  }
}
