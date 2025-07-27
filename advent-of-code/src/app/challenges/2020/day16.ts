import { day } from "../../helpers/day";

type Range = [number, number];

interface Rule {
    name: string;
    ranges: Range[];
    possiblePositions: Set<number>;
    resolvedPosition?: number;
}

export class year2020day16 extends day {
private rules: Rule[] = [];
    private nearbyTickets: number[][] = [];
    private myTicket: number[] = [];

    override preChallenge(): void {
        const sections = this.input.join('\n').split('\n\n');

        const ruleRegex = /^([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)$/;
        this.rules = sections[0].split('\n').map(line => {
            const match = ruleRegex.exec(line);
            if (!match) throw new Error('Invalid rule format: ' + line);
            return {
                name: match[1],
                ranges: [
                    [parseInt(match[2]), parseInt(match[3])],
                    [parseInt(match[4]), parseInt(match[5])]
                ],
                possiblePositions: new Set(),
            };
        });

        this.myTicket = sections[1].split('\n')[1].split(',').map(Number);

        this.nearbyTickets = sections[2]
            .split('\n')
            .slice(1)
            .map(line => line.split(',').map(Number))
            .filter(t => t.length === this.myTicket.length);
    }

    override part1(): string {
        const invalidValues = this.nearbyTickets.flatMap(ticket =>
            ticket.filter(value => !this.isValidForAnyRule(value))
        );
        return invalidValues.reduce((a, b) => a + b, 0).toString();
    }

    override part2(): string {
        const validTickets = this.nearbyTickets.filter(ticket =>
            ticket.every(value => this.isValidForAnyRule(value))
        );

        const fieldCount = this.myTicket.length;
        for (const rule of this.rules) {
            for (let i = 0; i < fieldCount; i++) {
                if (validTickets.every(ticket => this.isValidForRule(rule, ticket[i]))) {
                    rule.possiblePositions.add(i);
                }
            }
        }

        const unresolved = new Set(this.rules);
        while (unresolved.size > 0) {
            for (const rule of Array.from(unresolved)) {
                if (rule.possiblePositions.size === 1) {
                    const resolved = [...rule.possiblePositions][0];
                    rule.resolvedPosition = resolved;
                    unresolved.delete(rule);

                    for (const otherRule of unresolved) {
                        otherRule.possiblePositions.delete(resolved);
                    }
                }
            }
        }

        const product = this.rules
            .filter(rule => rule.name.startsWith('departure'))
            .map(rule => this.myTicket[rule.resolvedPosition!])
            .reduce((a, b) => a * b, 1);

        return product.toString();
    }

    private isValidForAnyRule(value: number): boolean {
        return this.rules.some(rule => this.isValidForRule(rule, value));
    }

    private isValidForRule(rule: Rule, value: number): boolean {
        return rule.ranges.some(([min, max]) => value >= min && value <= max);
    }
}