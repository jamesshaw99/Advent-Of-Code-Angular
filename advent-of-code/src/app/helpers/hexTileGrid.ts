interface HexCoordinate {
  x: number;
  y: number;
}

type Direction = 'ne' | 'nw' | 'se' | 'sw' | 'e' | 'w';

export class HexTileGrid {
  private static readonly DIRECTIONS: Record<Direction, HexCoordinate> = {
    ne: { x: 1, y: 2 },
    nw: { x: -1, y: 2 },
    se: { x: 1, y: -2 },
    sw: { x: -1, y: -2 },
    e: { x: 2, y: 0 },
    w: { x: -2, y: 0 },
  };

  private static readonly DIRECTION_KEYS = Object.keys(
    HexTileGrid.DIRECTIONS
  ) as Direction[];

  private blackTiles = new Set<string>();

  public flipTile(path: string): void {
    const coordinate = this.parsePathToCoordinate(path);
    const key = this.coordinateToKey(coordinate);

    if (this.blackTiles.has(key)) {
      this.blackTiles.delete(key);
    } else {
      this.blackTiles.add(key);
    }
  }

  private parsePathToCoordinate(path: string): HexCoordinate {
    let x = 0;
    let y = 0;
    let i = 0;

    while (i < path.length) {
      const direction = HexTileGrid.DIRECTION_KEYS.find((dir) =>
        path.startsWith(dir, i)
      );

      if (direction) {
        const delta = HexTileGrid.DIRECTIONS[direction];
        x += delta.x;
        y += delta.y;
        i += direction.length;
      } else {
        throw new Error(`Invalid direction at position ${i} in path: ${path}`);
      }
    }

    return { x, y };
  }

  private coordinateToKey(coord: HexCoordinate): string {
    return `${coord.x},${coord.y}`;
  }

  private keyToCoordinate(key: string): HexCoordinate {
    const [x, y] = key.split(',').map(Number);
    return { x, y };
  }

  public getBlackTileCount(): number {
    return this.blackTiles.size;
  }

  public simulateDay(): void {
    const tilesToFlip = new Set<string>();
    const whiteTileNeighborCounts = new Map<string, number>();

    for (const blackTileKey of this.blackTiles) {
      const coord = this.keyToCoordinate(blackTileKey);
      let blackNeighborCount = 0;

      for (const direction of HexTileGrid.DIRECTION_KEYS) {
        const delta = HexTileGrid.DIRECTIONS[direction];
        const neighborCoord: HexCoordinate = {
          x: coord.x + delta.x,
          y: coord.y + delta.y,
        };
        const neighborKey = this.coordinateToKey(neighborCoord);

        if (this.blackTiles.has(neighborKey)) {
          blackNeighborCount++;
        } else {
          whiteTileNeighborCounts.set(
            neighborKey,
            (whiteTileNeighborCounts.get(neighborKey) || 0) + 1
          );
        }
      }

      if (blackNeighborCount === 0 || blackNeighborCount > 2) {
        tilesToFlip.add(blackTileKey);
      }
    }

    for (const [whiteTileKey, blackNeighborCount] of whiteTileNeighborCounts) {
      if (blackNeighborCount === 2) {
        tilesToFlip.add(whiteTileKey);
      }
    }

    for (const tileKey of tilesToFlip) {
      if (this.blackTiles.has(tileKey)) {
        this.blackTiles.delete(tileKey);
      } else {
        this.blackTiles.add(tileKey);
      }
    }
  }

  public runSimulation(days: number): void {
    for (let day = 0; day < days; day++) {
      this.simulateDay();
    }
  }
}
