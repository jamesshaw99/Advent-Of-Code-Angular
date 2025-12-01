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
    })
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
        const pause = spyOn(executor, 'pause');
        // Act
        io.out(1);

        // Assert
        expect(pause).toHaveBeenCalled();
    })

    it('should maintain output history', () => {
      // Arrange
      const outputs = [1, 2, 3];

      // Act
      outputs.forEach(value => io.out(value));

      // Assert
      expect(io.getLastOutput()).toBe(outputs[outputs.length - 1]);
      expect(io.getOutputsLog()).toEqual(outputs);
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
  });
});
