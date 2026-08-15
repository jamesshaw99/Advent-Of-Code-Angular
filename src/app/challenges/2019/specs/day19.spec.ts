import { year2019day19 } from '../day19';

describe('2019 day19', () => {
  let instance: year2019day19;

  beforeEach(() => {
    instance = new year2019day19();
    
    const program = [
      '3,100,3,101,1002,100,2,102,7,102,101,103,1002,103,-1,104',
      '101,1,104,105,7,101,100,106,1002,106,-1,107,101,1,107,108',
      '2,105,108,109,4,109,99'
    ].join(',');

    instance.input = [program];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts affected points in the 50x50 grid', async () => {
      expect(await instance.part1()).toBe('Total Affected Points: 650');
    });
  });

  describe('part2', () => {
    it('finds the closest position where a 100x100 square fits in the beam', async () => {
      expect(await instance.part2()).toBe('Result: 1980297');
    });
  });
});
