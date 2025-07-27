import { day } from "../../helpers/day";

export class year2022day2 extends day {
    override part1(): string {
        const outcomes = new Map<string, number>([
            ["A X", 4],
            ["A Y", 8],
            ["A Z", 3],
            ["B X", 1],
            ["B Y", 5],
            ["B Z", 9],
            ["C X", 7],
            ["C Y", 2],
            ["C Z", 6]
        ]);
        return this.calculateScore(outcomes);
    }

    override part2(): string {
        const outcomes = new Map<string, number>([
            ["A X", 3],
            ["A Y", 4],
            ["A Z", 8],
            ["B X", 1],
            ["B Y", 5],
            ["B Z", 9],
            ["C X", 2],
            ["C Y", 6],
            ["C Z", 7]
        ]);
        return this.calculateScore(outcomes);
    }

    calculateScore(outcomes: Map<string, number>): string {
        let score = 0;
        for(const round of this.input) {
            score += outcomes.get(round) ?? 0;
        }
        return `Total score: ${score}`;
    }
}