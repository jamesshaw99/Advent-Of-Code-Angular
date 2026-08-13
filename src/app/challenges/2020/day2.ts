import { day } from "../../helpers/day";

interface PasswordPolicy {
  min: number;
  max: number;
  char: string;
  password: string;
}

export class year2020day2 extends day {
  private policies: PasswordPolicy[] = [];

  override preChallenge(): void {
    this.policies = this.input.map(line => this.parseLine(line));
  }

  override part1(): string {
    let validCount = 0;

    for (const policy of this.policies) {
      const charCount = this.countChar(policy.password, policy.char);
      
      if (charCount >= policy.min && charCount <= policy.max) {
        validCount++;
      }
    }

    return `${validCount} passwords are valid`;
  }

  override part2(): string {
    let validCount = 0;

    for (const policy of this.policies) {
      const pos1Match = policy.password[policy.min - 1] === policy.char;
      const pos2Match = policy.password[policy.max - 1] === policy.char;
      
      if (pos1Match !== pos2Match) {
        validCount++;
      }
    }

    return `${validCount} passwords are valid`;
  }

  private parseLine(line: string): PasswordPolicy {
    const match = line.match(/^(\d+)-(\d+) (.): (.+)$/);
    if (!match) {
      throw new Error(`Invalid line format: ${line}`);
    }

    return {
      min: parseInt(match[1]),
      max: parseInt(match[2]),
      char: match[3],
      password: match[4]
    };
  }

  private countChar(str: string, char: string): number {
    let count = 0;
    for (const c of str) {
      if (c === char) {
        count++;
      }
    }
    return count;
  }
}