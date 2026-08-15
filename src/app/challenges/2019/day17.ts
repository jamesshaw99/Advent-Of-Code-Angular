import { day } from '../../helpers/day';
import { ProgramExecutor } from '../../helpers/intcode/program-executor';

enum Facing {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

const TURN_RIGHT: Record<Facing, Facing> = {
  [Facing.UP]: Facing.RIGHT,
  [Facing.RIGHT]: Facing.DOWN,
  [Facing.DOWN]: Facing.LEFT,
  [Facing.LEFT]: Facing.UP
};

const TURN_LEFT: Record<Facing, Facing> = {
  [Facing.UP]: Facing.LEFT,
  [Facing.LEFT]: Facing.DOWN,
  [Facing.DOWN]: Facing.RIGHT,
  [Facing.RIGHT]: Facing.UP
};

const AHEAD_DELTA: Record<Facing, { dx: number; dy: number }> = {
  [Facing.UP]: { dx: 0, dy: -1 },
  [Facing.DOWN]: { dx: 0, dy: 1 },
  [Facing.LEFT]: { dx: -1, dy: 0 },
  [Facing.RIGHT]: { dx: 1, dy: 0 }
};

export class year2019day17 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const map = await this.scanCamera();
    const intersections = [...map.keys()].filter(key => this.isIntersection(map, key));
    const sum = intersections.reduce((total, key) => {
      const [x, y] = key.split(',').map(Number);
      return total + x * y;
    }, 0);
    return `Calibration Parameter: ${sum}`;
  }

  override async part2(): Promise<string> {
    const map = await this.scanCamera();
    const [routine, a, b, c] = this.findMovementRoutine(map);

    const goProgram = `2${this.text.substring(1)}`;
    const computer = new ProgramExecutor(goProgram);

    for (const line of [routine, a, b, c, 'n']) {
      for (const character of line) {
        computer.getIo().addInput(character.charCodeAt(0));
      }
      computer.getIo().addInput('\n'.charCodeAt(0));
    }

    await computer.run();
    return `${computer.getIo().getLastOutput()}`;
  }

  private async scanCamera(): Promise<Map<string, string>> {
    const computer = new ProgramExecutor(this.text);
    await computer.run();

    const map = new Map<string, string>();
    let x = 0;
    let y = 0;

    for (const output of computer.getIo().getOutputsLog()) {
      if (output === 10) {
        y++;
        x = 0;
      } else {
        map.set(`${x},${y}`, String.fromCharCode(output));
        x++;
      }
    }

    return map;
  }

  private isIntersection(map: Map<string, string>, key: string): boolean {
    if (map.get(key) !== '#') {
      return false;
    }
    const [x, y] = key.split(',').map(Number);
    return [
      `${x + 1},${y}`,
      `${x - 1},${y}`,
      `${x},${y + 1}`,
      `${x},${y - 1}`
    ].every(neighbor => map.get(neighbor) === '#');
  }

  private findMovementRoutine(map: Map<string, string>): [string, string, string, string] {
    const path = this.findPathToEnd(map);
    let bannedFirstSections: string[][] = [];

    while (true) {
      const a = this.findHighestValuedSection(path, bannedFirstSections);
      const afterA = this.replaceAll(path, a, 'A');

      const b = this.findHighestValuedSection(afterA, []);
      const afterB = this.replaceAll(afterA, b, 'B');

      const c = this.findHighestValuedSection(afterB, []);
      const afterC = this.replaceAll(afterB, c, 'C');

      const finished = afterC.every(token => token.length === 1);
      if (finished) {
        const toAsciiLine = (tokens: string[]): string => tokens.join(',').replace(/ /g, ',');
        return [toAsciiLine(afterC), toAsciiLine(a), toAsciiLine(b), toAsciiLine(c)];
      }

      bannedFirstSections = [...bannedFirstSections, a];
    }
  }

  private replaceAll(tokens: string[], section: string[], replacement: string): string[] {
    const result: string[] = [];
    for (let i = 0; i < tokens.length; ) {
      if (this.arraysEqual(tokens.slice(i, i + section.length), section)) {
        result.push(replacement);
        i += section.length;
      } else {
        result.push(tokens[i]);
        i++;
      }
    }
    return result;
  }

  private arraysEqual(a: string[], b: string[]): boolean {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }

  private findHighestValuedSection(tokens: string[], bannedSections: string[][]): string[] {
    const candidates = this.findCommonSubsections(tokens);

    const ranked = [...candidates.values()]
      .filter(candidate => candidate.tokens.length > 1 && candidate.tokens.length < 6)
      .filter(candidate => !bannedSections.some(banned => this.arraysEqual(banned, candidate.tokens)))
      .sort((a, b) => b.matches * b.tokens.length - a.matches * a.tokens.length);

    return ranked[0].tokens;
  }

  private findCommonSubsections(tokens: string[]): Map<string, { tokens: string[]; matches: number }> {
    let indexToStart = 0;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].length !== 1) {
        indexToStart = i;
        break;
      }
    }

    const subsections = new Map<string, { tokens: string[]; matches: number }>();

    for (let end = indexToStart + 1; end <= tokens.length; end++) {
      const subSection = tokens.slice(indexToStart, end);

      if (subSection[subSection.length - 1].length === 1) {
        break;
      }

      let matches = 1;
      for (let start = indexToStart + subSection.length; start + subSection.length <= tokens.length; start++) {
        if (this.arraysEqual(subSection, tokens.slice(start, start + subSection.length))) {
          matches++;
        }
      }

      subsections.set(JSON.stringify(subSection), { tokens: subSection, matches });
    }

    return subsections;
  }

  private findPathToEnd(map: Map<string, string>): string[] {
    const robotGlyphs: Record<string, Facing> = { '^': Facing.UP, v: Facing.DOWN, '<': Facing.LEFT, '>': Facing.RIGHT };
    const start = [...map.entries()].find(([, value]) => value in robotGlyphs) as [string, string];
    let [x, y] = start[0].split(',').map(Number);
    let facing = robotGlyphs[start[1]];

    const tokens: string[] = [];
    let aheadCount = 0;
    let pendingTurn = '';

    while (true) {
      const { dx, dy } = AHEAD_DELTA[facing];
      const aheadKey = `${x + dx},${y + dy}`;

      if (map.get(aheadKey) === '#') {
        aheadCount++;
        x += dx;
        y += dy;
        continue;
      }

      if (aheadCount !== 0) {
        tokens.push(`${pendingTurn}${aheadCount}`);
        pendingTurn = '';
        aheadCount = 0;
      }

      const turn = this.findTurn(map, x, y, facing);
      if (turn === null) {
        return tokens;
      }

      facing = turn === 'R' ? TURN_RIGHT[facing] : TURN_LEFT[facing];
      pendingTurn = `${turn} `;
    }
  }

  private findTurn(map: Map<string, string>, x: number, y: number, facing: Facing): 'L' | 'R' | null {
    if (facing === Facing.UP || facing === Facing.DOWN) {
      const plusX = map.get(`${x + 1},${y}`);
      const minusX = map.get(`${x - 1},${y}`);
      if (plusX === '#') {
        return facing === Facing.UP ? 'R' : 'L';
      }
      if (minusX === '#') {
        return facing === Facing.UP ? 'L' : 'R';
      }
      return null;
    }

    const plusY = map.get(`${x},${y + 1}`);
    const minusY = map.get(`${x},${y - 1}`);
    if (plusY === '#') {
      return facing === Facing.LEFT ? 'L' : 'R';
    }
    if (minusY === '#') {
      return facing === Facing.LEFT ? 'R' : 'L';
    }
    return null;
  }
}
