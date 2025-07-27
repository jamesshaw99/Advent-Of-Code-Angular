import { Point } from "../models/point";

export class Line {
    private points: Point[] = [];
    private isDiagonal: boolean;
    readonly maxX: number;
    readonly maxY: number;

    constructor(coords: string[]) {
        const [x1, y1] = coords[0].split(',').map(Number);
        const [x2, y2] = coords[1].split(',').map(Number);
        
        this.maxX = Math.max(x1, x2);
        this.maxY = Math.max(y1, y2);
        this.isDiagonal = x1 !== x2 && y1 !== y2;
        
        this.generatePoints(x1, y1, x2, y2);
    }

    private generatePoints(x1: number, y1: number, x2: number, y2: number): void {
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);
        const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
        
        for (let i = 0; i <= steps; i++) {
            this.points.push({
                x: x1 + i * dx,
                y: y1 + i * dy
            });
        }
    }

    getMaxCoords(): Point {
        return { x: this.maxX, y: this.maxY };
    }

    getNonDiagonalPoints(): Point[] {
        return this.isDiagonal ? [] : this.points;
    }

    getAllPoints(): Point[] {
        return this.points;
    }
}