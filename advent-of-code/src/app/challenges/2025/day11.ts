import { day } from '../../helpers/day';

export class year2025day11 extends day {
  graph = new Map<string, string[]>();

  override preChallenge(): void {
    for (const line of this.input) {
      const [device, outputs] = line.split(':');
      const deviceName = device.trim();
      const outputDevices = outputs.trim().split(' ');
      this.graph.set(deviceName, outputDevices);
    }
  }

  override part1(): string {
    const totalPaths = this.countPathsDP('you', 'out', new Map());

    return `The total paths from 'you' to 'out' is: ${totalPaths}`;
  }

  override part2(): string {
    const totalPaths = this.countPathsWithRequired(
      'svr',
      'out',
      false,
      false,
      new Map()
    );

    return `The total paths from 'svr' to 'out' visiting both 'dac' and 'fft' is: ${totalPaths}`;
  }

  countPathsDP(
    current: string,
    target: string,
    memo: Map<string, number>
  ): number {
    if (current === target) {
      return 1;
    }

    if (memo.has(current)) {
      return memo.get(current)!;
    }

    const outputs = this.graph.get(current);
    if (!outputs) {
      memo.set(current, 0);
      return 0;
    }

    let pathCount = 0;
    for (const next of outputs) {
      pathCount += this.countPathsDP(next, target, memo);
    }

    memo.set(current, pathCount);
    return pathCount;
  }

  countPathsWithRequired(
    current: string,
    target: string,
    hasDac: boolean,
    hasFft: boolean,
    memo: Map<string, number>
  ): number {
    const visitedDac = hasDac || current === 'dac';
    const visitedFft = hasFft || current === 'fft';

    if (current === target) {
      return visitedDac && visitedFft ? 1 : 0;
    }

    const memoKey = `${current}|${visitedDac}|${visitedFft}`;
    if (memo.has(memoKey)) {
      return memo.get(memoKey)!;
    }

    const outputs = this.graph.get(current);
    if (!outputs) {
      memo.set(memoKey, 0);
      return 0;
    }

    let pathCount = 0;
    for (const next of outputs) {
      pathCount += this.countPathsWithRequired(
        next,
        target,
        visitedDac,
        visitedFft,
        memo
      );
    }

    memo.set(memoKey, pathCount);
    return pathCount;
  }
}
