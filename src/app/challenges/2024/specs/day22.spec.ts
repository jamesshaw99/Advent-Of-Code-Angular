import { year2024day22 } from '../day22';

describe('2024 day22', () => {
  let instance: year2024day22;

  beforeEach(() => {
    instance = new year2024day22();
  });

  describe('preChallenge', () => {
    it('should parse the initial secret numbers as bigints', () => {
      // Arrange
      instance.input = ['1', '10', '100', '2024'];

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.initialSecrets).toEqual([1n, 10n, 100n, 2024n]);
    });
  });

  describe('nextSecret', () => {
    it('should generate the first ten secrets from an initial secret of 123', () => {
      // Arrange
      const expectedSecrets = [
        15887950n, 16495136n, 527345n, 704524n, 1553684n,
        12683156n, 11100544n, 12249484n, 7753432n, 5908254n,
      ];

      // Act
      let secret = 123n;
      const actualSecrets: bigint[] = [];
      for (let i = 0; i < 10; i++) {
        secret = instance.nextSecret(secret);
        actualSecrets.push(secret);
      }

      // Assert
      expect(actualSecrets).toEqual(expectedSecrets);
    });
  });

  describe('generateSecret', () => {
    it('should compute the 2000th secret number for each sample buyer', () => {
      // Act & Assert
      expect(instance.generateSecret(1n, 2000)).toBe(8685429n);
      expect(instance.generateSecret(10n, 2000)).toBe(4700978n);
      expect(instance.generateSecret(100n, 2000)).toBe(15273692n);
      expect(instance.generateSecret(2024n, 2000)).toBe(8667524n);
    });
  });

  describe('challenges', () => {
    it('should sum the 2000th secret numbers across all buyers in part1', () => {
      // Arrange
      instance.input = ['1', '10', '100', '2024'];
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Sum of the 2000th secret numbers: 37327623');
    });

    it('should find the most bananas obtainable with a single change sequence in part2', () => {
      // Arrange
      instance.input = ['1', '2', '3', '2024'];
      instance.preChallenge();

      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Most bananas obtainable: 23');
    });
  });

  describe('computePrices', () => {
    it('should compute the ones-digit price for the initial secret and each generated secret', () => {
      // Act
      const result = instance.computePrices(123n, 9);

      // Assert
      expect(result).toEqual([3, 0, 6, 5, 4, 4, 6, 4, 4, 2]);
    });
  });

  describe('findMostBananas', () => {
    it('should find the sequence of four price changes that maximizes total bananas', () => {
      // Arrange
      instance.input = ['1', '2', '3', '2024'];
      instance.preChallenge();

      // Act
      const result = instance.findMostBananas();

      // Assert
      expect(result).toBe(23);
    });
  });
});
