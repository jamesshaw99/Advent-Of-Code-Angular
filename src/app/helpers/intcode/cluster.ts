import { ProgramExecutor } from './program-executor';

const STEP_BUDGET = 1000;

export class Cluster {
  private nodes: ProgramExecutor[] = [];

  constructor(program: string, nodesAmount: number) {
    for (let i = 0; i < nodesAmount; i++) {
      const node = new ProgramExecutor(program);
      node.getIo().setEmptyInputValue(-1);
      node.getIo().enableOutputInterrupt(true);
      node.getIo().addInput(i);
      this.nodes.push(node);
    }
  }

  getFirstNode(): ProgramExecutor {
    return this.getNode(0);
  }

  getLastNode(): ProgramExecutor {
    return this.getNode(this.getSize() - 1);
  }

  getNode(index: number): ProgramExecutor {
    return this.nodes[index];
  }

  getSize(): number {
    return this.nodes.length;
  }

  async runNetwork(
    onNatReceive: (x: number, y: number) => boolean,
    onIdleResend?: (x: number, y: number) => boolean
  ): Promise<void> {
    let natPacket: [number, number] | null = null;

    while (true) {
      let anyPacket = false;

      for (const node of this.nodes) {
        const packet = await this.collectPacket(node);
        if (!packet) {
          continue;
        }

        anyPacket = true;
        const [address, x, y] = packet;

        if (address === 255) {
          natPacket = [x, y];
          if (onNatReceive(x, y)) {
            return;
          }
        } else {
          this.nodes[address].getIo().addInput(x);
          this.nodes[address].getIo().addInput(y);
        }
      }

      if (!anyPacket && natPacket && this.nodes.every(node => !node.getIo().hasPendingInput())) {
        const [x, y] = natPacket;
        if (onIdleResend?.(x, y)) {
          return;
        }
        this.nodes[0].getIo().addInput(x);
        this.nodes[0].getIo().addInput(y);
      }
    }
  }

  private async collectPacket(node: ProgramExecutor): Promise<[number, number, number] | null> {
    const outputs: number[] = [];
    for (let i = 0; i < 3; i++) {
      const before = node.getIo().getOutputsLogLength();
      await node.run(STEP_BUDGET);
      if (node.getIo().getOutputsLogLength() === before) {
        return null;
      }
      outputs.push(node.getIo().getLastOutput());
    }
    return outputs as [number, number, number];
  }
}
