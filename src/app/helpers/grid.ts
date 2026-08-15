export interface Point {
  x: number;
  y: number;
}

export function readingOrder(a: Point, b: Point): number {
  return a.y - b.y || a.x - b.x;
}

export function manhattanDistance(ax: number, ay: number, bx: number, by: number): number {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}
