import { day } from "../../helpers/day";
import { Point } from "../../models/point";

interface Instruction {
  direction: 'x' | 'y';
  value: number;
}

export class year2021day13 extends day {
    private instructions: Instruction[] = [];
  private points: Point[] = [];

  override preChallenge(): void {
    let isInstructions = false;
    
    for (const line of this.input) {
      if (line.trim() === '') {
        isInstructions = true;
        continue;
      }
      
      if (isInstructions) {
        const match = line.match(/fold along ([xy])=(\d+)/);
        if (match) {
          this.instructions.push({
            direction: match[1] as 'x' | 'y',
            value: parseInt(match[2])
          });
        }
      } else {
        const [x, y] = line.split(',').map(Number);
        this.points.push({ x, y });
      }
    }
  }

  override part1(): string {
    const pointsCopy = this.points.map(p => ({ ...p }));
    this.runInstructions(pointsCopy, 1);
    const visibleDots = this.countVisibleDots(pointsCopy);
    return `Visible dots after one fold: ${visibleDots}`;
  }

  override part2(): string {
    const pointsCopy = this.points.map(p => ({ ...p }));
    this.runInstructions(pointsCopy, this.instructions.length);
    return `Infrared thermal imaging camera system code:<br>${this.printLetters(pointsCopy)}`;
  }

  private printLetters(points: Point[]): string {
    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;
    
    const pointSet = new Set(points.map(p => `${p.x - minX},${p.y - minY}`));
    
    const rows: string[] = [];
    for (let y = 0; y < height; y++) {
      let row = '';
      for (let x = 0; x < width; x++) {
        row += pointSet.has(`${x},${y}`) ? '#' : ' ';
      }
      rows.push(row);
    }
    
    return rows.join('<br>');
  }

  private runInstructions(points: Point[], noFolds: number): void {
    for (let i = 0; i < noFolds; i++) {
      const instruction = this.instructions[i];
      this.fold(points, instruction);
    }
  }

  private fold(points: Point[], instruction: Instruction): void {
    const { direction, value } = instruction;
    
    if (direction === 'y') {
      for (const point of points) {
        if (point.y > value) {
          point.y = 2 * value - point.y;
        }
      }
    } else {
      for (const point of points) {
        if (point.x > value) {
          point.x = 2 * value - point.x;
        }
      }
    }
  }

  private countVisibleDots(points: Point[]): number {
    const uniquePositions = new Set(points.map(p => `${p.x},${p.y}`));
    return uniquePositions.size;
  }
}