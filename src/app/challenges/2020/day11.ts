import { day } from "../../helpers/day";
import { Point } from "../../models/point";

export class year2020day11 extends day {
    private grid:string[][] = [];
  private readonly DIRECTIONS:Point[] = [
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: -1},
    {x: 0, y: 1},
    {x: 1, y: -1},
    {x: 1, y: 0},
    {x: 1, y: 1}
  ];

  override preChallenge(): void {
    this.grid = this.input.map(line => line.split(''));
  }

  override part1(): string {
    let currentGrid = this.deepCopyGrid(this.grid);
    
    while (true) {
      const nextGrid = this.simulateRound(currentGrid, this.checkAdjacentSeats.bind(this), 4);
      
      if (this.gridsEqual(currentGrid, nextGrid)) {
        break;
      }
      
      currentGrid = nextGrid;
    }
    
    return `Number of occupied seats: ${this.countOccupiedSeats(currentGrid)}`;
  }

  override part2(): string {
    let currentGrid = this.deepCopyGrid(this.grid);
    
    while (true) {
      const nextGrid = this.simulateRound(currentGrid, this.checkVisibleSeats.bind(this), 5);
      
      if (this.gridsEqual(currentGrid, nextGrid)) {
        break;
      }
      
      currentGrid = nextGrid;
    }
    
    return `Number of occupied seats: ${this.countOccupiedSeats(currentGrid)}`;
  }

  private simulateRound(
    grid:string[][], 
    checkFunction: (grid:string[][], row: number, col: number) => number,
    tolerance: number
  ):string[][] {
    const nextGrid = this.deepCopyGrid(grid);
    
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = grid[row][col];
        
        if (cell === '.') continue;
        
        const occupiedCount = checkFunction(grid, row, col);
        
        if (cell === 'L' && occupiedCount === 0) {
          nextGrid[row][col] = '#';
        } else if (cell === '#' && occupiedCount >= tolerance) {
          nextGrid[row][col] = 'L';
        }
      }
    }
    
    return nextGrid;
  }

  private checkAdjacentSeats(grid:string[][], row: number, col: number): number {
    let count = 0;
    
    for (const dir of this.DIRECTIONS) {
      const newRow = row + dir.x;
      const newCol = col + dir.y;
      
      if (this.isValidPosition(grid, newRow, newCol) && grid[newRow][newCol] === '#') {
        count++;
      }
    }
    
    return count;
  }

  private checkVisibleSeats(grid:string[][], row: number, col: number): number {
    let count = 0;
    
    for (const dir of this.DIRECTIONS) {
      let currentRow = row + dir.x;
      let currentCol = col + dir.y;
      
      while (this.isValidPosition(grid, currentRow, currentCol)) {
        const cell = grid[currentRow][currentCol];
        
        if (cell === '#') {
          count++;
          break;
        } else if (cell === 'L') {
          break;
        }
        
        currentRow += dir.x;
        currentCol += dir.y;
      }
    }
    
    return count;
  }

  private isValidPosition(grid:string[][], row: number, col: number): boolean {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
  }

  private deepCopyGrid(grid:string[][]):string[][] {
    return grid.map(row => [...row]);
  }

  private gridsEqual(grid1:string[][], grid2:string[][]): boolean {
    for (let row = 0; row < grid1.length; row++) {
      for (let col = 0; col < grid1[row].length; col++) {
        if (grid1[row][col] !== grid2[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  private countOccupiedSeats(grid:string[][]): number {
    let count = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (cell === '#') {
          count++;
        }
      }
    }
    return count;
  }
}