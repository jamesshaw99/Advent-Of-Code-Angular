import { year2020day21 } from '../day21';

describe('2020 day21', () => {
  let instance: year2020day21;

  beforeEach(() => {
    instance = new year2020day21();
    instance.input = [
      'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
      'trh fvjkl sbzzf mxmxvkd (contains dairy)',
      'sqjhc fvjkl (contains soy)',
      'sqjhc mxmxvkd sbzzf (contains fish)',
    ];
    instance.preChallenge();
  });

  describe('part1', () => {
    it('counts appearances of ingredients that cannot contain any allergen', () => {
      expect(instance.part1()).toBe('Number of safe ingredients: 5');
    });
  });

  describe('part2', () => {
    it('produces the canonical dangerous ingredient list sorted by allergen', () => {
      expect(instance.part2()).toBe('Dangerous ingredients: mxmxvkd,sqjhc,fvjkl');
    });
  });
});
