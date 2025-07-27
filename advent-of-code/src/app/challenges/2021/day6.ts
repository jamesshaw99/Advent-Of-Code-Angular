import { day } from "../../helpers/day";

export class year2021day6 extends day {
    LanternFish: number[] = [];

    override preChallenge(): void {
        this.LanternFish = this.input[0].split(',').map(Number);
    }

    override part1(): string {
        const numDays = 80;
        const count = this.countLanternFish(numDays);
        return `After ${numDays}, there are a total of ${count} fish`;
    }

    override part2(): string {
        const numDays = 256;
        const count = this.countLanternFish(numDays);
        return `After ${numDays}, there are a total of ${count} fish`;
    }

    private countLanternFish(days: number): number {
        const fishCounts = new Array(9).fill(0);
        
        for (const timer of this.LanternFish) {
            fishCounts[timer]++;
        }
        
        for (let day = 0; day < days; day++) {
            const reproducingFish = fishCounts[0];
            
            for (let i = 0; i < 8; i++) {
                fishCounts[i] = fishCounts[i + 1];
            }
            
            fishCounts[6] += reproducingFish;
            fishCounts[8] = reproducingFish;
        }
        
        return fishCounts.reduce((sum, count) => sum + count, 0);
    }
}