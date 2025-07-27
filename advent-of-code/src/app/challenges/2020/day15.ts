import { day } from "../../helpers/day";

export class year2020day15 extends day {
    private lastNumber = 0;
    private turnNumber = 0;
    private occurrences = new Map<number, [number | undefined, number]>();

    override preChallenge(): void {
        this.lastNumber = 0;
        this.turnNumber = 0;
        this.occurrences.clear();

        const numbers = this.input[0].split(',').map(Number);
        numbers.forEach((num, i) => {
            this.occurrences.set(num, [undefined, i + 1]);
            this.lastNumber = num;
            this.turnNumber = i + 1;
        });
    }

    override part1(): string {
        return `The 2020th number spoken is: ${this.solve(2020)}`;
    }

    override part2(): string {
        return `The 30000000th number spoken is: ${this.solve(30000000)}`;
    }

    private solve(limit: number): number {
        while (this.turnNumber < limit) {
            this.turnNumber++;

            const prevTurns = this.occurrences.get(this.lastNumber)!;
            const isFirstTime = prevTurns[0] === undefined;

            const nextNumber = isFirstTime ? 0 : prevTurns[1]! - prevTurns[0]!;

            const nextTurns = this.occurrences.get(nextNumber);
            if (nextTurns) {
                this.occurrences.set(nextNumber, [nextTurns[1], this.turnNumber]);
            } else {
                this.occurrences.set(nextNumber, [undefined, this.turnNumber]);
            }

            this.lastNumber = nextNumber;
        }

        return this.lastNumber;
    }
}