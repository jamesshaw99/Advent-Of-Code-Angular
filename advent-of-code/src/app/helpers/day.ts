export class day {
  input: string[] = [];
  run: (input: string[]) => { part1: string; part2: string };

  // Constructor that allows injecting a mock or custom run function
  constructor(run?: (input: string[]) => { part1: string; part2: string }) {
    this.run = run || this.defaultRun;
  }

  private defaultRun(input: string[]): { part1: string; part2: string } {
    this.input = input;
    this.preChallenge();
    return {
      part1: this.part1(),
      part2: this.part2(),
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
