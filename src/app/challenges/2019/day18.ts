import { day } from '../../helpers/day';

interface ParsedVault {
  tunnels: Set<string>;
  entrance: string;
  keyBitByPos: Map<string, number>;
  keyBitByChar: Map<string, number>;
  doorBitByPos: Map<string, number>;
  keyCount: number;
}

interface KeyReachability {
  distance: number;
  doorsMask: number;
  keysMask: number;
}

export class year2019day18 extends day {
  override part1(): string {
    return `${this.solve(false)}`;
  }

  override part2(): string {
    return `${this.solve(true)}`;
  }

  private solve(splitEntrance: boolean): number {
    const vault = this.parseVault(splitEntrance);
    const allKeysMask = (1 << vault.keyCount) - 1;

    const reachability = new Map<string, Map<string, KeyReachability>>();
    for (const point of [...vault.entrances, ...vault.keyBitByPos.keys()]) {
      reachability.set(point, this.computeReachableKeys(vault, point));
    }

    const memo = new Map<string, number>();

    const keyCosts = (remainingMask: number, start: string): Map<string, number> => {
      const table = reachability.get(start)!;
      const costs = new Map<string, number>();

      for (const [pos, info] of table) {
        const bit = vault.keyBitByPos.get(pos)!;
        if ((remainingMask & bit) === 0) {
          continue;
        }
        if ((info.doorsMask & remainingMask) !== 0) {
          continue;
        }
        if ((info.keysMask & remainingMask & ~bit) !== 0) {
          continue;
        }
        costs.set(pos, info.distance);
      }

      return costs;
    };

    const solveDp = (robots: string[], remainingMask: number): number => {
      if (remainingMask === 0) {
        return 0;
      }

      const memoKey = `${robots.join(';')}|${remainingMask}`;
      const cached = memo.get(memoKey);
      if (cached !== undefined) {
        return cached;
      }

      let best = Infinity;
      for (let i = 0; i < robots.length; i++) {
        const costs = keyCosts(remainingMask, robots[i]);
        for (const [pos, distance] of costs) {
          const bit = vault.keyBitByPos.get(pos)!;
          const nextRobots = [...robots];
          nextRobots[i] = pos;
          const total = distance + solveDp(nextRobots, remainingMask & ~bit);
          best = Math.min(best, total);
        }
      }

      memo.set(memoKey, best);
      return best;
    };

    return solveDp(vault.entrances, allKeysMask);
  }

  private computeReachableKeys(vault: ParsedVault, start: string): Map<string, KeyReachability> {
    const distances = new Map<string, number>([[start, 0]]);
    const doorsMasks = new Map<string, number>([[start, 0]]);
    const keysMasks = new Map<string, number>([[start, 0]]);
    const queue: string[] = [start];
    let head = 0;

    while (head < queue.length) {
      const current = queue[head++];
      const [x, y] = current.split(',').map(Number);
      const neighbors = [
        `${x},${y - 1}`,
        `${x},${y + 1}`,
        `${x - 1},${y}`,
        `${x + 1},${y}`
      ];

      for (const next of neighbors) {
        if (!vault.tunnels.has(next) || distances.has(next)) {
          continue;
        }

        distances.set(next, distances.get(current)! + 1);
        let doorsMask = doorsMasks.get(current)!;
        let keysMask = keysMasks.get(current)!;

        const doorBit = vault.doorBitByPos.get(next);
        if (doorBit !== undefined) {
          doorsMask |= doorBit;
        }
        const keyBit = vault.keyBitByPos.get(next);
        if (keyBit !== undefined) {
          keysMask |= keyBit;
        }

        doorsMasks.set(next, doorsMask);
        keysMasks.set(next, keysMask);
        queue.push(next);
      }
    }

    const result = new Map<string, KeyReachability>();
    for (const pos of vault.keyBitByPos.keys()) {
      if (pos !== start && distances.has(pos)) {
        result.set(pos, { distance: distances.get(pos)!, doorsMask: doorsMasks.get(pos)!, keysMask: keysMasks.get(pos)! });
      }
    }
    return result;
  }

  private parseVault(splitEntrance: boolean): ParsedVault & { entrances: string[] } {
    const tunnels = new Set<string>();
    const keyBitByPos = new Map<string, number>();
    const keyBitByChar = new Map<string, number>();
    const doorPosByChar = new Map<string, string>();
    let entrance = '';
    let keyCount = 0;

    this.input.forEach((row, y) => {
      [...row].forEach((char, x) => {
        const pos = `${x},${y}`;
        if (char === '#') {
          return;
        }
        tunnels.add(pos);
        if (char === '@') {
          entrance = pos;
        } else if (char >= 'a' && char <= 'z') {
          keyBitByPos.set(pos, 1 << keyCount);
          keyBitByChar.set(char, 1 << keyCount);
          keyCount++;
        } else if (char >= 'A' && char <= 'Z') {
          doorPosByChar.set(char, pos);
        }
      });
    });

    const doorBitByPos = new Map<string, number>();
    for (const [doorChar, doorPos] of doorPosByChar) {
      const keyBit = keyBitByChar.get(doorChar.toLowerCase());
      if (keyBit !== undefined) {
        doorBitByPos.set(doorPos, keyBit);
      }
    }

    let entrances = [entrance];
    if (splitEntrance) {
      const [ex, ey] = entrance.split(',').map(Number);
      tunnels.delete(entrance);
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        tunnels.delete(`${ex + dx},${ey + dy}`);
      }
      entrances = [
        `${ex - 1},${ey - 1}`,
        `${ex - 1},${ey + 1}`,
        `${ex + 1},${ey - 1}`,
        `${ex + 1},${ey + 1}`
      ];
    }

    return { tunnels, entrance, entrances, keyBitByPos, keyBitByChar, doorBitByPos, keyCount };
  }
}
