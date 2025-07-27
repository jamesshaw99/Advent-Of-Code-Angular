import { day } from "../../helpers/day";

export class year2021day10 extends day {
    private readonly syntaxScores = new Map([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137]
    ]);

    private readonly chunkPairs = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>']
    ]);

    private readonly autocompleteScores = new Map([
        [')', 1],
        [']', 2],
        ['}', 3],
        ['>', 4]
    ]);

    private readonly openChars = new Set(['(', '[', '{', '<']);

    override part1(): string {
        const { syntaxScore } = this.parseLines();
        return `Syntax error score: ${syntaxScore}`;
    }

    override part2(): string {
        const { incompleteStacks } = this.parseLines();
        
        const scores = incompleteStacks.map(stack => {
            let score = 0;
            while (stack.length > 0) {
                const openChar = stack.pop()!;
                const closeChar = this.chunkPairs.get(openChar)!;
                score = score * 5 + this.autocompleteScores.get(closeChar)!;
            }
            return score;
        });

        scores.sort((a, b) => a - b);
        const middleScore = scores[Math.floor(scores.length / 2)];
        
        return `Middle score: ${middleScore}`;
    }

    private parseLines(): { syntaxScore: number; incompleteStacks: string[][] } {
        let syntaxScore = 0;
        const incompleteStacks: string[][] = [];

        for (const line of this.input) {
            const stack: string[] = [];
            let isCorrupted = false;

            for (const char of line) {
                if (this.openChars.has(char)) {
                    stack.push(char);
                } else {
                    const lastOpen = stack.pop();
                    if (!lastOpen || this.chunkPairs.get(lastOpen) !== char) {
                        syntaxScore += this.syntaxScores.get(char) || 0;
                        isCorrupted = true;
                        break;
                    }
                }
            }

            if (!isCorrupted && stack.length > 0) {
                incompleteStacks.push([...stack]); // Copy the stack
            }
        }

        return { syntaxScore, incompleteStacks };
    }
}