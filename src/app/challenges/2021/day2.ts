import { day } from "../../helpers/day";

export class year2021day2 extends day {
    override part1(): string {
        let horizontal = 0, depth = 0;
        for(const command of this.input) {
            const commands = command.split(' ');
            const value = +commands[1];
            switch(commands[0]){
                case 'forward':
                    horizontal += value;
                    break;
                case 'down':
                    depth += value;
                    break;
                case 'up':
                    depth -= value;
                    break;
            }
        }
        return `Horizontal: ${horizontal}, depth: ${depth}, total: ${horizontal * depth}`;
    }

    override part2(): string {
        let horizontal = 0, depth = 0, aim = 0;
        for(const command of this.input) {
            const commands = command.split(' ');
            const value = +commands[1];
            switch(commands[0]){
                case 'forward':
                    horizontal += value;
                    depth += value * aim;
                    break;
                case 'down':
                    aim += value;
                    break;
                case 'up':
                    aim -= value;
                    break;
            }
        }
        return `Horizontal: ${horizontal}, depth: ${depth}, total: ${horizontal * depth}`;
    }
}