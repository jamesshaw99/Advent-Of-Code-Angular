import { IO } from '../../../intcode/io';
import { OpcodeInfo } from '../../../intcode/opcode-info';
import { Opcode4 } from '../../../intcode/opcodes/opcode4';
import { ParameterModeHelper } from '../../../intcode/parameter-mode';
import { ProgramExecutor } from '../../../intcode/program-executor';

describe('Opcode4', () => {
  let opcode: Opcode4;
  let mockExecutor: jasmine.SpyObj<ProgramExecutor>;
  let mockIo: jasmine.SpyObj<IO>;

  beforeEach(() => {
    opcode = new Opcode4();

    mockIo = jasmine.createSpyObj('IO', ['out']);

    mockExecutor = jasmine.createSpyObj('ProgramExecutor', [
      'getAtPointerAndIncrement',
      'get',
      'getIo',
    ]);

    mockExecutor.getIo.and.returnValue(mockIo);
  });

  describe('run', () => {
    it('should output value in position mode', async () => {
      // Arrange
      const rawCode = 4; // OUTPUT opcode with position mode (00004)
      const argument = 5; // position to read from
      const valueAtPosition = 42;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(valueAtPosition);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]); // position mode

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.getAtPointerAndIncrement).toHaveBeenCalledTimes(2); // rawCode + argument
      expect(ParameterModeHelper.modesFromRaw).toHaveBeenCalledWith(rawCode);
      expect(mockExecutor.get).toHaveBeenCalledWith(0, argument);
      expect(mockExecutor.getIo).toHaveBeenCalled();
      expect(mockIo.out).toHaveBeenCalledWith(valueAtPosition);
    });

    it('should output value in immediate mode', async () => {
      // Arrange
      const rawCode = 104; // OUTPUT opcode with immediate mode (00104)
      const argument = 99; // immediate value to output
      const immediateValue = 99;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(immediateValue);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([1]); // immediate mode

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.getAtPointerAndIncrement).toHaveBeenCalledTimes(2);
      expect(ParameterModeHelper.modesFromRaw).toHaveBeenCalledWith(rawCode);
      expect(mockExecutor.get).toHaveBeenCalledWith(1, argument);
      expect(mockIo.out).toHaveBeenCalledWith(immediateValue);
    });

    it('should handle zero output value', async () => {
      // Arrange
      const rawCode = 4;
      const argument = 0;
      const outputValue = 0;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockIo.out).toHaveBeenCalledWith(0);
    });

    it('should handle negative output value', async () => {
      // Arrange
      const rawCode = 4;
      const argument = 7;
      const outputValue = -456;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockIo.out).toHaveBeenCalledWith(outputValue);
    });

    it('should handle large output values', async () => {
      // Arrange
      const rawCode = 4;
      const argument = 15;
      const outputValue = 1234567;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockIo.out).toHaveBeenCalledWith(outputValue);
    });

    it('should call output method synchronously', async () => {
      // Arrange
      const rawCode = 4;
      const argument = 8;
      const outputValue = 77;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockIo.out).toHaveBeenCalledWith(outputValue);
    });

    it('should handle output errors if thrown synchronously', async () => {
      // Arrange
      const rawCode = 4;
      const argument = 5;
      const outputValue = 123;
      const error = new Error('Output error');

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);
      mockIo.out.and.throwError(error);

      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0]);

      // Act & Assert
      await expectAsync(opcode.run(mockExecutor)).toBeRejectedWith(error);
      expect(mockIo.out).toHaveBeenCalledWith(outputValue);
    });

    it('should only use the first parameter mode from modes array', async () => {
      // Arrange
      const rawCode = 104;
      const argument = 12;
      const outputValue = 88;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, argument);
      mockExecutor.get.and.returnValue(outputValue);

      // Return multiple modes but only first should be used
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([1, 0, 1]);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.get).toHaveBeenCalledWith(1, argument); // Only first mode used
    });
  });

  describe('getOpcodeInfo', () => {
    it('should return OUTPUT opcode info', () => {
      // Act
      const result = opcode.getOpcodeInfo();

      // Assert
      expect(result).toBe(OpcodeInfo.OUTPUT);
    });
  });
});
