import { day } from "../../helpers/day";

export class year2022day6 extends day {
    buffer = '';

    override preChallenge(): void {
        this.buffer = this.input[0];
    }

    override part1(): string {
        return `Complete after ${this.process(4)} characters`;
    }

    override part2(): string {
        return `complete after ${this.process(14)} characters`;
    }

    process(markerSize: number): number {
    let received = markerSize;
    
    while (true) {
        const set = new Set<string>();
        const marker = this.buffer.substring(received - markerSize, received);
        
        let hasUnique = true;
        for (const c of marker) {
            if (set.has(c)) {
                hasUnique = false;
                break;
            }
            set.add(c);
        }
        
        if (hasUnique) {
            break;
        }
        
        received++;
    }
    
    return received;
}
}