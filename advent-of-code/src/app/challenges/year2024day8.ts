import { day } from '../helpers/day';
import { Point } from '../models/point';

export class year2024day8 extends day {
antennas: Record<string, Point[]> = {};

  override preChallenge(): void {
    this.antennas = {};
    const rows = this.input.length;
    const cols = this.input[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const char = this.input[row][col];
        if (char !== '.') {
          if (!this.antennas[char]) {
            this.antennas[char] = [];
          }
          this.antennas[char].push([row, col]);
        }
      }
    }
  }

  override part1(): string {
    const antinodePositions = new Set<string>();

    for (const freq in this.antennas) {
      const points = this.antennas[freq];
      this.processAntennas(points, antinodePositions, false);
    }

    return `Number of unique antinode locations: ${antinodePositions.size}`;
  }

  override part2(): string {
    const antinodePositions = new Set<string>();

    for (const freq in this.antennas) {
      const points = this.antennas[freq];
      this.processAntennas(points, antinodePositions, true);
    }

    return `Number of unique antinodes with resonance: ${antinodePositions.size}`;
  }

  processAntennas(
    points: Point[],
    antinodePositions: Set<string>,
    resonance: boolean
  ): void {
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const rowDiff = points[j][0] - points[i][0];
        const colDiff = points[j][1] - points[i][1];

        let newRow = points[i][0] - rowDiff;
        let newCol = points[i][1] - colDiff;
        while(newRow >= 0 && newRow < this.input.length && newCol >= 0 && newCol < this.input[0].length) {
          antinodePositions.add(`${newRow},${newCol}`);
          if(!resonance){
            break
          }
          newRow -= rowDiff;
          newCol -= colDiff;
        }
        
        newRow = points[j][0] + rowDiff;
        newCol = points[j][1] + colDiff;
        while(newRow >= 0 && newRow < this.input.length && newCol >= 0 && newCol < this.input[0].length) {
          antinodePositions.add(`${newRow},${newCol}`);
          if(!resonance){
            break
          }
          newRow += rowDiff;
          newCol += colDiff;
        }

        if(resonance){
          antinodePositions.add(`${points[i][0]},${points[i][1]}`);
          antinodePositions.add(`${points[j][0]},${points[j][1]}`);
        }
      }
    }
  }
}
