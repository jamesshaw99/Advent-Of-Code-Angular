import { day } from '../../helpers/day';

export class year2024day19 extends day {
  patterns: string[] = [];
  designs: string[] = [];

  override preChallenge(): void {
    this.patterns = this.input[0].split(',').map((pattern) => pattern.trim());
    this.designs = this.input.slice(1).filter((line) => line.trim() !== '');
  }

  override part1(): string {
    const possibleCount = this.designs.filter((design) => this.isDesignPossible(design)).length;
    return `Number of possible designs: ${possibleCount}`;
  }

  isDesignPossible(design: string): boolean {
    const reachable = new Array(design.length + 1).fill(false);
    reachable[0] = true;

    for (let end = 1; end <= design.length; end++) {
      for (const pattern of this.patterns) {
        const start = end - pattern.length;
        if (start >= 0 && reachable[start] && design.slice(start, end) === pattern) {
          reachable[end] = true;
          break;
        }
      }
    }

    return reachable[design.length];
  }

  override part2(): string {
    const totalWays = this.designs.reduce((sum, design) => sum + this.countWays(design), 0);
    return `Total number of ways to make every design: ${totalWays}`;
  }

  countWays(design: string): number {
    const ways = new Array(design.length + 1).fill(0);
    ways[0] = 1;

    for (let end = 1; end <= design.length; end++) {
      for (const pattern of this.patterns) {
        const start = end - pattern.length;
        if (start >= 0 && ways[start] > 0 && design.slice(start, end) === pattern) {
          ways[end] += ways[start];
        }
      }
    }

    return ways[design.length];
  }
}
