import { day } from '../../helpers/day';

export class year2024day23 extends day {
  adjacency = new Map<string, Set<string>>();

  override preChallenge(): void {
    this.adjacency = new Map();

    for (const line of this.input) {
      const match = line.match(/(\w+)-(\w+)/);
      if (!match) continue;

      const [, a, b] = match;
      this.addConnection(a, b);
      this.addConnection(b, a);
    }
  }

  addConnection(from: string, to: string): void {
    if (!this.adjacency.has(from)) {
      this.adjacency.set(from, new Set());
    }
    this.adjacency.get(from)!.add(to);
  }

  override part1(): string {
    const triangles = this.findTriangles();
    const count = triangles.filter((triangle) =>
      triangle.some((computer) => computer.startsWith('t'))
    ).length;

    return `Sets of three interconnected computers containing a 't' name: ${count}`;
  }

  override part2(): string {
    const clique = this.findLargestClique();
    return `Password to the LAN party: ${clique.join(',')}`;
  }

  findLargestClique(): string[] {
    let best: string[] = [];

    const bronKerbosch = (r: Set<string>, p: Set<string>, x: Set<string>): void => {
      if (p.size === 0 && x.size === 0) {
        if (r.size > best.length) {
          best = [...r];
        }
        return;
      }

      for (const v of [...p]) {
        const neighbors = this.adjacency.get(v)!;
        const nextR = new Set(r);
        nextR.add(v);
        const nextP = new Set([...p].filter((n) => neighbors.has(n)));
        const nextX = new Set([...x].filter((n) => neighbors.has(n)));

        bronKerbosch(nextR, nextP, nextX);

        p.delete(v);
        x.add(v);
      }
    };

    bronKerbosch(new Set(), new Set(this.adjacency.keys()), new Set());

    return best.sort();
  }

  findTriangles(): string[][] {
    const nodes = [...this.adjacency.keys()].sort();
    const triangles: string[][] = [];

    for (const a of nodes) {
      const aNeighbors = this.adjacency.get(a)!;
      for (const b of aNeighbors) {
        if (b <= a) continue;
        const bNeighbors = this.adjacency.get(b)!;
        for (const c of bNeighbors) {
          if (c <= b) continue;
          if (aNeighbors.has(c)) {
            triangles.push([a, b, c]);
          }
        }
      }
    }

    return triangles;
  }
}
