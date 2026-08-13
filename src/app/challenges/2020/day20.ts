import { day } from '../../helpers/day';
import { Tile } from '../../helpers/tile';

export class year2020day20 extends day {
  private tiles = new Map<number, Tile>();

  override preChallenge(): void {
    this.parseInput();
    this.findAllNeighbors();
  }

  override part1(): string {
    const result = Array.from(this.tiles.values())
      .filter((tile) => tile.isCorner())
      .reduce((product, tile) => product * tile.id, 1);

    return `Product of the four corner tiles: ${result}`;
  }

  override part2(): string {
    const corners = Array.from(this.tiles.values()).filter((tile) =>
      tile.isCorner()
    );
    const gridSize = Math.sqrt(this.tiles.size);

    const topLeft = this.findAndOrientTopLeftCorner(corners);

    const arrangement = this.arrangeTiles(topLeft, gridSize);

    const finalImage = this.createFinalImage(arrangement);

    const result = this.findMonstersInAllOrientations(finalImage);
    return `${result} '#' tiles are not part of a sea monster`;
  }

  private parseInput(): void {
    let currentId = 0;
    let currentTileContent: string[] = [];

    for (const line of this.input) {
      if (line.startsWith('Tile ')) {
        const idMatch = line.match(/Tile (\d+):/);
        if (idMatch) {
          currentId = parseInt(idMatch[1]);
        }
      } else if (line.trim() === '') {
        if (currentTileContent.length > 0) {
          const tile = new Tile(currentId, currentTileContent);
          this.tiles.set(currentId, tile);
          currentTileContent = [];
        }
      } else if (/^[.#]+$/.test(line)) {
        currentTileContent.push(line);
      }
    }

    if (currentTileContent.length > 0) {
      const tile = new Tile(currentId, currentTileContent);
      this.tiles.set(currentId, tile);
    }
  }

  private findAllNeighbors(): void {
    const tileArray = Array.from(this.tiles.values());
    for (const tile of tileArray) {
      tile.findNeighbors(tileArray);
    }
  }

  private findAndOrientTopLeftCorner(corners: Tile[]): Tile {
    for (const corner of corners) {
      for (let i = 0; i < 4; i++) {
        if (corner.neighbors.top === 0 && corner.neighbors.left === 0) {
          return corner;
        }
        corner.rotate();
      }
    }
    throw new Error('Could not find top-left corner');
  }

  private arrangeTiles(topLeft: Tile, size: number): Tile[][] {
    const arrangement: Tile[][] = Array(size)
      .fill(null)
      .map(() => Array(size));
    const used = new Set<number>();

    arrangement[0][0] = topLeft;
    used.add(topLeft.id);

    for (let col = 1; col < size; col++) {
      const leftTile = arrangement[0][col - 1];
      const rightId = leftTile.neighbors.right;
      const rightTile = this.tiles.get(rightId)!;

      rightTile.orientToFit('right', leftTile.edges.right);
      arrangement[0][col] = rightTile;
      used.add(rightId);
    }

    for (let row = 1; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const topTile = arrangement[row - 1][col];
        const bottomId = topTile.neighbors.bottom;
        const bottomTile = this.tiles.get(bottomId)!;

        bottomTile.orientToFit('bottom', topTile.edges.bottom);
        arrangement[row][col] = bottomTile;
        used.add(bottomId);
      }
    }

    return arrangement;
  }

  private createFinalImage(arrangement: Tile[][]): Tile {
    const tileSize = 8;
    const imageSize = arrangement.length * tileSize;
    const finalGrid: string[][] = Array(imageSize)
      .fill(null)
      .map(() => Array(imageSize));

    for (let row = 0; row < arrangement.length; row++) {
      for (let col = 0; col < arrangement[0].length; col++) {
        const tile = arrangement[row][col];
        const content = tile.removeBorders();

        for (let r = 0; r < tileSize; r++) {
          for (let c = 0; c < tileSize; c++) {
            finalGrid[row * tileSize + r][col * tileSize + c] = content[r][c];
          }
        }
      }
    }

    return new Tile(0, finalGrid);
  }

  private findMonstersInAllOrientations(image: Tile): number {
    for (let i = 0; i < 4; i++) {
      if (image.findSeaMonsters() > 0) {
        return image.countRoughWaters();
      }
      image.rotate();
    }

    image.flip('horizontal');
    for (let i = 0; i < 4; i++) {
      if (image.findSeaMonsters() > 0) {
        return image.countRoughWaters();
      }
      image.rotate();
    }

    return image.countRoughWaters();
  }
}
