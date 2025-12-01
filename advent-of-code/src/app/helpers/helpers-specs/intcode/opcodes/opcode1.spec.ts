import { OpcodeInfo } from "../../../intcode/opcode-info";
import { Opcode1 } from "../../../intcode/opcodes/opcode1";
import { ParameterModeHelper } from "../../../intcode/parameter-mode";
import { ProgramExecutor } from "../../../intcode/program-executor";

describe('Opcode1', () => {
  let opcode: Opcode1;
  let mockExecutor: jasmine.SpyObj<ProgramExecutor>;

  beforeEach(() => {
    opcode = new Opcode1();
    
    mockExecutor = jasmine.createSpyObj('ProgramExecutor', [
      'getAtPointerAndIncrement',
      'set',
      'get',
      'getWriteAddress'
    ]);
  });

  describe('run', () => {
    it('should execute addition with position mode parameters', async () => {
      // Arrange
      const rawCode = 1; // ADD opcode with position mode (00001)
      const arg1 = 5; // position of first operand
      const arg2 = 6; // position of second operand  
      const arg3 = 7; // position to store result
      const value1 = 10;
      const value2 = 20;
      const expectedSum = 30;
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
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, expectedSum);
    });

    it('should execute addition with immediate mode parameters', async () => {
      // Arrange
      const rawCode = 1101; // ADD opcode with immediate mode for params 1&2 (01101)
      const arg1 = 10; // immediate value
      const arg2 = 20; // immediate value
      const arg3 = 7;  // position to store result
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
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, 30);
    });

    it('should execute addition with mixed parameter modes', async () => {
      // Arrange
      const rawCode = 1001; // ADD opcode with immediate mode for param 1, position for param 2
      const arg1 = 15; // immediate value
      const arg2 = 8;  // position of second operand
      const arg3 = 9;  // position to store result
      const value2 = 25; // value at position 8
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
      expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, 40); // 15 + 25
    });

    it('should handle zero values correctly', async () => {
      // Arrange
      const rawCode = 1;
      const args = [0, 0, 0];
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(0, 0);
      mockExecutor.getWriteAddress.and.returnValue(0);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(0, 0); // 0 + 0 = 0
    });

    it('should handle negative numbers correctly', async () => {
      // Arrange
      const rawCode = 1;
      const args = [5, 6, 7];
      const value1 = -10;
      const value2 = 15;
      const expectedSum = 5;
      
      mockExecutor.getAtPointerAndIncrement.and.returnValues(rawCode, ...args);
      mockExecutor.get.and.returnValues(value1, value2);
      mockExecutor.getWriteAddress.and.returnValue(7);
      
      spyOn(ParameterModeHelper, 'modesFromRaw').and.returnValue([0, 0, 0]);
      spyOn(opcode, 'getOpcodeInfo').and.returnValue({ getArgsAmount: () => 3 } as OpcodeInfo);

      // Act
      await opcode.run(mockExecutor);

      // Assert
      expect(mockExecutor.set).toHaveBeenCalledWith(7, expectedSum);
    });

    it('should call getOpcodeInfo to determine argument count', async () => {
      // Arrange
      const rawCode = 1;
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
    it('should return ADD opcode info', () => {
      // Act
      const result = opcode.getOpcodeInfo();

      // Assert
      expect(result).toBe(OpcodeInfo.ADD);
    });
  });
});