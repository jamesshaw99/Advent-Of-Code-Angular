import { day } from "../../helpers/day";

export class year2021day11 extends day {
    private octopuses: number[][] = [];
    private readonly directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    override preChallenge(): void {
        this.octopuses = this.input.map(row => [...row].map(char => parseInt(char)));
    }

    override part1(): string {
        const flashes = this.simulateSteps(100);
        return `Total number of flashes after 100 steps: ${flashes}`;
    }

    override part2(): string {
        this.resetGrid();
        let step = 0;
        
        while (!this.allFlashed()) {
            this.executeStep();
            step++;
        }
        
        return `All flash after ${step} steps`;
    }

    private simulateSteps(steps: number): number {
        let totalFlashes = 0;
        
        for (let i = 0; i < steps; i++) {
            totalFlashes += this.executeStep();
        }
        
        return totalFlashes;
    }

    private executeStep(): number {
        for (const row of this.octopuses) {
            for (let x = 0; x < row.length; x++) {
                row[x]++;
            }
        }

        return this.processFlashes();
    }

    private processFlashes(): number {
        let flashCount = 0;
        const queue: [number, number][] = [];
        const hasFlashed = new Set<string>();

        for (let y = 0; y < this.octopuses.length; y++) {
            for (let x = 0; x < this.octopuses[y].length; x++) {
                if (this.octopuses[y][x] > 9) {
                    queue.push([y, x]);
                }
            }
        }

        while (queue.length > 0) {
            const [y, x] = queue.shift()!;
            const key = `${y},${x}`;

            if (hasFlashed.has(key)) continue;

            if (this.octopuses[y][x] > 9) {
                hasFlashed.add(key);
                this.octopuses[y][x] = 0;
                flashCount++;

                for (const [dy, dx] of this.directions) {
                    const ny = y + dy;
                    const nx = x + dx;
                    const neighborKey = `${ny},${nx}`;

                    if (this.isValidPosition(ny, nx) && !hasFlashed.has(neighborKey)) {
                        this.octopuses[ny][nx]++;
                        if (this.octopuses[ny][nx] > 9) {
                            queue.push([ny, nx]);
                        }
                    }
                }
            }
        }

        return flashCount;
    }

    private isValidPosition(y: number, x: number): boolean {
        return y >= 0 && y < this.octopuses.length && 
               x >= 0 && x < this.octopuses[0].length;
    }

    private allFlashed(): boolean {
        return this.octopuses.every(row => row.every(octopus => octopus === 0));
    }

    private resetGrid(): void {
        this.octopuses = this.input.map(row => [...row].map(char => parseInt(char)));
    }
}