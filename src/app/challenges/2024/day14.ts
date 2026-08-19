import { day } from '../../helpers/day';

interface Robot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export class year2024day14 extends day {
  robots: Robot[] = [];
  width = 101;
  height = 103;

  override preChallenge(): void {
    this.robots = [];

    for (const line of this.input) {
      const match = line.match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/);
      if (!match) continue;

      const [, x, y, vx, vy] = match;
      this.robots.push({ x: Number(x), y: Number(y), vx: Number(vx), vy: Number(vy) });
    }
  }

  override part1(): string {
    const safetyFactor = this.calculateSafetyFactor(100);
    return `Safety factor after 100 seconds: ${safetyFactor}`;
  }

  positionAfter(robot: Robot, seconds: number): { x: number; y: number } {
    const x = (((robot.x + robot.vx * seconds) % this.width) + this.width) % this.width;
    const y = (((robot.y + robot.vy * seconds) % this.height) + this.height) % this.height;
    return { x, y };
  }

  calculateSafetyFactor(seconds: number): number {
    const midX = Math.floor(this.width / 2);
    const midY = Math.floor(this.height / 2);
    const quadrantCounts = [0, 0, 0, 0];

    for (const robot of this.robots) {
      const { x, y } = this.positionAfter(robot, seconds);
      if (x === midX || y === midY) continue;

      const quadrantIndex = (x < midX ? 0 : 1) + (y < midY ? 0 : 2);
      quadrantCounts[quadrantIndex]++;
    }

    return quadrantCounts.reduce((product, count) => product * count, 1);
  }

  override part2(): string {
    const seconds = this.findEasterEggSeconds();
    return `Fewest seconds for the Easter egg picture to appear: ${seconds}`;
  }

  findEasterEggSeconds(): number {
    const maxSeconds = this.width * this.height;

    for (let seconds = 0; seconds < maxSeconds; seconds++) {
      const positions = new Set(
        this.robots.map((robot) => {
          const { x, y } = this.positionAfter(robot, seconds);
          return `${x},${y}`;
        })
      );

      if (positions.size === this.robots.length) {
        return seconds;
      }
    }

    return -1;
  }
}
