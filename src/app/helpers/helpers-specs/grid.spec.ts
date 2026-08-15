import { manhattanDistance, readingOrder } from '../grid';

describe('grid', () => {
  describe('readingOrder', () => {
    it('sorts by y first', () => {
      const points = [{ x: 5, y: 1 }, { x: 0, y: 0 }];
      expect([...points].sort(readingOrder)).toEqual([{ x: 0, y: 0 }, { x: 5, y: 1 }]);
    });

    it('sorts by x when y is equal', () => {
      const points = [{ x: 2, y: 3 }, { x: 1, y: 3 }];
      expect([...points].sort(readingOrder)).toEqual([{ x: 1, y: 3 }, { x: 2, y: 3 }]);
    });
  });

  describe('manhattanDistance', () => {
    it('computes the sum of absolute coordinate differences', () => {
      expect(manhattanDistance(4, 3, 1, 1)).toBe(5);
    });

    it('returns 0 for identical points', () => {
      expect(manhattanDistance(2, 2, 2, 2)).toBe(0);
    });
  });
});
