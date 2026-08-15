import { day } from '../../helpers/day';

interface Claim {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class year2018day3 extends day {
  private claims: Claim[] = [];

  override preChallenge(): void {
    this.claims = this.input.map(line => {
      const match = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
      if (!match) {
        throw new Error(`Could not parse claim: ${line}`);
      }
      const [, id, x, y, width, height] = match.map(Number);
      return { id, x, y, width, height };
    });
  }

  override part1(): string {
    const overlapCounts = this.buildOverlapCounts();
    const overlapping = [...overlapCounts.values()].filter(count => count >= 2).length;
    return `Square inches claimed by two or more claims: ${overlapping}`;
  }

  override part2(): string {
    const overlapCounts = this.buildOverlapCounts();

    for (const claim of this.claims) {
      let isIntact = true;
      for (let x = claim.x; x < claim.x + claim.width && isIntact; x++) {
        for (let y = claim.y; y < claim.y + claim.height; y++) {
          if ((overlapCounts.get(`${x},${y}`) ?? 0) > 1) {
            isIntact = false;
            break;
          }
        }
      }
      if (isIntact) {
        return `Claim with no overlap: ${claim.id}`;
      }
    }

    return 'No non-overlapping claim found';
  }

  private buildOverlapCounts(): Map<string, number> {
    const counts = new Map<string, number>();

    for (const claim of this.claims) {
      for (let x = claim.x; x < claim.x + claim.width; x++) {
        for (let y = claim.y; y < claim.y + claim.height; y++) {
          const key = `${x},${y}`;
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
    }

    return counts;
  }
}
