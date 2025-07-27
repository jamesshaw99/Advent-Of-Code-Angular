import { day } from "../../helpers/day";

export class year2021day9 extends day {
    heightmap: number[][] = [];
    private readonly directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    override preChallenge(): void {
        this.heightmap = this.input.map(row => [...row].map(char => parseInt(char)));
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
        const neighbors: [number, number][] = [];
        const rows = this.heightmap.length;
        const cols = this.heightmap[0].length;
        
        for (const [dy, dx] of this.directions) {
            const ny = y + dy;
            const nx = x + dx;
            
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
                neighbors.push([ny, nx]);
            }
        }
        
        return neighbors;
    }

    private getBasinSize(startY: number, startX: number): number {
        const visited = new Set<string>();
        const queue: [number, number][] = [[startY, startX]];
        
        while (queue.length > 0) {
            const [y, x] = queue.shift()!;
            const key = `${y},${x}`;
            
            if (visited.has(key) || this.heightmap[y][x] === 9) {
                continue;
            }
            
            visited.add(key);
            
            for (const [ny, nx] of this.getValidNeighbors(y, x)) {
                const neighborKey = `${ny},${nx}`;
                if (!visited.has(neighborKey) && this.heightmap[ny][nx] !== 9) {
                    queue.push([ny, nx]);
                }
            }
        }
        
        return visited.size;
    }
}