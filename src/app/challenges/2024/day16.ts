import { day } from '../../helpers/day';
import { inBounds, ORTHOGONAL_DIRECTIONS, parseCharGrid } from '../../helpers/grid';
import { dijkstra, dijkstraAll, WeightedEdge } from '../../helpers/graphSearch';

interface ReindeerState {
  row: number;
  col: number;
  dir: number;
}

const EAST = 1;

export class year2024day16 extends day {
  grid: string[][] = [];
  startRow = 0;
  startCol = 0;
  endRow = 0;
  endCol = 0;

  override preChallenge(): void {
    this.grid = parseCharGrid(this.input);

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === 'S') {
          this.startRow = row;
          this.startCol = col;
        } else if (this.grid[row][col] === 'E') {
          this.endRow = row;
          this.endCol = col;
        }
      }
    }
  }

  override part1(): string {
    const lowestScore = this.findLowestScore();
    return `Lowest possible score: ${lowestScore}`;
  }

  findLowestScore(): number {
    const start: ReindeerState = { row: this.startRow, col: this.startCol, dir: EAST };

    return dijkstra<ReindeerState>(
      start,
      (state) => `${state.row},${state.col},${state.dir}`,
      (state) => this.neighbors(state),
      (state) => state.row === this.endRow && state.col === this.endCol
    );
  }

  neighbors(state: ReindeerState): WeightedEdge<ReindeerState>[] {
    const edges: WeightedEdge<ReindeerState>[] = [];
    const [dRow, dCol] = ORTHOGONAL_DIRECTIONS[state.dir];
    const nextRow = state.row + dRow;
    const nextCol = state.col + dCol;

    if (this.grid[nextRow][nextCol] !== '#') {
      edges.push({ node: { row: nextRow, col: nextCol, dir: state.dir }, cost: 1 });
    }

    edges.push({ node: { row: state.row, col: state.col, dir: (state.dir + 1) % 4 }, cost: 1000 });
    edges.push({ node: { row: state.row, col: state.col, dir: (state.dir + 3) % 4 }, cost: 1000 });

    return edges;
  }

  reverseNeighbors(state: ReindeerState): WeightedEdge<ReindeerState>[] {
    const edges: WeightedEdge<ReindeerState>[] = [];
    const [dRow, dCol] = ORTHOGONAL_DIRECTIONS[state.dir];
    const prevRow = state.row - dRow;
    const prevCol = state.col - dCol;

    if (
      inBounds(prevRow, prevCol, this.grid.length, this.grid[0].length) &&
      this.grid[prevRow][prevCol] !== '#'
    ) {
      edges.push({ node: { row: prevRow, col: prevCol, dir: state.dir }, cost: 1 });
    }

    edges.push({ node: { row: state.row, col: state.col, dir: (state.dir + 1) % 4 }, cost: 1000 });
    edges.push({ node: { row: state.row, col: state.col, dir: (state.dir + 3) % 4 }, cost: 1000 });

    return edges;
  }

  override part2(): string {
    const tileCount = this.countBestPathTiles();
    return `Tiles on at least one best path: ${tileCount}`;
  }

  countBestPathTiles(): number {
    const key = (state: ReindeerState): string => `${state.row},${state.col},${state.dir}`;
    const start: ReindeerState = { row: this.startRow, col: this.startCol, dir: EAST };

    const forwardDist = dijkstraAll<ReindeerState>([{ node: start, cost: 0 }], key, (state) =>
      this.neighbors(state)
    );

    const endSeeds = [0, 1, 2, 3].map((dir) => ({
      node: { row: this.endRow, col: this.endCol, dir },
      cost: 0,
    }));
    const backwardDist = dijkstraAll<ReindeerState>(endSeeds, key, (state) =>
      this.reverseNeighbors(state)
    );

    const bestScore = Math.min(
      ...[0, 1, 2, 3].map((dir) => forwardDist.get(`${this.endRow},${this.endCol},${dir}`) ?? Infinity)
    );

    const tiles = new Set<string>();
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (this.grid[row][col] === '#') continue;

        for (let dir = 0; dir < 4; dir++) {
          const stateKey = `${row},${col},${dir}`;
          const forward = forwardDist.get(stateKey) ?? Infinity;
          const backward = backwardDist.get(stateKey) ?? Infinity;

          if (forward + backward === bestScore) {
            tiles.add(`${row},${col}`);
            break;
          }
        }
      }
    }

    return tiles.size;
  }
}
