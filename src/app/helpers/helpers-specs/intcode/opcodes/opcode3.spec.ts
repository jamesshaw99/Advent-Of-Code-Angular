import type { MockedObject } from "vitest";
import { IO } from "../../../intcode/io";
import { OpcodeInfo } from "../../../intcode/opcode-info";
import { Opcode3 } from "../../../intcode/opcodes/opcode3";
import { ParameterModeHelper } from "../../../intcode/parameter-mode";
import { ProgramExecutor } from "../../../intcode/program-executor";

describe('Opcode3', () => {
    let opcode: Opcode3;
    let mockExecutor: MockedObject<ProgramExecutor>;
    let mockIo: MockedObject<IO>;

    beforeEach(() => {
        opcode = new Opcode3();

        mockIo = {
            in: vi.fn().mockName("IO.in"),
            wouldBlockOnInput: vi.fn().mockName("IO.wouldBlockOnInput").mockReturnValue(false)
        } as unknown as MockedObject<IO>;

        mockExecutor = {
            getAtPointerAndIncrement: vi.fn().mockName("ProgramExecutor.getAtPointerAndIncrement"),
            set: vi.fn().mockName("ProgramExecutor.set"),
            getWriteAddress: vi.fn().mockName("ProgramExecutor.getWriteAddress"),
            getIo: vi.fn().mockName("ProgramExecutor.getIo"),
            pause: vi.fn().mockName("ProgramExecutor.pause")
        } as unknown as MockedObject<ProgramExecutor>;

        mockExecutor.getIo.mockReturnValue(mockIo);
    });

    describe('run', () => {
        it('should read input and store in position mode', async () => {
            // Arrange
            const rawCode = 3; // INPUT opcode with position mode (00003)
            const argument = 5; // position to store input
            const inputValue = 42;
            const writeAddress = 5;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);
            mockIo.in.mockResolvedValue(inputValue);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]); // position mode

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.getAtPointerAndIncrement).toHaveBeenCalledTimes(2); // rawCode + argument
            expect(ParameterModeHelper.modesFromRaw).toHaveBeenCalledWith(rawCode);
            expect(mockExecutor.getIo).toHaveBeenCalled();
            expect(mockIo.in).toHaveBeenCalled();
            expect(mockExecutor.getWriteAddress).toHaveBeenCalledWith(0, argument);
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, inputValue);
        });

        it('should read input and store in immediate mode', async () => {
            // Arrange
            const rawCode = 103; // INPUT opcode with immediate mode (00103)
            const argument = 10; // immediate address
            const inputValue = 99;
            const writeAddress = 10;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);
            mockIo.in.mockResolvedValue(inputValue);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([1]); // immediate mode

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.getAtPointerAndIncrement).toHaveBeenCalledTimes(2);
            expect(ParameterModeHelper.modesFromRaw).toHaveBeenCalledWith(rawCode);
            expect(mockExecutor.getWriteAddress).toHaveBeenCalledWith(1, argument);
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, inputValue);
        });

        it('should handle zero input value', async () => {
            // Arrange
            const rawCode = 3;
            const argument = 0;
            const inputValue = 0;
            const writeAddress = 0;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);
            mockIo.in.mockResolvedValue(inputValue);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]);

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, 0);
        });

        it('should handle negative input value', async () => {
            // Arrange
            const rawCode = 3;
            const argument = 7;
            const inputValue = -123;
            const writeAddress = 7;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);
            mockIo.in.mockResolvedValue(inputValue);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]);

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, inputValue);
        });

        it('should handle large input values', async () => {
            // Arrange
            const rawCode = 3;
            const argument = 15;
            const inputValue = 999999;
            const writeAddress = 15;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);
            mockIo.in.mockResolvedValue(inputValue);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]);

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, inputValue);
        });

        it('should wait for asynchronous input', async () => {
            // Arrange
            const rawCode = 3;
            const argument = 8;
            const inputValue = 77;
            const writeAddress = 8;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(writeAddress);

            // Simulate delayed input
            let resolveInput: (value: number) => void;
            const inputPromise = new Promise<number>((resolve) => {
                resolveInput = resolve;
            });
            mockIo.in.mockReturnValue(inputPromise);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]);

            // Act
            const runPromise = opcode.run(mockExecutor);

            // Verify that set hasn't been called yet
            expect(mockExecutor.set).not.toHaveBeenCalled();

            // Resolve the input
            resolveInput!(inputValue);
            await runPromise;

            // Assert
            expect(mockExecutor.set).toHaveBeenCalledWith(writeAddress, inputValue);
        });

        it('should handle input rejection/error', async () => {
            // Arrange
            const rawCode = 3;
            const argument = 5;
            const error = new Error('Input error');

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(5);
            mockIo.in.mockRejectedValue(error);

            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([0]);

            // Act & Assert
            await expect(opcode.run(mockExecutor)).rejects.toEqual(error);
            expect(mockExecutor.set).not.toHaveBeenCalled();
        });

        it('should only use the first parameter mode from modes array', async () => {
            // Arrange
            const rawCode = 103;
            const argument = 12;
            const inputValue = 55;

            mockExecutor.getAtPointerAndIncrement.mockReturnValueOnce(rawCode).mockReturnValueOnce(argument);
            mockExecutor.getWriteAddress.mockReturnValue(12);
            mockIo.in.mockResolvedValue(inputValue);

            // Return multiple modes but only first should be used
            vi.spyOn(ParameterModeHelper, 'modesFromRaw').mockReturnValue([1, 0, 1]);

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.getWriteAddress).toHaveBeenCalledWith(1, argument); // Only first mode used
        });

        it('should pause without consuming the instruction when input would block', async () => {
            // Arrange
            mockIo.wouldBlockOnInput.mockReturnValue(true);

            // Act
            await opcode.run(mockExecutor);

            // Assert
            expect(mockExecutor.pause).toHaveBeenCalled();
            expect(mockExecutor.getAtPointerAndIncrement).not.toHaveBeenCalled();
            expect(mockIo.in).not.toHaveBeenCalled();
            expect(mockExecutor.set).not.toHaveBeenCalled();
        });
    });

    describe('getOpcodeInfo', () => {
        it('should return INPUT opcode info', () => {
            // Act
            const result = opcode.getOpcodeInfo();

            // Assert
            expect(result).toBe(OpcodeInfo.INPUT);
        });
    });
});
