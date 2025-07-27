import { day } from "../../helpers/day";
import { Line } from "../../helpers/line";
import { Point } from "../../models/point";

export class year2021day5 extends day {
    private grid: number[][] = [];
    private lines: Line[] = [];
    private maxX = 0;
    private maxY = 0;

    override preChallenge(): void {
        this.parseInput();
        this.initializeGrid();
    }

    override part1(): string {
        const nonDiagonalPoints = this.lines
            .map(line => line.getNonDiagonalPoints())
            .filter(points => points.length > 0);
        
        const overlap = this.countOverlaps(nonDiagonalPoints);
        return `overlap points: ${overlap}`;
    }

    override part2(): string {
        const allPoints = this.lines.map(line => line.getAllPoints());
        const overlap = this.countOverlaps(allPoints);
        return `overlap points: ${overlap}`;
    }

    private parseInput(): void {
        for (const line of this.input) {
            const coords = line.split(' -> ');
            const lineObj = new Line(coords);
            this.lines.push(lineObj);
            
            const maxPoint = lineObj.getMaxCoords();
            this.maxX = Math.max(maxPoint.x, this.maxX);
            this.maxY = Math.max(maxPoint.y, this.maxY);
        }
    }

    private initializeGrid(): void {
        this.grid = Array.from({ length: this.maxY + 1 }, 
            () => new Array(this.maxX + 1).fill(0)
        );
    }

    private resetGrid(): void {
        for (const row of this.grid) {
            row.fill(0);
        }
    }

    private countOverlaps(points: Point[][]): number {
        this.resetGrid();
        let overlap = 0;
        
        for (const linePoints of points) {
            for (const point of linePoints) {
                if (++this.grid[point.y][point.x] === 2) {
                    overlap++;
                }
            }
        }
        
        return overlap;
    }
}