import { day } from '../../helpers/day';
import { bfs } from '../../helpers/graphSearch';

interface ParsedMaze {
  tunnels: Set<string>;
  start: string;
  end: string;
  innerPortalPartner: Map<string, string>;
  outerPortalPartner: Map<string, string>;
}

export class year2019day20 extends day {
  private grid: string[] = [];
  private width = 0;
  private height = 0;

  override preChallenge(): void {
    this.grid = [...this.input];
    this.width = Math.max(...this.grid.map(row => row.length));
    this.height = this.grid.length;
  }

  override part1(): string {
    const maze = this.parseMaze();
    const neighbors = (pos: string): string[] => {
      const [x, y] = pos.split(',').map(Number);
      const options = [
        `${x},${y - 1}`,
        `${x},${y + 1}`,
        `${x - 1},${y}`,
        `${x + 1},${y}`
      ].filter(next => maze.tunnels.has(next));

      const innerPartner = maze.innerPortalPartner.get(pos);
      if (innerPartner) {
        options.push(innerPartner);
      }
      const outerPartner = maze.outerPortalPartner.get(pos);
      if (outerPartner) {
        options.push(outerPartner);
      }
      return options;
    };

    const distances = bfs(maze.start, p => p, neighbors, pos => pos === maze.end);
    return `${distances.get(maze.end)?.distance}`;
  }

  override part2(): string {
    const maze = this.parseMaze();

    const isValidState = (pos: string, z: number): boolean => {
      if (z < 0 || !maze.tunnels.has(pos)) {
        return false;
      }
      if ((pos === maze.start || pos === maze.end) && z !== 0) {
        return false;
      }
      if (maze.outerPortalPartner.has(pos) && z === 0) {
        return false;
      }
      return true;
    };

    const neighbors = (state: string): string[] => {
      const [x, y, z] = state.split(',').map(Number);
      const pos = `${x},${y}`;

      const candidates: [string, number][] = [
        [`${x},${y - 1}`, z],
        [`${x},${y + 1}`, z],
        [`${x - 1},${y}`, z],
        [`${x + 1},${y}`, z]
      ];

      const innerPartner = maze.innerPortalPartner.get(pos);
      if (innerPartner) {
        candidates.push([innerPartner, z + 1]);
      }
      const outerPartner = maze.outerPortalPartner.get(pos);
      if (outerPartner) {
        candidates.push([outerPartner, z - 1]);
      }

      return candidates.filter(([p, nz]) => isValidState(p, nz)).map(([p, nz]) => `${p},${nz}`);
    };

    const startState = `${maze.start},0`;
    const endState = `${maze.end},0`;
    const distances = bfs(startState, s => s, neighbors, s => s === endState);
    return `${distances.get(endState)?.distance}`;
  }

  private charAt(x: number, y: number): string {
    return this.grid[y]?.[x] ?? ' ';
  }

  private isValidLabel(label: string): boolean {
    return /^[A-Z]{2}$/.test(label);
  }

  private parseMaze(): ParsedMaze {
    const tunnels = new Set<string>();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.charAt(x, y) === '.') {
          tunnels.add(`${x},${y}`);
        }
      }
    }

    const outerLabels = this.getOuterLabels();
    const innerLabels = this.getInnerLabels();

    const start = outerLabels.get('AA')!;
    const end = outerLabels.get('ZZ')!;

    const innerPortalPartner = new Map<string, string>();
    const outerPortalPartner = new Map<string, string>();
    for (const [label, innerPos] of innerLabels) {
      const outerPos = outerLabels.get(label);
      if (outerPos) {
        innerPortalPartner.set(innerPos, outerPos);
        outerPortalPartner.set(outerPos, innerPos);
      }
    }

    return { tunnels, start, end, innerPortalPartner, outerPortalPartner };
  }

  private getOuterLabels(): Map<string, string> {
    const labels = new Map<string, string>();

    for (let x = 0; x < this.width; x++) {
      const label = this.charAt(x, 0) + this.charAt(x, 1);
      if (this.isValidLabel(label)) {
        labels.set(label, `${x},2`);
      }
      const bottomLabel = this.charAt(x, this.height - 2) + this.charAt(x, this.height - 1);
      if (this.isValidLabel(bottomLabel)) {
        labels.set(bottomLabel, `${x},${this.height - 3}`);
      }
    }

    for (let y = 0; y < this.height; y++) {
      const label = this.charAt(0, y) + this.charAt(1, y);
      if (this.isValidLabel(label)) {
        labels.set(label, `2,${y}`);
      }
      const rightLabel = this.charAt(this.width - 2, y) + this.charAt(this.width - 1, y);
      if (this.isValidLabel(rightLabel)) {
        labels.set(rightLabel, `${this.width - 3},${y}`);
      }
    }

    return labels;
  }

  private getInnerLabels(): Map<string, string> {
    const labels = new Map<string, string>();
    const midX = Math.floor(this.width / 2);
    const midY = Math.floor(this.height / 2);

    const isBoundary = (char: string): boolean => char === '#' || char === '.';

    let top = midY;
    while (!isBoundary(this.charAt(midX, top))) {
      top--;
    }
    let bottom = midY;
    while (!isBoundary(this.charAt(midX, bottom))) {
      bottom++;
    }
    let left = midX;
    while (!isBoundary(this.charAt(left, midY))) {
      left--;
    }
    let right = midX;
    while (!isBoundary(this.charAt(right, midY))) {
      right++;
    }

    for (let x = left + 1; x < right; x++) {
      const label = this.charAt(x, top + 1) + this.charAt(x, top + 2);
      if (this.isValidLabel(label)) {
        labels.set(label, `${x},${top}`);
      }
      const bottomLabel = this.charAt(x, bottom - 2) + this.charAt(x, bottom - 1);
      if (this.isValidLabel(bottomLabel)) {
        labels.set(bottomLabel, `${x},${bottom}`);
      }
    }

    for (let y = top + 1; y < bottom; y++) {
      const label = this.charAt(left + 1, y) + this.charAt(left + 2, y);
      if (this.isValidLabel(label)) {
        labels.set(label, `${left},${y}`);
      }
      const rightLabel = this.charAt(right - 2, y) + this.charAt(right - 1, y);
      if (this.isValidLabel(rightLabel)) {
        labels.set(rightLabel, `${right},${y}`);
      }
    }

    return labels;
  }
}
