import { day } from '../../helpers/day';

type KeypadType = 'numeric' | 'directional';

const NUMERIC_KEYPAD: Record<string, [number, number]> = {
  '7': [0, 0], '8': [0, 1], '9': [0, 2],
  '4': [1, 0], '5': [1, 1], '6': [1, 2],
  '1': [2, 0], '2': [2, 1], '3': [2, 2],
  '0': [3, 1], A: [3, 2],
};
const NUMERIC_GAP: [number, number] = [3, 0];

const DIRECTIONAL_KEYPAD: Record<string, [number, number]> = {
  '^': [0, 1], A: [0, 2],
  '<': [1, 0], v: [1, 1], '>': [1, 2],
};
const DIRECTIONAL_GAP: [number, number] = [0, 0];

function keypadFor(type: KeypadType): Record<string, [number, number]> {
  return type === 'numeric' ? NUMERIC_KEYPAD : DIRECTIONAL_KEYPAD;
}

function gapFor(type: KeypadType): [number, number] {
  return type === 'numeric' ? NUMERIC_GAP : DIRECTIONAL_GAP;
}

export class year2024day21 extends day {
  codes: string[] = [];
  memo = new Map<string, number>();

  override preChallenge(): void {
    this.codes = this.input.filter((line) => line.trim() !== '');
    this.memo = new Map();
  }

  override part1(): string {
    const totalComplexity = this.codes.reduce(
      (sum, code) => sum + this.complexity(code, 2),
      0
    );

    return `Sum of code complexities: ${totalComplexity}`;
  }

  override part2(): string {
    const totalComplexity = this.codes.reduce(
      (sum, code) => sum + this.complexity(code, 25),
      0
    );

    return `Sum of code complexities with 25 robots: ${totalComplexity}`;
  }

  complexity(code: string, robotCount: number): number {
    const numericPart = Number(code.match(/\d+/)?.[0] ?? 0);
    return this.sequenceCost('numeric', code, robotCount) * numericPart;
  }

  shortestPaths(type: KeypadType, from: string, to: string): string[] {
    const keypad = keypadFor(type);
    const gap = gapFor(type);
    const [fromRow, fromCol] = keypad[from];
    const [toRow, toCol] = keypad[to];
    const rowDelta = toRow - fromRow;
    const colDelta = toCol - fromCol;

    const vertical = rowDelta < 0 ? '^'.repeat(-rowDelta) : 'v'.repeat(rowDelta);
    const horizontal = colDelta < 0 ? '<'.repeat(-colDelta) : '>'.repeat(colDelta);

    const candidates: string[] = [];
    if (!(gap[0] === fromRow && gap[1] === toCol)) {
      candidates.push(horizontal + vertical + 'A');
    }
    if (!(gap[0] === toRow && gap[1] === fromCol)) {
      candidates.push(vertical + horizontal + 'A');
    }

    return [...new Set(candidates)];
  }

  sequenceCost(type: KeypadType, sequence: string, depth: number): number {
    let total = 0;
    let from = 'A';

    for (const to of sequence) {
      total += this.moveCost(type, from, to, depth);
      from = to;
    }

    return total;
  }

  moveCost(type: KeypadType, from: string, to: string, depth: number): number {
    const cacheKey = `${type}|${from}|${to}|${depth}`;
    const cached = this.memo.get(cacheKey);
    if (cached !== undefined) return cached;

    const candidates = this.shortestPaths(type, from, to);
    let result: number;

    if (depth === 0) {
      result = Math.min(...candidates.map((candidate) => candidate.length));
    } else {
      result = Math.min(
        ...candidates.map((candidate) => this.sequenceCost('directional', candidate, depth - 1))
      );
    }

    this.memo.set(cacheKey, result);
    return result;
  }
}
