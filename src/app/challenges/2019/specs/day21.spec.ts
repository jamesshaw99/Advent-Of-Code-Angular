import { year2019day21 } from '../day21';

describe('2019 day21', () => {
  let instance: year2019day21;

  beforeEach(() => {
    instance = new year2019day21();

    const echoInputCount = '3,201,1006,201,12,1001,200,1,200,1105,1,0,4,200,99';
    instance.input = [echoInputCount];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('feeds the full WALK springscript (51 characters) to the droid', async () => {
      expect(await instance.part1()).toBe('Hull Damage: 51');
    });
  });

  describe('part2', () => {
    it('feeds the full RUN springscript (81 characters) to the droid', async () => {
      expect(await instance.part2()).toBe('Hull Damage: 81');
    });
  });
});
