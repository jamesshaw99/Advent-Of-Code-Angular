import { day } from "../../helpers/day";

export class year2021day7 extends day {
    crabSubmarines: number[] = [];

    override preChallenge(): void {
        this.crabSubmarines = this.input[0].trim().split(',').map(Number);
    }

    override part1(): string {
        const sortedCrabs = [...this.crabSubmarines].sort((a, b) => a - b);
        const median = sortedCrabs[Math.floor(sortedCrabs.length / 2)];
        
        const fuel = this.crabSubmarines.reduce((sum, crab) => 
            sum + Math.abs(crab - median), 0
        );
        
        return `Fuel: ${fuel}`;
    }

    override part2(): string {
        const mean = this.crabSubmarines.reduce((sum, pos) => sum + pos, 0) / this.crabSubmarines.length;
        
        const position1 = Math.floor(mean);
        const position2 = Math.ceil(mean);
        
        const fuel1 = this.calculateTriangularFuel(position1);
        const fuel2 = this.calculateTriangularFuel(position2);
        
        const fuel = Math.min(fuel1, fuel2);
        return `Fuel: ${fuel}`;
    }

    private calculateTriangularFuel(targetPosition: number): number {
        return this.crabSubmarines.reduce((totalFuel, crabPosition) => {
            const distance = Math.abs(crabPosition - targetPosition);
            return totalFuel + (distance * (distance + 1)) / 2;
        }, 0);
    }
}