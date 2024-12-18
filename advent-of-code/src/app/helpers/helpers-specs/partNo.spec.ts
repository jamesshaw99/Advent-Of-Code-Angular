import { PartNo } from '../partNo';
import { Symbol } from '../symbol';

describe('PartNo Class', () => {
  let partNo: PartNo;

  beforeEach(() => {
    partNo = new PartNo(0, 0, '123');
  });

  it('should initialize with correct x, y, and number values', () => {
    expect(partNo.getNumberAsInt()).toBe(123);
  });

  it('should append a number to the existing number', () => {
    // Act
    partNo.appendNumber('45');

    // Assert
    expect(partNo.getNumberAsInt()).toBe(12345);
  });

  it('should return true if a Symbol is near enough to the PartNo', () => {
    // Arrange
    const symbol = new Symbol(2, 0, 'x');

    // Act
    const result = partNo.hasSymbol(symbol);

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false if a Symbol is too far from the PartNo', () => {
    // Arrange
    const symbol = new Symbol(10, 10, 'x');

    // Act
    const result = partNo.hasSymbol(symbol);

    // Assert
    expect(result).toBeFalse();
  });

  it('should correctly handle decimal numbers in the number string', () => {
    // Arrange
    const partNoWithDecimals = new PartNo(0, 0, '123.45');

    // Act
    const intResult = partNoWithDecimals.getNumberAsInt();

    // Assert
    expect(intResult).toBe(123);
  });
});
