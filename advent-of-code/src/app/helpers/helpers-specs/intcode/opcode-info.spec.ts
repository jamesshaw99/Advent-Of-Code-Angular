import { OpcodeInfo } from '../../intcode/opcode-info';
import { Opcode } from '../../intcode/opcode';

describe('OpcodeInfo', () => {
  describe('recognise', () => {
    it('should recognize a valid opcode', () => {
      // Arrange
      const validOpcodes = [1, 2, 99];
      const expectedResults = [OpcodeInfo.ADD, OpcodeInfo.MULTIPLY, OpcodeInfo.END];

      // Act & Assert
      validOpcodes.forEach((opcode, index) => {
        expect(OpcodeInfo.recognise(opcode)).toBe(expectedResults[index]);
      });
    });

    it('should recognize parameter modes', () => {
      // Arrange
      const multiplyWithModes = 1002;
      const addWithModes = 11101;

      // Act & Assert
      expect(OpcodeInfo.recognise(multiplyWithModes)).toBe(OpcodeInfo.MULTIPLY);
      expect(OpcodeInfo.recognise(addWithModes)).toBe(OpcodeInfo.ADD);
    });

    it('should throw error for invalid opcode', () => {
      // Arrange
      const invalidOpcode = 98;

      // Act & Assert
      expect(() => OpcodeInfo.recognise(invalidOpcode))
        .toThrow(new Error('Unable to recognise: 98'));
    });
  });

  describe('getters', () => {
    it('should return correct opcode number', () => {
      expect(OpcodeInfo.ADD.getOpcode()).toBe(1);
      expect(OpcodeInfo.MULTIPLY.getOpcode()).toBe(2);
      expect(OpcodeInfo.END.getOpcode()).toBe(99);
    });

    it('should return correct args amount', () => {
      expect(OpcodeInfo.ADD.getArgsAmount()).toBe(3);
      expect(OpcodeInfo.INPUT.getArgsAmount()).toBe(1);
      expect(OpcodeInfo.END.getArgsAmount()).toBe(0);
    });
  });

  describe('setOpcodeClass', () => {
    class MockOpcode extends Opcode {
      override async run(): Promise<void> {
        // Mock implementation
      }
    }

    it('should set opcode class', () => {
      const mockOpcode = new MockOpcode();
      OpcodeInfo.setOpcodeClass(OpcodeInfo.ADD, mockOpcode);
      expect(OpcodeInfo.ADD.getOpcodeClass()).toBe(mockOpcode);
    });
  });
});
