import { day } from '../helpers/day';

export class year2024day5 extends day {
    private orderRules = new Map<number, Set<number>>();
    private updates: number[][] = [];

  override part1(): string {
    let part1MiddlePageSum = 0;

    this.updates.forEach((update) => {
      if (this.isOrdered(update)) {
        const middleIndex = Math.floor(update.length / 2);
        part1MiddlePageSum += update[middleIndex];
      }
    });

    return `Middle page total number: ${part1MiddlePageSum}`;
  }

  override part2(): string {
    let part2MiddlePageSum = 0;

    this.updates.forEach((update) => {
      if (!this.isOrdered(update)) {
        const reordered = this.topologicalSort(update);
        const middleIndex = Math.floor(reordered.length / 2);
        part2MiddlePageSum += reordered[middleIndex];
      }
    });
    return `Middle page total number: ${part2MiddlePageSum}`;
  }

  override preChallenge(): void {
    let isRulesPart = true;

    for (const line of this.input) {
      if (line.trim() === '') {
        isRulesPart = false;
        continue;
      }

      if (isRulesPart) {
        const [x, y] = line.split('|').map(Number);
        if (!this.orderRules.has(x)) {
          this.orderRules.set(x, new Set());
        }
        this.orderRules.get(x)!.add(y);
      } else {
        this.updates.push(line.split(',').map(Number));
      }
    }
  }

  isOrdered(update: number[]): boolean {
    const pageIndex = new Map<number, number>();
    update.forEach((page, index) => pageIndex.set(page, index));

    for (const [pageX, nextPages] of this.orderRules.entries()) {
      for (const pageY of nextPages) {
        const indexX = pageIndex.get(pageX);
        const indexY = pageIndex.get(pageY);

        if (indexX !== undefined && indexY !== undefined && indexX > indexY) {
          return false;
        }
      }
    }

    return true;
  }

  topologicalSort(update: number[]): number[] {
    const inDegree = new Map<number, number>();
    const graph = new Map<number, Set<number>>();

    update.forEach((page) => {
      graph.set(page, new Set());
      inDegree.set(page, 0);
    });

    for (const [pageX, nextPages] of this.orderRules.entries()) {
      if (update.includes(pageX)) {
        nextPages.forEach((pageY) => {
          if (update.includes(pageY)) {
            if (!graph.has(pageX)) {
              graph.set(pageX, new Set());
            }
            graph.get(pageX)!.add(pageY);
            inDegree.set(pageY, (inDegree.get(pageY) || 0) + 1);
          }
        });
      }
    }

    const queue: number[] = [];
    for (const [page, degree] of inDegree.entries()) {
      if (degree === 0) {
        queue.push(page);
      }
    }

    const sorted: number[] = [];
    while (queue.length > 0) {
      const currentPage = queue.shift()!;
      sorted.push(currentPage);

      for (const neighbor of (graph.get(currentPage) || [])) {
        inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    return sorted;
  }
}
