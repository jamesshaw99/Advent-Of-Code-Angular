import { day } from '../../helpers/day';

const WORKER_COUNT = 5;
const BASE_STEP_SECONDS = 60;

export class year2018day7 extends day {
  private prerequisites = new Map<string, Set<string>>();

  override preChallenge(): void {
    this.prerequisites = new Map();

    for (const line of this.input) {
      const match = line.match(/Step (\w) must be finished before step (\w) can begin\./);
      if (!match) {
        throw new Error(`Could not parse instruction: ${line}`);
      }
      const [, prerequisite, step] = match;

      this.ensureStep(prerequisite);
      this.ensureStep(step);
      this.prerequisites.get(step)!.add(prerequisite);
    }
  }

  override part1(): string {
    const done = new Set<string>();
    const order: string[] = [];
    const allSteps = [...this.prerequisites.keys()];

    while (done.size < allSteps.length) {
      const next = this.availableSteps(done).find(step => !done.has(step))!;
      done.add(next);
      order.push(next);
    }

    return `Step order: ${order.join('')}`;
  }

  override part2(): string {
    return `Total time: ${this.simulateWorkers(WORKER_COUNT, BASE_STEP_SECONDS)}`;
  }

  private simulateWorkers(workerCount: number, baseDuration: number): number {
    const allSteps = [...this.prerequisites.keys()];
    const done = new Set<string>();
    const inProgress = new Map<string, number>();
    const workerAssignments: (string | null)[] = new Array(workerCount).fill(null);

    let time = 0;

    while (done.size < allSteps.length) {
      for (let i = 0; i < workerCount; i++) {
        const step = workerAssignments[i];
        if (step !== null && inProgress.get(step) === 0) {
          done.add(step);
          inProgress.delete(step);
          workerAssignments[i] = null;
        }
      }

      const available = this.availableSteps(done).filter(step => !inProgress.has(step));

      for (let i = 0; i < workerCount && available.length > 0; i++) {
        if (workerAssignments[i] === null) {
          const step = available.shift()!;
          workerAssignments[i] = step;
          inProgress.set(step, baseDuration + (step.charCodeAt(0) - 'A'.charCodeAt(0) + 1));
        }
      }

      if (done.size === allSteps.length) {
        break;
      }

      time++;
      for (const step of inProgress.keys()) {
        inProgress.set(step, inProgress.get(step)! - 1);
      }
    }

    return time;
  }

  private availableSteps(done: Set<string>): string[] {
    return [...this.prerequisites.keys()]
      .filter(step => !done.has(step) && [...this.prerequisites.get(step)!].every(prereq => done.has(prereq)))
      .sort();
  }

  private ensureStep(step: string): void {
    if (!this.prerequisites.has(step)) {
      this.prerequisites.set(step, new Set());
    }
  }
}
