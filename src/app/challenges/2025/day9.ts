import { day } from '../../helpers/day';
import { Point } from '../../models/point';

export class year2025day9 extends day {
  redTiles: Point[] = [];
  redTilesSet!: Set<string>;
  edgeTiles!: Set<string>;
  polygonCache = new Map<number, boolean>();

  override preChallenge(): void {
    for (const line of this.input) {
      const [x, y] = line.split(',').map(Number);
      this.redTiles.push({ x, y });
    }

    this.redTilesSet = new Set(this.redTiles.map((p) => `${p.x},${p.y}`));
    this.edgeTiles = this.getEdgeTiles();
  }

  override part1(): string {
    let largestArea = 0;

    for (let i = 0; i < this.redTiles.length; i++) {
      for (let j = i + 1; j < this.redTiles.length; j++) {
        const p1 = this.redTiles[i];
        const p2 = this.redTiles[j];

        const width = Math.abs(p2.x - p1.x) + 1;
        const height = Math.abs(p2.y - p1.y) + 1;
        const area = width * height;

        largestArea = Math.max(largestArea, area);
      }
    }

    return `Largest area: ${largestArea}`;
  }

  override part2(): string {
    let largestArea = 0;

    const pairs: [number, number, number][] = [];
    for (let i = 0; i < this.redTiles.length; i++) {
      for (let j = i + 1; j < this.redTiles.length; j++) {
        const p1 = this.redTiles[i];
        const p2 = this.redTiles[j];
        const width = Math.abs(p2.x - p1.x) + 1;
        const height = Math.abs(p2.y - p1.y) + 1;
        const area = width * height;
        pairs.push([i, j, area]);
      }
    }
    pairs.sort((a, b) => b[2] - a[2]);

    for (const [i, j, area] of pairs) {
      if (area <= largestArea) break;

      const p1 = this.redTiles[i];
      const p2 = this.redTiles[j];

      if (this.isRectangleValid(p1, p2)) {
        largestArea = area;
        break;
      }
    }

    return `Largest area: ${largestArea}`;
  }

  getEdgeTiles(): Set<string> {
    const edgeTiles = new Set<string>();

    for (let i = 0; i < this.redTiles.length; i++) {
      const current = this.redTiles[i];
      const next = this.redTiles[(i + 1) % this.redTiles.length];

      if (current.x === next.x) {
        const minY = Math.min(current.y, next.y);
        const maxY = Math.max(current.y, next.y);
        for (let y = minY; y <= maxY; y++) {
          edgeTiles.add(`${current.x},${y}`);
        }
      } else if (current.y === next.y) {
        const minX = Math.min(current.x, next.x);
        const maxX = Math.max(current.x, next.x);
        for (let x = minX; x <= maxX; x++) {
          edgeTiles.add(`${x},${current.y}`);
        }
      }
    }

    return edgeTiles;
  }

  isPointInPolygon(point: Point): boolean {
    const cacheKey = point.y * 1000000 + point.x;
    
    if (this.polygonCache.has(cacheKey)) {
      return this.polygonCache.get(cacheKey)!;
    }

    let inside = false;

    for (
      let i = 0, j = this.redTiles.length - 1;
      i < this.redTiles.length;
      j = i++
    ) {
      const xi = this.redTiles[i].x,
        yi = this.redTiles[i].y;
      const xj = this.redTiles[j].x,
        yj = this.redTiles[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) inside = !inside;
    }

    this.polygonCache.set(cacheKey, inside);
    return inside;
  }

  isRectangleValid(p1: Point, p2: Point): boolean {
    const minX = Math.min(p1.x, p2.x);
    const maxX = Math.max(p1.x, p2.x);
    const minY = Math.min(p1.y, p2.y);
    const maxY = Math.max(p1.y, p2.y);

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    if (width * height > 10000) {
      const sampled =  this.isRectangleValidSampled(minX, maxX, minY, maxY);
      if(sampled == false){
        return false;
      }
    }

    for (let x = minX; x <= maxX; x++) {
      if (!this.isValidTile(x, minY)) return false;
      if (!this.isValidTile(x, maxY)) return false;
    }

    for (let y = minY + 1; y < maxY; y++) {
      if (!this.isValidTile(minX, y)) return false;
      if (!this.isValidTile(maxX, y)) return false;
    }
    
    return true;
  }

  isRectangleValidSampled(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
  ): boolean {
    if (!this.isValidTile(minX, minY)) return false;
    if (!this.isValidTile(maxX, minY)) return false;
    if (!this.isValidTile(minX, maxY)) return false;
    if (!this.isValidTile(maxX, maxY)) return false;

    const edgeSampleSize = 50;
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    const stepX = Math.max(1, Math.floor(width / edgeSampleSize));
    const stepY = Math.max(1, Math.floor(height / edgeSampleSize));

    for (let x = minX; x <= maxX; x += stepX) {
      if (!this.isValidTile(x, minY)) return false;
      if (!this.isValidTile(x, maxY)) return false;
    }

    for (let y = minY; y <= maxY; y += stepY) {
      if (!this.isValidTile(minX, y)) return false;
      if (!this.isValidTile(maxX, y)) return false;
    }

    const interiorSampleSize = 30;
    const interiorStepX = Math.max(1, Math.floor(width / interiorSampleSize));
    const interiorStepY = Math.max(1, Math.floor(height / interiorSampleSize));

    for (let y = minY + interiorStepY; y < maxY; y += interiorStepY) {
      for (let x = minX + interiorStepX; x < maxX; x += interiorStepX) {
        if (!this.isValidTile(x, y)) return false;
      }
    }

    return true;
  }

  isValidTile(x: number, y: number): boolean {
    const key = `${x},${y}`;
    return this.edgeTiles.has(key) || this.isPointInPolygon({ x, y });
  }
}
