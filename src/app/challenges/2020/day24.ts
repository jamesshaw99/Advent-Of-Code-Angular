import { day } from "../../helpers/day";
import { HexTileGrid } from "../../helpers/hexTileGrid";

export class year2020day24 extends day {
  private hexGrid = new HexTileGrid();

  override preChallenge(): void {
    for (const line of this.input) {
      this.hexGrid.flipTile(line.trim());
    }
  }

  override part1(): string {
    return `${this.hexGrid.getBlackTileCount()} tiles are left with the black side up`;
  }

  override part2(): string {
    this.hexGrid.runSimulation(100);
    return `${this.hexGrid.getBlackTileCount()} tiles are black after 100 days`;
  }
}