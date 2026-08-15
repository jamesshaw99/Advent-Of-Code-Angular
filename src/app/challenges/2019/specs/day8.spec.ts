import { year2019day8 } from '../day8';

describe('2019 day8', () => {
  let instance: year2019day8;

  beforeEach(() => {
    instance = new year2019day8();
  });

  describe('part1', () => {
    it('finds the layer with fewest 0 digits and multiplies its 1s by its 2s', () => {
      instance.layerWidth = 3;
      instance.layerHeight = 2;
      instance.input = ['123456789012'];
      instance.preChallenge();
      expect(instance.part1()).toBe('Checksum (1s * 2s on layer with fewest 0s): 1');
    });
  });

  describe('part2', () => {
    it('stacks layers by transparency and renders the final image', () => {
      instance.layerWidth = 2;
      instance.layerHeight = 2;
      instance.input = ['0222112222120000'];
      instance.preChallenge();
      expect(instance.part2()).toBe('Rendered image:\n.#\n#.');
    });
  });
});
