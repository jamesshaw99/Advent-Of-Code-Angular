import { year2019day3 } from '../day3';

describe('2019 day3', () => {
  let instance: year2019day3;

  beforeEach(() => {
    instance = new year2019day3();
  });

  it('finds distance and steps for the small diagram example', () => {
    instance.input = ['R8,U5,L5,D3', 'U7,R6,D4,L4'];
    instance.preChallenge();
    expect(instance.part1()).toBe('Distance from central port to closest intersection: 6');
    expect(instance.part2()).toBe('Fewest combined steps: 30');
  });

  it('finds distance and steps for the first larger example', () => {
    instance.input = ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'];
    instance.preChallenge();
    expect(instance.part1()).toBe('Distance from central port to closest intersection: 159');
    expect(instance.part2()).toBe('Fewest combined steps: 610');
  });

  it('finds distance and steps for the second larger example', () => {
    instance.input = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'];
    instance.preChallenge();
    expect(instance.part1()).toBe('Distance from central port to closest intersection: 135');
    expect(instance.part2()).toBe('Fewest combined steps: 410');
  });
});
