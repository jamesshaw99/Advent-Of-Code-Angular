export class Tile {
  public readonly id: number;
  public grid: string[][];
  private _edges?: { top: string; bottom: string; left: string; right: string };
  public neighbors = { top: 0, bottom: 0, left: 0, right: 0 };

  constructor(id: number, content: string[] | string[][]) {
    this.id = id;
    this.grid = Array.isArray(content[0])
      ? (content as string[][])
      : (content as string[]).map((row) => row.split(''));
  }

  public get edges() {
    if (!this._edges) {
      this._edges = {
        top: this.grid[0].join(''),
        bottom: this.grid[this.grid.length - 1].join(''),
        left: this.grid.map((row) => row[0]).join(''),
        right: this.grid.map((row) => row[row.length - 1]).join(''),
      };
    }
    return this._edges;
  }

  private invalidateEdges(): void {
    this._edges = undefined;
  }

  public rotate(): this {
    const size = this.grid.length;
    const rotated = Array(size)
      .fill(null)
      .map(() => Array(size).fill(''));

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        rotated[c][size - 1 - r] = this.grid[r][c];
      }
    }

    this.grid = rotated;
    this.invalidateEdges();

    const { top, left, bottom, right } = this.neighbors;
    this.neighbors = { top: left, right: top, bottom: right, left: bottom };

    return this;
  }

  public flip(axis: 'horizontal' | 'vertical'): this {
    if (axis === 'horizontal') {
      this.grid = this.grid.map((row) => [...row].reverse());
      const { left, right } = this.neighbors;
      this.neighbors.left = right;
      this.neighbors.right = left;
    } else {
      this.grid = [...this.grid].reverse();
      const { top, bottom } = this.neighbors;
      this.neighbors.top = bottom;
      this.neighbors.bottom = top;
    }

    this.invalidateEdges();
    return this;
  }

  public getAllEdgeVariants(): string[] {
    const { top, bottom, left, right } = this.edges;
    return [
      top,
      bottom,
      left,
      right,
      this.reverseString(top),
      this.reverseString(bottom),
      this.reverseString(left),
      this.reverseString(right),
    ];
  }

  public hasMatchingEdge(other: Tile): boolean {
    const myEdges = Object.values(this.edges);
    const otherVariants = other.getAllEdgeVariants();

    return myEdges.some((edge) => otherVariants.includes(edge));
  }

  public findNeighbors(tiles: Tile[]): void {
    for (const other of tiles) {
      if (other.id === this.id || !this.hasMatchingEdge(other)) continue;

      const { top, bottom, left, right } = this.edges;
      const otherVariants = other.getAllEdgeVariants();

      if (otherVariants.includes(top)) this.neighbors.top = other.id;
      else if (otherVariants.includes(bottom)) this.neighbors.bottom = other.id;
      else if (otherVariants.includes(left)) this.neighbors.left = other.id;
      else if (otherVariants.includes(right)) this.neighbors.right = other.id;
    }
  }

  public getNeighborCount(): number {
    return Object.values(this.neighbors).filter((id) => id !== 0).length;
  }

  public isCorner(): boolean {
    return this.getNeighborCount() === 2;
  }

  public orientToFit(
    direction: 'right' | 'bottom',
    targetEdge: string
  ): boolean {
    const getRelevantEdge = () => {
      const edges = this.edges;
      return direction === 'right' ? edges.left : edges.top;
    };

    for (let attempt = 0; attempt < 8; attempt++) {
      if (getRelevantEdge() === targetEdge) return true;

      if (attempt === 3) {
        this.flip('horizontal');
      } else {
        this.rotate();
      }
    }

    return false;
  }

  public removeBorders(): string[][] {
    return this.grid.slice(1, -1).map((row) => row.slice(1, -1));
  }

  public findSeaMonsters(): number {
    const monster = [
      '                  # ',
      '#    ##    ##    ###',
      ' #  #  #  #  #  #   ',
    ];

    let found = 0;

    for (let row = 0; row <= this.grid.length - 3; row++) {
      for (let col = 0; col <= this.grid[0].length - 20; col++) {
        if (this.isMonsterAt(row, col, monster)) {
          this.markMonsterAt(row, col, monster);
          found++;
        }
      }
    }

    return found;
  }

  private isMonsterAt(
    startRow: number,
    startCol: number,
    pattern: string[]
  ): boolean {
    for (let r = 0; r < pattern.length; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (
          pattern[r][c] === '#' &&
          this.grid[startRow + r][startCol + c] !== '#'
        ) {
          return false;
        }
      }
    }
    return true;
  }

  private markMonsterAt(
    startRow: number,
    startCol: number,
    pattern: string[]
  ): void {
    for (let r = 0; r < pattern.length; r++) {
      for (let c = 0; c < pattern[r].length; c++) {
        if (pattern[r][c] === '#') {
          this.grid[startRow + r][startCol + c] = 'O';
        }
      }
    }
  }

  public countRoughWaters(): number {
    return this.grid.flat().filter((cell) => cell === '#').length;
  }

  private reverseString(str: string): string {
    return str.split('').reverse().join('');
  }

  public clone(): Tile {
    const cloned = new Tile(
      this.id,
      this.grid.map((row) => [...row])
    );
    cloned.neighbors = { ...this.neighbors };
    return cloned;
  }
}
