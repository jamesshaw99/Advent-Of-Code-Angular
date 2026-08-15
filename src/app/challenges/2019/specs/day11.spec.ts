import { year2019day11 } from '../day11';

describe('2019 day11', () => {
  let instance: year2019day11;

  beforeEach(() => {
    instance = new year2019day11();

    const program = [
      '3,1000,104,1,104,0',
      '3,1000,104,0,104,0',
      '3,1000,104,1,104,0',
      '3,1000,104,1,104,0',
      '3,1000,104,0,104,1',
      '3,1000,104,1,104,0',
      '3,1000,104,1,104,0',
      '99'
    ].join(',');

    instance.input = [program];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('paints 6 panels at least once', async () => {
      expect(await instance.part1()).toBe('Painted 6 squares');
    });
  });
});
