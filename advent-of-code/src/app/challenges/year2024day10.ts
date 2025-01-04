import { day } from '../helpers/day';
import { Point } from '../models/point';

export class year2024day10 extends day {
  map: number[][] = [];

  override preChallenge(): void {
    this.map = this.input.map((line) => line.split('').map(Number));
  }

  override part1(): string {
    const trailheads = this.findTrailheads();
    const result = trailheads.reduce(
      (sum, trailhead) => sum + this.calculateScore(trailhead),
      0
    );

    return `Sum of the scores of all trailheads ${result}`;
  }

  override part2(): string {
    const trailheads = this.findTrailheads();
    const result = trailheads.reduce(
      (sum, trailhead) => sum + this.findDistinctTrails(trailhead),
      0
    );

    return `Sum of the ratings of all trailheads ${result}`;
  }

  isInBounds(point: Point): boolean {
    return (
      point.x >= 0 &&
      point.x < this.map.length &&
      point.y >= 0 &&
      point.y < this.map[0].length
    );
  }

  getNeighbors(point: Point): Point[] {
    const directions: Point[] = [
      { x: -1, y: 0 }, // Up
      { x: 1, y: 0 }, // Down
      { x: 0, y: -1 }, // Left
      { x: 0, y: 1 }, // Right
    ];

    return directions
      .map((d) => ({ x: point.x + d.x, y: point.y + d.y }))
      .filter(this.isInBounds.bind(this));
  }

  findTrailsFromTrailhead(start: Point): Point[] {
    const visited = new Set<string>();
    const trailPoints: Point[] = [];

    const dfs = (point: Point, currentHeight: number) => {
      const key = `${point.x},${point.y}`;
      if (visited.has(key)) return;
      visited.add(key);
      trailPoints.push(point);

      for (const neighbor of this.getNeighbors(point)) {
        if (this.map[neighbor.x][neighbor.y] === currentHeight + 1) {
          dfs(neighbor, currentHeight + 1);
        }
      }
    };

    dfs(start, this.map[start.x][start.y]);
    return trailPoints;
  }

  calculateScore(trailhead: Point): number {
    const reachable = this.findTrailsFromTrailhead(trailhead);
    const uniqueNines = new Set<string>(
      reachable
        .filter((p) => this.map[p.x][p.y] === 9)
        .map((p) => `${p.x},${p.y}`)
    );
    return uniqueNines.size;
  }

  findDistinctTrails(start: Point): number {
    let trailCount = 0;
  
    const dfs = (point: Point, currentHeight: number) => {
      if (this.map[point.x][point.y] === 9) {
        trailCount++;
        return;
      }
  
      for (const neighbor of this.getNeighbors(point)) {
        if (this.map[neighbor.x][neighbor.y] === currentHeight + 1) {
          dfs(neighbor, currentHeight + 1);
        }
      }
    };
  
    dfs(start, this.map[start.x][start.y]);
    return trailCount;
  }

  findTrailheads(): Point[] {
    const trailheads: Point[] = [];
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y] === 0) {
          trailheads.push({ x, y });
        }
      }
    }
    return trailheads;
  }
}
