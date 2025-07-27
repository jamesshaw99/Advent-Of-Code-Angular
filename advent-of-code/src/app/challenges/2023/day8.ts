import { day } from "../../helpers/day";

export class year2023day8 extends day {
    instructions = '';
    nodes: Map<string, string[]> = new Map<string, string[]>();

    override preChallenge(): void {
        this.instructions = this.input[0];
        for(let i = 2; i < this.input.length; i++) {
            const line = this.input[i];
            const parts = line.split(' = ');
            this.nodes.set(parts[0], parts[1].replace('(', '').replace(')', '').split(', '));
        }
    }

    override part1(): string {
        const steps = this.navigateUntilZ('AAA');
        return `Number of steps: ${steps}`;
    }

    override part2(): string {
        const allSteps = [];
        for(const current of this.nodes.keys()){
            if(current.endsWith('A')){
                const steps = this.navigateUntilZ(current);
                allSteps.push(steps);
            }
        }
        return `number of steps: ${this.findLCMArray(allSteps)}`;
    }

    navigateUntilZ(current: string): number {
        let steps = 0;
        while(!current.endsWith('Z')){
            for(const step of this.instructions.split('')){
                const nodeDestinations = this.nodes.get(current);
                if (!nodeDestinations) {
                    throw new Error(`Node ${current} not found`);
                }
                current = nodeDestinations[step === 'L' ? 0 : 1];
                steps++;
            }
        }
        return steps;
    }

    findGCD(a: number, b: number): number {
        while(b !== 0){
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    findLCM(a: number, b: number): number {
        return (a * b)/this.findGCD(a, b);
    }

    findLCMArray(numbers: number[]): number {
        if(numbers.length === 0){
            throw new Error('Array must not be empty');
        }
        let lcm = numbers[0];
        for(let i = 1; i < numbers.length; i++){
            lcm = this.findLCM(lcm, numbers[i]);
        }
        return lcm;
    }
}