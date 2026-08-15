import { year2019day13 } from '../day13';

describe('2019 day13', () => {
  let instance: year2019day13;

  beforeEach(() => {
    instance = new year2019day13();
  });

  describe('part1', () => {
    it('counts block tiles from the output triples, per the official example (1,2,3 = paddle, 6,5,4 = ball)', async () => {
      const program = '104,1,104,2,104,3,104,6,104,5,104,4,104,0,104,0,104,2,99';
      instance.input = [program];
      instance.preChallenge();
      expect(await instance.part1()).toBe('1 block tiles');
    });
  });
});
