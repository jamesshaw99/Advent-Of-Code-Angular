import { Cluster } from '../../../helpers/intcode/cluster';

const echoProgram = '3,100,3,101,1008,101,-1,103,1005,103,2,3,102,104,255,4,101,4,102,1105,1,2';

describe('2019 day23', () => {
  describe('Cluster.runNetwork', () => {
    it('routes a seeded packet to the NAT, resends it to address 0 once idle, and detects the resulting repeat', async () => {
      const cluster = new Cluster(echoProgram, 50);
      cluster.getNode(1).getIo().addInput(5);
      cluster.getNode(1).getIo().addInput(42);

      const natReceipts: [number, number][] = [];
      let repeated: [number, number] | null = null;

      await cluster.runNetwork(
        (x, y) => {
          natReceipts.push([x, y]);
          return false;
        },
        (x, y) => {
          if (natReceipts.length >= 2) {
            repeated = [x, y];
            return true;
          }
          return false;
        }
      );

      expect(natReceipts).toEqual([[5, 42], [5, 42]]);
      expect(repeated).toEqual([5, 42]);
    }, 20000);
  });
});
