// Placeholder until we create the actual ProgramExecutor class
import { ProgramExecutor } from './program-executor';

export class Cluster {
  private nodes: ProgramExecutor[] = [];
  private iterator: Iterator<ProgramExecutor>;

  constructor(program: string, nodesAmount: number) {
    for (let i = 0; i < nodesAmount; i++) {
      this.nodes.push(new ProgramExecutor(program));
    }
    this.iterator = this.nodes[Symbol.iterator]();
  }

  getFirstNode(): ProgramExecutor {
    return this.getNode(0);
  }

  getLastNode(): ProgramExecutor {
    return this.getNode(this.getSize() - 1);
  }

  resetIterator(): void {
    this.iterator = this.nodes[Symbol.iterator]();
  }

  getNode(index: number): ProgramExecutor {
    return this.nodes[index];
  }

  getIterator(): Iterator<ProgramExecutor> {
    return this.iterator;
  }

  getSize(): number {
    return this.nodes.length;
  }
}
