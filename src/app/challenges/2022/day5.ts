import { day } from "../../helpers/day";

export class year2022day5 extends day {
    private stacks: string[][] = [];
    private instructionsList: string[] = [];

    override part1(): string {
        this.reset();
        return this.move(true);
    }

    override part2(): string {
        this.reset();
        return this.move(false);
    }

    private move(moveOne: boolean): string {
        for (const instruction of this.instructionsList) {
            const parts = instruction.split(" ");
            const noBoxes = parseInt(parts[1]);
            const from = parseInt(parts[3]) - 1;
            const to = parseInt(parts[5]) - 1;

            if (moveOne) {
                for (let i = 0; i < noBoxes; i++) {
                    const box = this.stacks[from].pop()!;
                    this.stacks[to].push(box);
                }
            } else {
                const boxes = this.stacks[from].splice(-noBoxes);
                this.stacks[to].push(...boxes);
            }
        }

        const result = this.stacks
            .map(stack => stack[stack.length - 1] || '')
            .join('');
        
        return "Top crates: " + result;
    }

    private reset(): void {
        const emptyLineIndex = this.input.indexOf("");
        const stackNumberLine = this.input[emptyLineIndex - 1];
        const noStacks = stackNumberLine.trim().split(/\s+/).length;

        this.stacks = Array.from({ length: noStacks }, () => []);
        this.instructionsList = [];

        let parsingInstructions = false;

        for (const line of this.input) {
            if (line === "") {
                parsingInstructions = true;
                continue;
            }

            if (parsingInstructions) {
                this.instructionsList.push(line);
            } else if (!this.isNumberLine(line)) {
                for (let i = 1; i < line.length; i += 4) {
                    const crate = line.charAt(i);
                    if (crate !== ' ') {
                        const stackIndex = Math.floor(i / 4);
                        this.stacks[stackIndex].unshift(crate);
                    }
                }
            }
        }
    }

    private isNumberLine(line: string): boolean {
        return /^\s*[\d\s]+\s*$/.test(line);
    }
}