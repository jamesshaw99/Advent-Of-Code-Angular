import { day } from '../../helpers/day';
import { manhattanDistance } from '../../helpers/grid';

const REGION_DISTANCE_THRESHOLD = 10000;

interface Coordinate {
  x: number;
  y: number;
}

export class year2018day6 extends day {
  private coordinates: Coordinate[] = [];

  override preChallenge(): void {
    this.coordinates = this.input.map(line => {
      const [x, y] = line.split(',').map(part => Number(part.trim()));
      return { x, y };
    });
  }

  override part1(): string {
    const minX = Math.min(...this.coordinates.map(c => c.x)) - 1;
    const maxX = Math.max(...this.coordinates.map(c => c.x)) + 1;
    const minY = Math.min(...this.coordinates.map(c => c.y)) - 1;
    const maxY = Math.max(...this.coordinates.map(c => c.y)) + 1;

    const areas = new Array<number>(this.coordinates.length).fill(0);
    const infinite = new Set<number>();

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const closest = this.closestCoordinateIndex(x, y);
        if (closest === -1) {
          continue;
        }
        areas[closest]++;
        if (x === minX || x === maxX || y === minY || y === maxY) {
          infinite.add(closest);
        }
      }
    }

    const largestFiniteArea = Math.max(...areas.filter((_, index) => !infinite.has(index)));
    return `Largest finite area: ${largestFiniteArea}`;
  }

  override part2(): string {
    return `Region size: ${this.regionSize(REGION_DISTANCE_THRESHOLD)}`;
  }

  private regionSize(threshold: number): number {
    const minX = Math.min(...this.coordinates.map(c => c.x));
    const maxX = Math.max(...this.coordinates.map(c => c.x));
    const minY = Math.min(...this.coordinates.map(c => c.y));
    const maxY = Math.max(...this.coordinates.map(c => c.y));

    let regionSize = 0;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const totalDistance = this.coordinates.reduce(
          (sum, coordinate) => sum + manhattanDistance(x, y, coordinate.x, coordinate.y),
          0
        );
        if (totalDistance < threshold) {
          regionSize++;
        }
      }
    }

    return regionSize;
  }

  private closestCoordinateIndex(x: number, y: number): number {
    let closestIndex = -1;
    let closestDistance = Infinity;
    let tied = false;

    this.coordinates.forEach((coordinate, index) => {
      const distance = manhattanDistance(x, y, coordinate.x, coordinate.y);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
        tied = false;
      } else if (distance === closestDistance) {
        tied = true;
      }
    });

    return tied ? -1 : closestIndex;
  }
}
