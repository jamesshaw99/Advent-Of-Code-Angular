import { day } from "../../helpers/day";
import { gridNeighbors, parseDigitGrid } from "../../helpers/grid";
import { bfs } from "../../helpers/graphSearch";

export class year2021day9 extends day {
    heightmap: number[][] = [];

    override preChallenge(): void {
        this.heightmap = parseDigitGrid(this.input);
    }

    override part1(): string {
        let riskSum = 0;
        const lowPoints = this.findLowPoints();
        
        for (const [y, x] of lowPoints) {
            riskSum += 1 + this.heightmap[y][x];
        }
        
        return `Total risk: ${riskSum}`;
    }

    override part2(): string {
        const lowPoints = this.findLowPoints();
        const basinSizes = lowPoints.map(([y, x]) => this.getBasinSize(y, x));
        
        basinSizes.sort((a, b) => b - a);
        const product = basinSizes.slice(0, 3).reduce((acc, size) => acc * size, 1);
        
        return `Product of the three largest basins: ${product}`;
    }

    private findLowPoints(): [number, number][] {
        const lowPoints: [number, number][] = [];
        const rows = this.heightmap.length;
        const cols = this.heightmap[0].length;
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (this.isLowPoint(y, x)) {
                    lowPoints.push([y, x]);
                }
            }
        }
        
        return lowPoints;
    }

    private isLowPoint(y: number, x: number): boolean {
        const currentHeight = this.heightmap[y][x];
        
        return this.getValidNeighbors(y, x).every(([ny, nx]) => 
            this.heightmap[ny][nx] > currentHeight
        );
    }

    private getValidNeighbors(y: number, x: number): [number, number][] {
        return gridNeighbors(y, x, this.heightmap.length, this.heightmap[0].length);
    }

    private getBasinSize(startY: number, startX: number): number {
        const visited = bfs<[number, number]>(
            [startY, startX],
            ([y, x]) => `${y},${x}`,
            ([y, x]) => this.getValidNeighbors(y, x).filter(([ny, nx]) => this.heightmap[ny][nx] !== 9)
        );

        return visited.size;
    }
}