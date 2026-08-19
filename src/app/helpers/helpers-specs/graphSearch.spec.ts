import { bfs, dijkstra, dijkstraAll } from '../graphSearch';

describe('graphSearch', () => {
  describe('bfs', () => {
    const grid: Record<string, string[]> = {
      A: ['B', 'C'],
      B: ['A', 'D'],
      C: ['A', 'D'],
      D: ['B', 'C', 'E'],
      E: ['D'],
    };
    const neighbors = (node: string): string[] => grid[node];

    it('finds the shortest distance to every reachable node', () => {
      const result = bfs('A', node => node, neighbors);

      expect(result.get('A')?.distance).toBe(0);
      expect(result.get('B')?.distance).toBe(1);
      expect(result.get('C')?.distance).toBe(1);
      expect(result.get('D')?.distance).toBe(2);
      expect(result.get('E')?.distance).toBe(3);
    });

    it('stops early once isEnd matches', () => {
      const result = bfs('A', node => node, neighbors, node => node === 'D');

      expect(result.get('D')?.distance).toBe(2);
      expect(result.has('E')).toBe(false);
    });
  });

  describe('dijkstra', () => {
    const edges: Record<string, { node: string; cost: number }[]> = {
      A: [{ node: 'B', cost: 5 }, { node: 'C', cost: 1 }],
      B: [{ node: 'D', cost: 1 }],
      C: [{ node: 'B', cost: 1 }, { node: 'D', cost: 8 }],
      D: [],
    };

    it('finds the shortest weighted cost to the end node', () => {
      const cost = dijkstra('A', node => node, node => edges[node], node => node === 'D');

      expect(cost).toBe(3);
    });

    it('returns Infinity when the end node is unreachable', () => {
      const cost = dijkstra('A', node => node, node => edges[node], node => node === 'unreachable');

      expect(cost).toBe(Infinity);
    });
  });

  describe('dijkstraAll', () => {
    const edges: Record<string, { node: string; cost: number }[]> = {
      A: [{ node: 'B', cost: 5 }, { node: 'C', cost: 1 }],
      B: [{ node: 'D', cost: 1 }],
      C: [{ node: 'B', cost: 1 }, { node: 'D', cost: 8 }],
      D: [],
    };

    it('finds the best cost to every reachable node from a single seeded start', () => {
      const result = dijkstraAll([{ node: 'A', cost: 0 }], node => node, node => edges[node]);

      expect(result.get('A')).toBe(0);
      expect(result.get('B')).toBe(2);
      expect(result.get('C')).toBe(1);
      expect(result.get('D')).toBe(3);
    });

    it('supports multiple seeded starts at once', () => {
      const result = dijkstraAll(
        [{ node: 'A', cost: 0 }, { node: 'D', cost: 10 }],
        node => node,
        node => edges[node]
      );

      expect(result.get('D')).toBe(3);
    });
  });
});
