import { year2024day23 } from '../day23';

describe('2024 day23', () => {
  let instance: year2024day23;

  const input: string[] = [
    'kh-tc', 'qp-kh', 'de-cg', 'ka-co', 'yn-aq', 'qp-ub', 'cg-tb', 'vc-aq',
    'tb-ka', 'wh-tc', 'yn-cg', 'kh-ub', 'ta-co', 'de-co', 'tc-td', 'tb-wq',
    'wh-td', 'ta-ka', 'td-qp', 'aq-cg', 'wq-ub', 'ub-vc', 'de-ta', 'wq-aq',
    'wq-vc', 'wh-yn', 'ka-de', 'kh-ta', 'co-tc', 'wh-qp', 'tb-vc', 'td-yn',
  ];

  beforeEach(() => {
    instance = new year2024day23();
    instance.input = input;
    instance.preChallenge();
  });

  describe('preChallenge', () => {
    it('should build a bidirectional adjacency map from the connections', () => {
      // Assert
      expect(instance.adjacency.get('kh')).toEqual(new Set(['tc', 'qp', 'ub', 'ta']));
      expect(instance.adjacency.get('tc')?.has('kh')).toBe(true);
    });
  });

  describe('findTriangles', () => {
    it('should find every set of three interconnected computers', () => {
      // Act
      const triangles = instance.findTriangles();

      // Assert
      expect(triangles).toContainEqual(['co', 'de', 'ta']);
      expect(triangles).toContainEqual(['tb', 'vc', 'wq']);
    });
  });

  describe('challenges', () => {
    it('should count triangles containing at least one computer starting with t in part1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe("Sets of three interconnected computers containing a 't' name: 7");
    });

    it('should find the LAN party password from the largest clique in part2', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Password to the LAN party: co,de,ka,ta');
    });
  });

  describe('findLargestClique', () => {
    it('should find the largest fully-connected set of computers', () => {
      // Act
      const result = instance.findLargestClique();

      // Assert
      expect(result).toEqual(['co', 'de', 'ka', 'ta']);
    });
  });
});
