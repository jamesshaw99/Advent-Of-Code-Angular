import { year2025day2 } from '../day2';

describe('2025 day 2', () => {
  let instance: year2025day2;
  const input: string[] = [
    '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
  ];

  beforeEach(() => {
    instance = new year2025day2();
    instance.input = input;
    instance.preChallenge();
  });

  describe('PreChallenge', () => {
    it('should split input into string array of ranges', () => {
      // Arrange
      const expected = [
        '11-22',
        '95-115',
        '998-1012',
        '1188511880-1188511890',
        '222220-222224',
        '1698522-1698528',
        '446443-446449',
        '38593856-38593862',
        '565653-565659',
        '824824821-824824827',
        '2121212118-2121212124',
      ];

      // Assert
      expect(instance.ranges).toEqual(expected);
    });
  });

  describe('Challenges', () => {
    describe('Part 1', () => {
      it('should identify and add all invalid IDs', () => {
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('Total of invalid IDs: 1227775554');
      });
    });

    describe('Part 2', () => {
      it('should identify and add all invalid IDs', () => {
        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('Total of invalid IDs: 4174379265');
      });
    });
  });

  describe('hasRepeatingPattern', () => {
    describe('for exactly 2 repetitions', () => {
      [
        { value: 55, repeating: true },
        { value: 6464, repeating: true },
        { value: 123123, repeating: true },
        { value: 1231234, repeating: false },
        { value: 1234, repeating: false },
        { value: 8512312345, repeating: false },
        { value: 123123123, repeating: false },
      ].forEach(({ value, repeating }) => {
        it(`should return ${repeating} for value ${value}`, () => {
          // Act
          const result = instance.hasRepeatingPattern(value, true);

          // Assert
          expect(result).toBe(repeating);
        });
      });
    });

    describe('for multiple repetitions', () => {
      [
        { value: 55, repeating: true },
        { value: 6464, repeating: true },
        { value: 123123, repeating: true },
        { value: 1231234, repeating: false },
        { value: 1234, repeating: false },
        { value: 8512312345, repeating: false },
        { value: 123123123, repeating: true },
      ].forEach(({ value, repeating }) => {
        it(`should return ${repeating} for value ${value}`, () => {
          // Act
          const result = instance.hasRepeatingPattern(value, false);

          // Assert
          expect(result).toBe(repeating);
        });
      });
    });
  });
});
