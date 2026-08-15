import { day } from '../../helpers/day';

interface LightPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export class year2018day10 extends day {
  private points: LightPoint[] = [];
  private seconds = 0;

  override preChallenge(): void {
    this.points = this.input.map(line => {
      const match = line.match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/);
      if (!match) {
        throw new Error(`Could not parse point: ${line}`);
      }
      const [, x, y, vx, vy] = match.map(Number);
      return { x, y, vx, vy };
    });

    let seconds = 0;
    let previousArea = this.boundingArea(seconds);

    while (true) {
      const nextArea = this.boundingArea(seconds + 1);
      if (nextArea > previousArea) {
        break;
      }
      previousArea = nextArea;
      seconds++;
    }

    this.seconds = seconds;
    this.points = this.points.map(point => ({
      x: point.x + point.vx * seconds,
      y: point.y + point.vy * seconds,
      vx: point.vx,
      vy: point.vy,
    }));
  }

  override part1(): string {
    const minX = Math.min(...this.points.map(p => p.x));
    const maxX = Math.max(...this.points.map(p => p.x));
    const minY = Math.min(...this.points.map(p => p.y));
    const maxY = Math.max(...this.points.map(p => p.y));

    const occupied = new Set(this.points.map(p => `${p.x},${p.y}`));
    const rows: string[] = [];

    for (let y = minY; y <= maxY; y++) {
      let row = '';
      for (let x = minX; x <= maxX; x++) {
        row += occupied.has(`${x},${y}`) ? '#' : '.';
      }
      rows.push(row);
    }

    return rows.join('\n');
  }

  override part2(): string {
    return `Seconds elapsed: ${this.seconds}`;
  }

  private boundingArea(seconds: number): number {
    const xs = this.points.map(p => p.x + p.vx * seconds);
    const ys = this.points.map(p => p.y + p.vy * seconds);
    return (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
  }
}
