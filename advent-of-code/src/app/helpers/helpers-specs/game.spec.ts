import { Game } from '../game'; // Adjust the import path based on your file structure

describe('Game Class', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(1); // Initialize a Game instance with game number 1
  });

  it('should initialize with correct game number', () => {
    expect(game.getGameNo()).toBe(1);
  });

  it('should initialize red, green, and blue to 0', () => {
    expect(game.getRed()).toBe(0);
    expect(game.getGreen()).toBe(0);
    expect(game.getBlue()).toBe(0);
  });

  it('should update red, green, and blue correctly', () => {
    // Act
    game.update(10, 20, 30);

    // Assert
    expect(game.getRed()).toBe(10);
    expect(game.getGreen()).toBe(20);
    expect(game.getBlue()).toBe(30);
  });

  it('should only update to the maximum values for red, green, and blue', () => {
    // Arrange
    game.update(10, 20, 30);

    // Act
    game.update(5, 25, 15);

    // Assert
    expect(game.getRed()).toBe(10);
    expect(game.getGreen()).toBe(25);
    expect(game.getBlue()).toBe(30);
  });

  it('should calculate power correctly', () => {
    // Arrange
    game.update(2, 3, 4);

    // Act
    const power = game.getPower();

    // Assert
    expect(power).toBe(24); // 2 * 3 * 4 = 24
  });

  it('should return a power of 0 if any color value is 0', () => {
    // Arrange
    game.update(0, 5, 6);

    // Act
    const power = game.getPower();

    // Assert
    expect(power).toBe(0); // 0 * 5 * 6 = 0
  });
});
