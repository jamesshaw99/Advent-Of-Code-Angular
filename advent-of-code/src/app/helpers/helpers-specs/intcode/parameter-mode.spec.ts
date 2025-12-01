import {
  ParameterMode,
  ParameterModeHelper,
} from '../../intcode/parameter-mode';

describe('ParameterMode', () => {
  describe('Parameter Mode Helper', () => {
    it('should extract correct modes from raw opcode', () => {
      // Act
      const modes = ParameterModeHelper.modesFromRaw(1002);

      // Assert
      expect(modes[0]).toBe(ParameterMode.POSITION);
      expect(modes[1]).toBe(ParameterMode.IMMEDIATE);
      expect(modes[2]).toBe(ParameterMode.POSITION);
    });

    it('should handle opcode with no parameter modes', () => {
      // Act
      const modes = ParameterModeHelper.modesFromRaw(2);

      //Assert
      expect(modes[0]).toBe(ParameterMode.POSITION);
      expect(modes[1]).toBe(ParameterMode.POSITION);
      expect(modes[2]).toBe(ParameterMode.POSITION);
    });

    it('should handle opcode with relative mode', () => {
      // Act
      const modes = ParameterModeHelper.modesFromRaw(22102);
      // Assert
      expect(modes[0]).toBe(ParameterMode.IMMEDIATE);
      expect(modes[1]).toBe(ParameterMode.RELATIVE);
      expect(modes[2]).toBe(ParameterMode.RELATIVE);
    });
  });
});
