import { Symbol } from '../symbol';

describe('Symbol Class', () => {
  let symbol: Symbol;

  beforeEach(() => {
    symbol = new Symbol(5, 10, 'A'); // Initialize a Symbol instance
  });

  it('should initialize with correct x, y, and val values', () => {
    // Assert
    expect(symbol.getX()).toBe(5);
    expect(symbol.getY()).toBe(10);
    expect(symbol.getVal()).toBe('A');
  });

  it('should return the correct x value', () => {
    // Act
    const x = symbol.getX();

    // Assert
    expect(x).toBe(5);
  });

  it('should return the correct y value', () => {
    // Act
    const y = symbol.getY();

    // Assert
    expect(y).toBe(10);
  });

  it('should return the correct val value', () => {
    // Act
    const val = symbol.getVal();

    // Assert
    expect(val).toBe('A');
  });

  it('should handle negative coordinates correctly', () => {
    // Arrange
    const negativeSymbol = new Symbol(-3, -7, 'B');

    // Assert
    expect(negativeSymbol.getX()).toBe(-3);
    expect(negativeSymbol.getY()).toBe(-7);
    expect(negativeSymbol.getVal()).toBe('B');
  });

  it('should handle empty val correctly', () => {
    // Arrange
    const emptyValSymbol = new Symbol(0, 0, '');

    // Assert
    expect(emptyValSymbol.getVal()).toBe('');
  });

  it('should handle numerical strings in val correctly', () => {
    // Arrange
    const numValSymbol = new Symbol(1, 1, '123');

    // Assert
    expect(numValSymbol.getVal()).toBe('123');
  });
});
