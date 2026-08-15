import { day } from '../../helpers/day';

interface TreeNode {
  children: TreeNode[];
  metadata: number[];
}

export class year2018day8 extends day {
  private root!: TreeNode;

  override preChallenge(): void {
    const numbers = this.input[0].split(' ').map(Number);
    const cursor = { position: 0 };
    this.root = this.buildTree(numbers, cursor);
  }

  override part1(): string {
    const sumMetadata = (node: TreeNode): number =>
      node.metadata.reduce((sum, value) => sum + value, 0) +
      node.children.reduce((sum, child) => sum + sumMetadata(child), 0);

    return `Sum of all metadata entries: ${sumMetadata(this.root)}`;
  }

  override part2(): string {
    return `Value of the root node: ${this.nodeValue(this.root)}`;
  }

  private nodeValue(node: TreeNode): number {
    if (node.children.length === 0) {
      return node.metadata.reduce((sum, value) => sum + value, 0);
    }

    return node.metadata.reduce((sum, index) => {
      const child = node.children[index - 1];
      return child ? sum + this.nodeValue(child) : sum;
    }, 0);
  }

  private buildTree(numbers: number[], cursor: { position: number }): TreeNode {
    const childCount = numbers[cursor.position++];
    const metadataCount = numbers[cursor.position++];

    const children: TreeNode[] = [];
    for (let i = 0; i < childCount; i++) {
      children.push(this.buildTree(numbers, cursor));
    }

    const metadata: number[] = [];
    for (let i = 0; i < metadataCount; i++) {
      metadata.push(numbers[cursor.position++]);
    }

    return { children, metadata };
  }
}
