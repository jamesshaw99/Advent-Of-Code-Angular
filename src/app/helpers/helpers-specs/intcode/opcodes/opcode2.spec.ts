import { OpcodeInfo } from "../../../intcode/opcode-info";
import { Opcode2 } from "../../../intcode/opcodes/opcode2";
import { ParameterModeHelper } from "../../../intcode/parameter-mode";
import { ProgramExecutor } from "../../../intcode/program-executor";

describe('Opcode2', () => {
  let opcode: Opcode2;
  let mockExecutor: jasmine.SpyObj<ProgramExecutor>;

  beforeEach(() => {
    opcode = new Opcode2();
    
    mockExecutor = jasmine.createSpyObj('ProgramExecutor', [
      'getAtPointerAndIncrement',
      'set',
      'get',
      'getWriteAddress'
    ]);
  });

  describe('run', () => {
    it('should execute multiplication with position mode parameters', async () => {
      // Arrange
      const rawCode = 2; // MULTIPLY opcode with position mode (00002)
      const arg1 = 5; // position of first operand
      const arg2 = 6; // position of second operand  
      const arg3 = 7; // position to store result
      const value1 = 10;
      const value2 = 20;
      const expectedProduct = 200;
      const writeAddress = 7;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, arg1, arg2, arg3);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(writeAddress);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]); // position modes
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.getAtPointerAndIncrement).toHaveBeenCalledTimes(4); // rawCode + 3 args
      expect(ParameterModeHelper.modesFromRaw).toHaveBeenCalledWith(rawCode);
      expect(mockExecutor.get).toHaveBeenCalledWith(0, arg1); // first operand
      expect(mockExecutor.get).toHaveBeenCalledWith(0, arg2); // second operand
      expect(mockExecutor.getWriteAddress).toHaveBeenCalledWith(0, arg3);
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, expectedProduct);
    });

    it('should execute multiplication with immediate mode parameters', async () => {
      // Arrange
      const rawCode = 1102; // MULTIPLY opcode with immediate mode for params 1&2 (01102)
      const arg1 = 5; // immediate value
      const arg2 = 4; // immediate value
      const arg3 = 7; // position to store result
      const writeAddress = 7;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, arg1, arg2, arg3);
      mockExecutor.get.and.returnValues(arg1, arg2); // immediate mode returns the values directly
      mockExecutor.getWriteAddress.and.returnValue(writeAddress);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([1, 1, 0]); // immediate, immediate, position
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.get).toHaveBeenCalledWith(1, arg1); // immediate mode
      expect(mockExecutor.get).toHaveBeenCalledWith(1, arg2); // immediate mode
      expect(mockExecutor.getWriteAddress).toHaveBeenCalledWith(0, arg3); // position mode for write
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, 20); // 5 * 4
    });

    it('should execute multiplication with mixed parameter modes', async () => {
      // Arrange
      const rawCode = 1002; // MULTIPLY opcode with immediate mode for param 1, position for param 2
      const arg1 = 6; // immediate value
      const arg2 = 8; // position of second operand
      const arg3 = 9; // position to store result
      const value2 = 7; // value at position 8
      const writeAddress = 9;

      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, arg1, arg2, arg3);
      mockExecutor.get.and.returnValues(arg1, value2); // immediate returns arg1, position returns value2
      mockExecutor.getWriteAddress.and.returnValue(writeAddress);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([1, 0, 0]); // immediate, position, position
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.get).toHaveBeenCalledWith(1, arg1); // immediate mode
      expect(mockExecutor.get).toHaveBeenCalledWith(0, arg2); // position mode
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, 42); // 6 * 7
    });

    it('should handle zero multiplication correctly', async () => {
      // Arrange
      const rawCode = 2;
      const args = [5, 6, 7];
      const value1 = 0;
      const value2 = 100;
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(7);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(7, 0); // 0 * 100 = 0
    });

    it('should handle negative number multiplication correctly', async () => {
      // Arrange
      const rawCode = 2;
      const args = [5, 6, 7];
      const value1 = -10;
      const value2 = 5;
      const expectedProduct = -50;
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(7);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(7, expectedProduct);
    });

    it('should handle multiplication by one correctly', async () => {
      // Arrange
      const rawCode = 2;
      const args = [5, 6, 7];
      const value1 = 42;
      const value2 = 1;
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(7);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(7, 42); // 42 * 1 = 42
    });

    it('should handle large number multiplication', async () => {
      // Arrange
      const rawCode = 2;
      const args = [5, 6, 7];
      const value1 = 999;
      const value2 = 1000;
      const expectedProduct = 999000;
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(7);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(7, expectedProduct);
    });

    it('should call getOpcodeInfo to determine argument count', async () => {
      // Arrange
      const rawCode = 2;
      const mockOpcodeInfo = jasmine.createSpyObj('OpcodeInfo', ['getArgsAmount']);
      mockOpcodeInfo.getArgsAmount.and.returnValue(3);
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, 1, 2, 3);
      mockExecutor.get.and.returnValues(10, 20);
      mockExecutor.getWriteAddress.and.returnValue(3);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue(mockOpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(opcode.getOpcodeInfo).toHaveBeenCalled();
      expect(mockOpcodeInfo.getArgsAmount).toHaveBeenCalled();
    });
  });

  describe('getOpcodeInfo', () => {
    it('should return MULTIPLY opcode info', () => {
      // Act
      const result = opcode.getOpcodeInfo();

      // Assert
      expect(result).toBe(OpcodeInfo.MULTIPLY);
    });
  });
});