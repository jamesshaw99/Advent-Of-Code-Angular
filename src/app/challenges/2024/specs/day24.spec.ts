import { year2024day24 } from '../day24';

describe('2024 day24', () => {
  let instance: year2024day24;

  const smallInput: string[] = [
    'x00: 1',
    'x01: 1',
    'x02: 1',
    'y00: 0',
    'y01: 1',
    'y02: 0',
    '',
    'x00 AND y00 -> z00',
    'x01 XOR y01 -> z01',
    'x02 OR y02 -> z02',
  ];

  const largeInput: string[] = [
    'x00: 1',
    'x01: 0',
    'x02: 1',
    'x03: 1',
    'x04: 0',
    'y00: 1',
    'y01: 1',
    'y02: 1',
    'y03: 1',
    'y04: 1',
    '',
    'ntg XOR fgs -> mjb',
    'y02 OR x01 -> tnw',
    'kwq OR kpj -> z05',
    'x00 OR x03 -> fst',
    'tgd XOR rvg -> z01',
    'vdt OR tnw -> bfw',
    'bfw AND frj -> z10',
    'ffh OR nrd -> bqk',
    'y00 AND y03 -> djm',
    'y03 OR y00 -> psh',
    'bqk OR frj -> z08',
    'tnw OR fst -> frj',
    'gnj AND tgd -> z11',
    'bfw XOR mjb -> z00',
    'x03 OR x00 -> vdt',
    'gnj AND wpb -> z02',
    'x04 AND y00 -> kjc',
    'djm OR pbm -> qhw',
    'nrd AND vdt -> hwm',
    'kjc AND fst -> rvg',
    'y04 OR y02 -> fgs',
    'y01 AND x02 -> pbm',
    'ntg OR kjc -> kwq',
    'psh XOR fgs -> tgd',
    'qhw XOR tgd -> z09',
    'pbm OR djm -> kpj',
    'x03 XOR y03 -> ffh',
    'x00 XOR y04 -> ntg',
    'bfw OR bqk -> z06',
    'nrd XOR fgs -> wpb',
    'frj XOR qhw -> z04',
    'bqk OR frj -> z07',
    'y03 OR x01 -> nrd',
    'hwm AND bqk -> z03',
    'tgd XOR rvg -> z12',
    'tnw OR pbm -> gnj',
  ];

  beforeEach(() => {
    instance = new year2024day24();
  });

  describe('preChallenge', () => {
    it('should parse initial wire values and gate definitions', () => {
      // Arrange
      instance.input = smallInput;

      // Act
      instance.preChallenge();

      // Assert
      expect(instance.wires.get('x00')).toBe(1);
      expect(instance.wires.get('y01')).toBe(1);
      expect(instance.gatesByOutput.get('z01')).toEqual({
        a: 'x01',
        operator: 'XOR',
        b: 'y01',
        output: 'z01',
      });
    });
  });

  describe('challenges', () => {
    it('should compute the decimal value of the z-wires for the small sample in part1', () => {
      // Arrange
      instance.input = smallInput;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Decimal value on the z-wires: 4');
    });

    it('should compute the decimal value of the z-wires for the large sample in part1', () => {
      // Arrange
      instance.input = largeInput;
      instance.preChallenge();

      // Act
      const result = instance.part1();

      // Assert
      expect(result).toBe('Decimal value on the z-wires: 2024');
    });
  });

  describe('findSwappedWires', () => {
    it('should flag the two gates whose outputs were swapped in a well-formed ripple-carry adder', () => {
      // Arrange: a correct 3-bit ripple-carry adder, with the z01 and c2 (bit-1 carry) outputs swapped
      instance.input = [
        'x00: 0',
        'x01: 0',
        'x02: 0',
        'y00: 0',
        'y01: 0',
        'y02: 0',
        '',
        'x00 XOR y00 -> z00',
        'x00 AND y00 -> c1',
        'x01 XOR y01 -> s1',
        's1 XOR c1 -> c2',
        'x01 AND y01 -> a1',
        's1 AND c1 -> b1',
        'a1 OR b1 -> z01',
        'x02 XOR y02 -> s2',
        's2 XOR c2 -> z02',
        'x02 AND y02 -> a2',
        's2 AND c2 -> b2',
        'a2 OR b2 -> z03',
      ];
      instance.preChallenge();

      // Act
      const result = instance.findSwappedWires();

      // Assert
      expect(result).toEqual(['c2', 'z01']);
    });

    it('should flag nothing in a correctly-wired ripple-carry adder', () => {
      // Arrange: the same adder as above, without the swap
      instance.input = [
        'x00: 0',
        'x01: 0',
        'x02: 0',
        'y00: 0',
        'y01: 0',
        'y02: 0',
        '',
        'x00 XOR y00 -> z00',
        'x00 AND y00 -> c1',
        'x01 XOR y01 -> s1',
        's1 XOR c1 -> z01',
        'x01 AND y01 -> a1',
        's1 AND c1 -> b1',
        'a1 OR b1 -> c2',
        'x02 XOR y02 -> s2',
        's2 XOR c2 -> z02',
        'x02 AND y02 -> a2',
        's2 AND c2 -> b2',
        'a2 OR b2 -> z03',
      ];
      instance.preChallenge();

      // Act
      const result = instance.findSwappedWires();

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getValue', () => {
    beforeEach(() => {
      instance.input = smallInput;
      instance.preChallenge();
    });

    it('should recursively resolve a gate output from its input wires', () => {
      // Act & Assert
      expect(instance.getValue('z00')).toBe(0);
      expect(instance.getValue('z01')).toBe(0);
      expect(instance.getValue('z02')).toBe(1);
    });
  });
});
