import { day } from '../../helpers/day';

type NodeMap = Map<string, Node>;

export class year2019day6 extends day {
  private orbitsMap: NodeMap = new Map<string, Node>();

  override preChallenge(): void {
    this.orbitsMap.set('COM', new Node(null, 'COM'));

    for (const line of this.input) {
      const [parentName, childName] = line.split(')');
      const node1 = this.findOrMakeNode(this.orbitsMap, parentName);
      const node2 = this.findOrMakeNode(this.orbitsMap, childName);
      node2.parent = node1;
    }
  }

  override part1(): string | Promise<string> {
    let totalOrbits = 0;
    for (const node of this.orbitsMap.values()) {
      totalOrbits += node.getDepth();
    }
    return `Total number of orbits: ${totalOrbits}`;
  }

  override part2(): string | Promise<string> {
    const you = this.orbitsMap.get('YOU');
    const san = this.orbitsMap.get('SAN');
    if (!you || !san) throw new Error('Missing YOU or SAN node');

    const common = this.findCommonParent(you, san);
    const result =
      (you.getDepth() - common.getDepth()) +
      (san.getDepth() - common.getDepth()) -
      2;
    return `Minimum orbital transfers from YOU to SAN: ${result}`;
  }

  findOrMakeNode(map: NodeMap, name: string): Node {
    if (!map.has(name)) {
      map.set(name, new Node(null, name));
    }
    return map.get(name)!;
  }

  findCommonParent(node1: Node, node2: Node): Node {
    const node1Parents = node1.getAncestors();
    const node2Parents = node2.getAncestors();

    const common = node1Parents.filter((p) => node2Parents.includes(p));
    common.sort((a, b) => b.getDepth() - a.getDepth());
    return common[0];
  }
}

class Node {
  public parent: Node | null;
  public readonly name: string;

  constructor(parent: Node | null, name: string) {
    this.parent = parent;
    this.name = name;
  }

  public isRoot(): boolean {
    return this.parent === null;
  }

  public getDepth(): number {
    return this.getAncestors().length;
  }

  public getAncestors(): Node[] {
    const parents: Node[] = [];
    let current = this.parent;
    while (current) {
      parents.push(current);
      current = current.parent;
    }
    return parents;
  }
}
