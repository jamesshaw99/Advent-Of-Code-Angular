import { day } from '../../helpers/day';

interface Region {
  plantType: string;
  cells: Set<string>;
  area: number;
}

interface RegionMetrics {
  area: number;
  perimeter: number;
  sides: number;
}

export class year2024day12 extends day {
  directions: number[][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  grid: string[][] = [];
  rows = 0;
  cols = 0;
  visited: boolean[][] = [];

  metrics: RegionMetrics[] = [];

  public override preChallenge(): void {
    this.grid = this.input.map((line) => line.split(''));
    this.rows = this.grid.length;
    this.cols = this.grid[0].length;
    this.visited = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(false));

    const regions = this.findAllRegions();
    for (const region of regions) {
      const metrics = this.calculateRegionMetrics(region);
      this.metrics.push(metrics);
    }
  }

  public override part1(): string {
    const totalCost = this.metrics.reduce((sum, region) => {
      return sum + region.area * region.perimeter;
    }, 0);

    return `Total price of fencing for all regions: ${totalCost}`;
  }

  public override part2(): string {
    const totalCost = this.metrics.reduce((sum, region) => {
      return sum + region.area * region.sides;
    }, 0);

    return `Total price of fencing for all regions: ${totalCost}`;
  }

  findAllRegions(): Region[] {
    const visited = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(false));
    const regions: Region[] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (!visited[row][col]) {
          const region = this.floodFillRegion(row, col, visited);
          regions.push(region);
        }
      }
    }

    return regions;
  }

  floodFillRegion(
    startRow: number,
    startCol: number,
    visited: boolean[][]
  ): Region {
    const plantType = this.grid[startRow][startCol];
    const queue: [number, number][] = [[startRow, startCol]];
    const cells = new Set<string>();

    visited[startRow][startCol] = true;
    cells.add(`${startRow},${startCol}`);

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      for (const [dr, dc] of this.directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          this.isValidCell(newRow, newCol) &&
          !visited[newRow][newCol] &&
          this.grid[newRow][newCol] === plantType
        ) {
          visited[newRow][newCol] = true;
          queue.push([newRow, newCol]);
          cells.add(`${newRow},${newCol}`);
        }
      }
    }

    return {
      plantType,
      cells,
      area: cells.size,
    };
  }

  isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  calculatePerimeter(region: Region): number {
    let perimeter = 0;

    for (const cellKey of region.cells) {
      const [row, col] = cellKey.split(',').map(Number);

      // Check each direction for this cell
      for (const [dr, dc] of this.directions) {
        const adjRow = row + dr;
        const adjCol = col + dc;

        // If adjacent cell is outside bounds or different plant type, it contributes to perimeter
        if (
          !this.isValidCell(adjRow, adjCol) ||
          this.grid[adjRow][adjCol] !== region.plantType
        ) {
          perimeter++;
        }
      }
    }

    return perimeter;
  }

  calculateSides(region: Region): number {
    const cornerPoints = new Set<string>();
    let corners = 0;
    
    for (const cellKey of region.cells) {
      const [row, col] = cellKey.split(',').map(Number);
      
      for (let dr = 0; dr <= 1; dr++) {
        for (let dc = 0; dc <= 1; dc++) {
          cornerPoints.add(`${row + dr},${col + dc}`);
        }
      }
    }
    
    for (const cornerKey of cornerPoints) {
      const [cornerRow, cornerCol] = cornerKey.split(',').map(Number);
      corners += this.countCornersAtPoint(region, cornerRow, cornerCol);
    }
    
    return corners;
  }

  countCornersAtPoint(
    region: Region,
    cornerRow: number,
    cornerCol: number
  ): number {
    const cellsAroundCorner = [
      [cornerRow - 1, cornerCol - 1],
      [cornerRow - 1, cornerCol],
      [cornerRow, cornerCol - 1],
      [cornerRow, cornerCol],
    ];

    let regionCellsAtCorner = 0;
    const cellStates = cellsAroundCorner.map(([r, c]) => {
      const inRegion = region.cells.has(`${r},${c}`);
      if (inRegion) regionCellsAtCorner++;
      return inRegion;
    });

    if (regionCellsAtCorner === 1 || regionCellsAtCorner === 3) {
      return 1;
    } else if (regionCellsAtCorner === 2) {
      const [topLeft, topRight, bottomLeft, bottomRight] = cellStates;
      if ((topLeft && bottomRight) || (topRight && bottomLeft)) {
        return 2;
      }
    }

    return 0;
  }

  calculateRegionMetrics(region: Region): RegionMetrics {
    return {
      area: region.area,
      perimeter: this.calculatePerimeter(region),
      sides: this.calculateSides(region),
    };
  }
}
