import { year2025day3 } from "../day3";

describe('2025 day 3', () => {
    let instance: year2025day3;
    const input: string[] = ['987654321111111','811111111111119','234234234234278','818181911112111'];

    beforeEach(() => {
        instance = new year2025day3();
        instance.input = input;
    })
    
    describe('Challenges', () => {
        it('part 1 should calculate total output joltage', () => {
            // Act
            const result = instance.part1();

            // Assert
            expect(result).toBe('Total joltage of the banks: 357')
        })
        
        it('part 2 should calculate total output joltage', () => {
            // Act
            const result = instance.part2();

            // Assert
            expect(result).toBe('Total joltage of the banks: 3121910778619')
        })
    })

    describe('findMaxJoltage', () => {
        [
            {bank: '987654321111111', max: 98, max12: 987654321111},
            {bank: '811111111111119', max: 89, max12: 811111111119},
            {bank: '234234234234278', max: 78, max12: 434234234278},
            {bank: '818181911112111', max: 92, max12: 888911112111}
        ].forEach(({bank, max, max12}) => {
            it(`should get max joltage of ${max} from ${bank} when turning on 2 digits`, () => {
                // Act
                const result = instance.findMaxJoltage(bank, 2);

                // Assert
                expect(result).toBe(max);
            })
            it(`should get max joltage of ${max12} from ${bank} when turning on 12 digits`, () => {
                // Act
                const result = instance.findMaxJoltage(bank, 12);

                // Assert
                expect(result).toBe(max12);
            })
        })
    })
})