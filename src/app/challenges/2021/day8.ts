/// <reference lib="es2022" />
import { day } from "../../helpers/day";
import { Display } from "../../helpers/display";

export class year2021day8 extends day {
    override part1(): string {
        const count = this.input
            .flatMap(line => line.substring(line.lastIndexOf('|') + 1).trim().split(/\s+/))
            .filter(segment => [2, 3, 4, 7].includes(segment.length))
            .length;
        
        return `Count: ${count}`;
    }

    override part2(): string {
        const sum = this.input.reduce((total, line) => {
            const [signals, output] = line.split(' | ')
                .map(part => part.trim().split(/\s+/));
            
            const display = this.decodeDisplay(signals);
            const number = output.reduce((num, digit, index) => 
                num + display.getNumber(digit) * Math.pow(10, 3 - index), 0
            );
            
            return total + number;
        }, 0);
        
        return `Sum of output values: ${sum}`;
    }

    private decodeDisplay(signals: string[]): Display {
        const display = new Display();
        const patterns = new Map<number, Set<string>>();
        
        for (const signal of signals) {
            const segments = new Set(signal);
            switch (signal.length) {
                case 2:
                    display.matchStringAndNumber(signal, 1);
                    patterns.set(1, segments);
                    break;
                case 3:
                    display.matchStringAndNumber(signal, 7);
                    patterns.set(7, segments);
                    break;
                case 4:
                    display.matchStringAndNumber(signal, 4);
                    patterns.set(4, segments);
                    break;
                case 7:
                    display.matchStringAndNumber(signal, 8);
                    patterns.set(8, segments);
                    break;
            }
        }
        
        for (const signal of signals) {
            if (signal.length === 6) {
                const segments = new Set(signal);
                
                if (!this.containsAll(segments, patterns.get(1)!)) {
                    display.matchStringAndNumber(signal, 6);
                    patterns.set(6, segments);
                } else if (this.containsAll(segments, patterns.get(4)!)) {
                    display.matchStringAndNumber(signal, 9);
                    patterns.set(9, segments);
                } else {
                    // Must be 0
                    display.matchStringAndNumber(signal, 0);
                    patterns.set(0, segments);
                }
            }
        }
        
        for (const signal of signals) {
            if (signal.length === 5) {
                const segments = new Set(signal);
                
                if (this.containsAll(segments, patterns.get(1)!)) {
                    display.matchStringAndNumber(signal, 3);
                } else if (this.containsAll(patterns.get(6)!, segments)) {
                    display.matchStringAndNumber(signal, 5);
                } else {
                    display.matchStringAndNumber(signal, 2);
                }
            }
        }
        
        return display;
    }

    private containsAll(container: Set<string>, contained: Set<string>): boolean {
        return [...contained].every(item => container.has(item));
    }
}