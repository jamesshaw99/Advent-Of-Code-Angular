import { IO } from '../../intcode/io';
import { ProgramExecutor } from '../../intcode/program-executor';

describe('IO', () => {
    let io: IO;
    let executor: ProgramExecutor;

    beforeEach(() => {
        executor = new ProgramExecutor('1,0,0,0,99');
        io = new IO(executor, false);
    });

    describe('input operations', () => {
        it('should handle inputs and provide them in order', async () => {
            // Arrange
            io.setInputs([42, 43, 44]);

            // Act
            const input1 = await io.in();
            const input2 = await io.in();
            const input3 = await io.in();

            // Assert
            expect(input1).toBe(42);
            expect(input2).toBe(43);
            expect(input3).toBe(44);
        });

        it('should return 0 when no more inputs available', async () => {
            // Arrange
            io.setInputs([1]);

            // Act
            await io.in();
            const result = await io.in();

            // Assert
            expect(result).toBe(0);
        });

        it('should clear inputs', async () => {
            // Arrange
            io.setInputs([1]);

            // Act
            io.clearInputs();
            const result = await io.in();

            // Assert
            expect(result).toBe(0);
        });

        it('should return a configured empty-input value once inputs are exhausted', async () => {
            // Arrange
            io.setEmptyInputValue(-1);
            io.setInputs([1]);

            // Act
            await io.in();
            const result = await io.in();

            // Assert
            expect(result).toBe(-1);
        });

        it('should report whether blocking is enabled and input is unavailable', async () => {
            // Arrange
            io.enableBlockOnEmptyInput(true);
            io.setInputs([1]);

            // Act & Assert
            expect(io.wouldBlockOnInput()).toBe(false);
            await io.in();
            expect(io.wouldBlockOnInput()).toBe(true);

            io.addInput(2);
            expect(io.wouldBlockOnInput()).toBe(false);
        });

        it('should never report blocking when enableBlockOnEmptyInput is off', async () => {
            // Arrange (default state, no inputs queued)

            // Act & Assert
            expect(io.wouldBlockOnInput()).toBe(false);
        });
    });

    describe('output operations', () => {
        it('should store output values', () => {
            // Arrange
            const testValue = 42;

            // Act
            io.out(testValue);

            // Assert
            expect(io.getLastOutput()).toBe(testValue);
        });

        it('should pause if outputInterrupt is true', () => {
            // Arrange
            io.enableOutputInterrupt(true);
            const pause = vi.spyOn(executor, 'pause').mockReturnValue(undefined);
            // Act
            io.out(1);

            // Assert
            expect(pause).toHaveBeenCalled();
        });

        it('should maintain output history', () => {
            // Arrange
            const outputs = [1, 2, 3];

            // Act
            outputs.forEach(value => io.out(value));

            // Assert
            expect(io.getLastOutput()).toBe(outputs[outputs.length - 1]);
            expect(io.getOutputsLog()).toEqual(outputs);
        });

        it('should report output log length without copying the whole log', () => {
            // Arrange
            [1, 2, 3].forEach(value => io.out(value));

            // Act & Assert
            expect(io.getOutputsLogLength()).toBe(3);
        });

        it('should return only outputs since a given index', () => {
            // Arrange
            [1, 2, 3, 4, 5].forEach(value => io.out(value));

            // Act
            const result = io.getOutputsLogSince(2);

            // Assert
            expect(result).toEqual([3, 4, 5]);
        });
    });

    describe('game mode', () => {
        it('should handle game mode inputs differently', async () => {
            // Arrange
            const gameIo = new IO(executor, true);

            gameIo.out(0);
            gameIo.out(0);
            gameIo.out(3);
            gameIo.out(5);
            gameIo.out(0);
            gameIo.out(4);

            // Act
            const input = await gameIo.in();

            // Assert
            expect(input).toBe(1);
        });

        it('should only process new outputs on each call, not the whole log', async () => {
            // Arrange
            const gameIo = new IO(executor, true);
            gameIo.out(0); gameIo.out(0); gameIo.out(3); // paddle at x=0

            // Act
            await gameIo.in();
            gameIo.out(0); gameIo.out(0); gameIo.out(4); // ball moves to x=0
            const input = await gameIo.in();

            // Assert
            expect(input).toBe(0);
        });

        it('should retain the score across calls when no new score output arrives', async () => {
            // Arrange
            const gameIo = new IO(executor, true);
            gameIo.out(-1); gameIo.out(0); gameIo.out(100); // score = 100

            // Act
            await gameIo.in();
            gameIo.out(1); gameIo.out(1); gameIo.out(3); // unrelated paddle output, no new score
            await gameIo.in();

            // Assert
            expect(gameIo.getScore()).toBe(100);
        });

        it('should be idempotent when called with no new outputs in between', async () => {
            // Arrange
            const gameIo = new IO(executor, true);
            gameIo.out(2); gameIo.out(2); gameIo.out(3);
            gameIo.out(5); gameIo.out(2); gameIo.out(4);

            // Act
            const input1 = await gameIo.in();
            const input2 = await gameIo.in();

            // Assert
            expect(input1).toBe(1);
            expect(input2).toBe(1);
        });
    });
});
