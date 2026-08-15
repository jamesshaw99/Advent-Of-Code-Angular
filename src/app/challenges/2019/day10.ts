import { day } from '../../helpers/day';

interface Point {
  x: number;
  y: number;
}

export class year2019day10 extends day {
  private asteroids: Point[] = [];

  override preChallenge(): void {
    this.asteroids = [];

    this.input.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '#') {
          this.asteroids.push({ x, y });
        }
      }
    });
  }

  override part1(): string {
    const { visible } = this.findBestStation();
    return `Asteroids visible from best station: ${visible}`;
  }

  override part2(): string {
    const { station } = this.findBestStation();
    const groups = this.groupByAngle(station);
    const angles = [...groups.keys()].sort((a, b) => a - b);

    if (angles.length === 0) {
      return 'Fewer than 200 asteroids to vaporize';
    }

    let vaporizedCount = 0;
    let lastVaporized: Point | null = null;
    let angleIndex = 0;

    while (vaporizedCount < 200) {
      const angle = angles[angleIndex % angles.length];
      const queue = groups.get(angle)!;
      const next = queue.shift();

      if (next) {
        vaporizedCount++;
        lastVaporized = next;
      }

      angleIndex++;

      const allEmpty = angleIndex % angles.length === 0 && [...groups.values()].every((q) => q.length === 0);
      if (allEmpty) {
        break;
      }
    }

    return lastVaporized
      ? `200th asteroid vaporized: ${lastVaporized.x * 100 + lastVaporized.y}`
      : 'Fewer than 200 asteroids to vaporize';
  }

  private findBestStation(): { station: Point; visible: number } {
    let bestStation = this.asteroids[0];
    let bestVisible = -1;

    for (const candidate of this.asteroids) {
      const angles = new Set<number>();

      for (const other of this.asteroids) {
        if (other === candidate) {
          continue;
        }
        angles.add(this.angleBetween(candidate, other));
      }

      if (angles.size > bestVisible) {
        bestVisible = angles.size;
        bestStation = candidate;
      }
    }

    return { station: bestStation, visible: bestVisible };
  }

  private groupByAngle(station: Point): Map<number, Point[]> {
    const groups = new Map<number, Point[]>();

    for (const point of this.asteroids) {
      if (point === station) {
        continue;
      }

      const angle = this.angleBetween(station, point);
      if (!groups.has(angle)) {
        groups.set(angle, []);
      }
      groups.get(angle)!.push(point);
    }

    for (const points of groups.values()) {
      points.sort((a, b) => this.manhattanDistance(station, a) - this.manhattanDistance(station, b));
    }

    return groups;
  }

  private angleBetween(from: Point, to: Point): number {
    const dy = from.y - to.y;
    const dx = to.x - from.x;
    let angle = 90 - (Math.atan2(dy, dx) * 180) / Math.PI;

    if (angle < 0) {
      angle += 360;
    }

    return angle;
  }

  private manhattanDistance(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}
