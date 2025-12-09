import { year2025day8 } from '../day8';

fdescribe('2025 day 8', () => {
  let instance: year2025day8;
  const input: string[] = [
    '162,817,812',
    '57,618,57',
    '906,360,560',
    '592,479,940',
    '352,342,300',
    '466,668,158',
    '542,29,236',
    '431,825,988',
    '739,650,466',
    '52,470,668',
    '216,146,977',
    '819,987,18',
    '117,168,530',
    '805,96,715',
    '346,949,466',
    '970,615,88',
    '941,993,340',
    '862,61,35',
    '984,92,344',
    '425,690,689',
  ];

  beforeEach(() => {
    instance = new year2025day8();
    instance.input = input;
    instance.preChallenge();
  });

  describe('Challenges', () => {
    it('Part 1 should calculate circuits and multiply the three largest', () => {
        // Assert
        instance.connectionsToMake = 10;
        
        // Act
        const result = instance.part1();

        // Assert
        expect(result).toBe('The product of the three largest circuits is 40')
    });

    it('Part 2 should calculate the full circuit and multiply x coords', () => {
        // Act
        const result = instance.part2();

        // Assert
        expect(result).toBe('The product of the x coordinates of the last two boxes is 25272')
    })
  })
});
