export class day {
  input: string[] = [];
  run: (input: string[]) => { part1: string; part2: string; timePart1: number; timePart2: number };

  // Constructor that allows injecting a mock or custom run function
  constructor(run?: (input: string[]) => { part1: string; part2: string; timePart1: number; timePart2: number }) {
    this.run = run || this.defaultRun;
  }

  private defaultRun(input: string[]): { part1: string; part2: string; timePart1: number; timePart2: number } {
    this.input = input;
    this.preChallenge();

    const startPart1 = performance.now();
    const part1Result = this.part1();
    const endPart1 = performance.now();

    const startPart2 = performance.now();
    const part2Result = this.part2();
    const endPart2 = performance.now();

    return {
      part1: part1Result,
      part2: part2Result,
      timePart1: +(endPart1 - startPart1).toFixed(2),
      timePart2: +(endPart2 - startPart2).toFixed(2),
    };
  }

  preChallenge() {} // eslint-disable-line @typescript-eslint/no-empty-function

  part1() {
    return 'not implemented';
  }

  part2() {
    return 'not implemented';
  }
}
