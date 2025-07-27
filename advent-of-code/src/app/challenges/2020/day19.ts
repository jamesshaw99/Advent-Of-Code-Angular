import { day } from '../../helpers/day';

export class year2020day19 extends day {
  private rules = new Map<number, string>();
    private messages: string[] = [];

    override preChallenge(): void {
        let i = 0;
        
        while (i < this.input.length && this.input[i] !== '') {
            const [ruleNum, rule] = this.input[i].split(': ');
            this.rules.set(parseInt(ruleNum), rule);
            i++;
        }
        
        i++;
        this.messages = this.input.slice(i);
    }

    private buildRegex(ruleNum: number, memo = new Map<number, string>()): string {
        if (memo.has(ruleNum)) {
            return memo.get(ruleNum)!;
        }

        const rule = this.rules.get(ruleNum)!;
        
        if (rule.startsWith('"')) {
            const result = rule.slice(1, -1);
            memo.set(ruleNum, result);
            return result;
        }

        if (rule.includes('|')) {
            const alternatives = rule.split(' | ').map(alt => {
                const parts = alt.split(' ').map(part => 
                    this.buildRegex(parseInt(part), memo)
                );
                return parts.join('');
            });
            const result = `(?:${alternatives.join('|')})`;
            memo.set(ruleNum, result);
            return result;
        }

        const parts = rule.split(' ').map(part => 
            this.buildRegex(parseInt(part), memo)
        );
        const result = parts.join('');
        memo.set(ruleNum, result);
        return result;
    }

    override part1(): string {
        const pattern = new RegExp(`^${this.buildRegex(0)}$`);
        return `${this.messages.filter(msg => pattern.test(msg)).length} messages match rule 0`;
    }

    override part2(): string {
        const regex42 = new RegExp(`^${this.buildRegex(42)}`);
        const regex31 = new RegExp(`^${this.buildRegex(31)}`);
        
        let validCount = 0;
        
        for (const message of this.messages) {
            let remaining = message;
            let count42 = 0;
            
            while (remaining.length > 0) {
                const match = remaining.match(regex42);
                if (match) {
                    remaining = remaining.substring(match[0].length);
                    count42++;
                } else {
                    break;
                }
            }
            
            let count31 = 0;
            while (remaining.length > 0) {
                const match = remaining.match(regex31);
                if (match) {
                    remaining = remaining.substring(match[0].length);
                    count31++;
                } else {
                    break;
                }
            }
            
            if (remaining.length === 0 && count42 >= 2 && count31 >= 1 && count42 > count31) {
                validCount++;
            }
        }
        
        return `${validCount} messages match rule 0`;
    }
}
