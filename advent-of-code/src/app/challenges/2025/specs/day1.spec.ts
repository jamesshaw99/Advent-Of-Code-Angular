import { year2025day1 } from '../day1';

describe('2025 day 1', () => {
  let instance: year2025day1;
  const input: string[] = [
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ];

  beforeEach(() => {
    instance = new year2025day1();
    instance.input = input;
  });

  describe('challenges', () => {
    it('should calculate password correctly in part 1', () => {
      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Password to open the door is 3');
    });

    it('should calculate password correctly in part 2', () => {
      // Act
      const result = instance.part2();

      // Assert
      expect(result).toBe('Password to open the door is 6');
    });
  });

  describe('parseInstruction', () => {
    [
      { input: 'L10', direction: 'L', value: 10 },
      { input: 'R542', direction: 'R', value: 542 },
    ].forEach(({ input, direction, value }) => {
      it(`should return direction and value for input ${input}`, () => {
        // Act
        const result = instance.parseInstruction(input);

        // Assert
        expect(result.direction).toBe(direction);
        expect(result.value).toBe(value);
      });
    });
  });

  describe('applyMove', () => {
    it(`should add value to position when direction is 'R'`, () => {
      // Act
      const result = instance.applyMove(50, 'R', 20);

      // Assert
      expect(result).toBe(70);
    });

    it(`should subtract value to position when direction is 'L'`, () => {
      // Act
      const result = instance.applyMove(50, 'L', 20);

      // Assert
      expect(result).toBe(30);
    });
  });

  describe('normalisePosition', () => {
    it('should loop large values back into the accepted range', () => {
      // Act
      const result = instance.normalizePosition(1085);

      // Assert
      expect(result).toBe(85);
    });

    it('should loop negative values back into the accepted range', () => {
      // Act
      const result = instance.normalizePosition(-1085);

      // Assert
      expect(result).toBe(15);
    });
  });

  describe('countWrapsAndNormalize', () => {
    it('should not count a wrap when moving within range', () => {
      // Act
      const result = instance.countWrapsAndNormalize(50, 30);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(50);
    });

    it('should count one wrap when going from 95 to 155 (wrapping forward once)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(155, 95);

      // Assert
      expect(result.wrapCount).toBe(1);
      expect(result.normalizedPosition).toBe(55);
    });

    it('should count one wrap when going from 50 to -18 (wrapping backward once)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-18, 50);

      // Assert
      expect(result.wrapCount).toBe(1);
      expect(result.normalizedPosition).toBe(82);
    });

    it('should not count a wrap when starting at 0 and going negative', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-5, 0);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(95);
    });

    it('should not count a wrap when landing exactly on 100 (position normalizes to 0)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(100, 52);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should count one wrap when landing exactly on 200 (position normalizes to 0)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(200, 50);

      // Assert
      expect(result.wrapCount).toBe(1);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should count multiple wraps when going far forward', () => {
      // Act
      const result = instance.countWrapsAndNormalize(350, 10);

      // Assert
      expect(result.wrapCount).toBe(3);
      expect(result.normalizedPosition).toBe(50);
    });

    it('should count multiple wraps when going far backward', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-250, 20);

      // Assert
      expect(result.wrapCount).toBe(3);
      expect(result.normalizedPosition).toBe(50);
    });

    it('should handle landing on exact negative multiple of 100', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-100, 50);

      // Assert
      expect(result.wrapCount).toBe(1);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should handle landing on exact negative multiple of 100 with multiple wraps', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-200, 50);

      // Assert
      expect(result.wrapCount).toBe(2);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should not count a wrap when position stays at 0', () => {
      // Act
      const result = instance.countWrapsAndNormalize(0, 0);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should handle moving from 0 to positive values within range', () => {
      // Act
      const result = instance.countWrapsAndNormalize(14, 0);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(14);
    });

    it('should handle the example case: position 99 to 0 (L99)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(0, 99);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(0);
    });

    it('should handle the example case: position 0 to 99 (L1)', () => {
      // Act
      const result = instance.countWrapsAndNormalize(-1, 0);

      // Assert
      expect(result.wrapCount).toBe(0);
      expect(result.normalizedPosition).toBe(99);
    });
  });
});
