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

export const ORTHOGONAL_DIRECTIONS: readonly [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export const DIAGONAL_DIRECTIONS: readonly [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

export function inBounds(row: number, col: number, rows: number, cols: number): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

export function gridNeighbors(
  row: number,
  col: number,
  rows: number,
  cols: number,
  directions: readonly [number, number][] = ORTHOGONAL_DIRECTIONS
): [number, number][] {
  return directions
    .map(([dRow, dCol]): [number, number] => [row + dRow, col + dCol])
    .filter(([r, c]) => inBounds(r, c, rows, cols));
}

export function parseDigitGrid(lines: string[]): number[][] {
  return lines.map((line) => [...line].map(Number));
}

export function parseCharGrid(lines: string[]): string[][] {
  return lines.map((line) => [...line]);
}
