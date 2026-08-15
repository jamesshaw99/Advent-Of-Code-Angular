import { day } from '../../helpers/day';

const TOTAL_GENERATIONS_PART2 = 50_000_000_000;
const STABLE_STREAK_REQUIRED = 5;

export class year2018day12 extends day {
  private initialState = new Set<number>();
  private rules = new Map<string, boolean>();

  override preChallenge(): void {
    const [firstLine, , ...ruleLines] = this.input;
    const initial = firstLine.replace('initial state: ', '');

    this.initialState = new Set();
    [...initial].forEach((char, index) => {
      if (char === '#') {
        this.initialState.add(index);
      }
    });

    this.rules = new Map();
    for (const line of ruleLines) {
      if (!line.trim()) {
        continue;
      }
      const [pattern, result] = line.split(' => ');
      this.rules.set(pattern, result === '#');
    }
  }

  override part1(): string {
    let state = new Set(this.initialState);
    for (let generation = 0; generation < 20; generation++) {
      state = this.step(state);
    }
    return `Sum of plant pot numbers: ${this.sumPots(state)}`;
  }

  override part2(): string {
    let state = new Set(this.initialState);
    let previousSum = this.sumPots(state);
    let previousDelta: number | null = null;
    let stableStreak = 0;

    for (let generation = 1; generation <= TOTAL_GENERATIONS_PART2; generation++) {
      state = this.step(state);
      const sum = this.sumPots(state);
      const delta = sum - previousSum;

      if (delta === previousDelta) {
        stableStreak++;
        if (stableStreak >= STABLE_STREAK_REQUIRED) {
          const remainingGenerations = TOTAL_GENERATIONS_PART2 - generation;
          const finalSum = sum + delta * remainingGenerations;
          return `Sum of plant pot numbers: ${finalSum}`;
        }
      } else {
        stableStreak = 0;
      }

      previousDelta = delta;
      previousSum = sum;
    }

    return `Sum of plant pot numbers: ${previousSum}`;
  }

  private step(state: Set<number>): Set<number> {
    const min = Math.min(...state);
    const max = Math.max(...state);
    const next = new Set<number>();

    for (let pot = min - 2; pot <= max + 2; pot++) {
      let pattern = '';
      for (let offset = -2; offset <= 2; offset++) {
        pattern += state.has(pot + offset) ? '#' : '.';
      }
      if (this.rules.get(pattern)) {
        next.add(pot);
      }
    }

    return next;
  }

  private sumPots(state: Set<number>): number {
    return [...state].reduce((sum, pot) => sum + pot, 0);
  }
}
