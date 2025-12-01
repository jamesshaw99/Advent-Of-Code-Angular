import { ProgramExecutor } from '../../intcode/program-executor';

describe('ProgramExecutor', () => {
  let executor: ProgramExecutor;

  describe('constructor', () => {
    it('should initialize with string input', () => {
      executor = new ProgramExecutor('1,0,0,0,99');
      expect(executor.getAtPointer()).toBe(1);
    });

    it('should initialize with number array input', () => {
      executor = new ProgramExecutor([1, 0, 0, 0, 99]);
      expect(executor.getAtPointer()).toBe(1);
    });
  });

  describe('memory operations', () => {
    beforeEach(() => {
      executor = new ProgramExecutor([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]);
    });

    it('should read from memory correctly', () => {
      expect(executor.getAtPointer()).toBe(1);
      executor.setMemoryPointer(9);
      expect(executor.getAtPointer()).toBe(30);
    });

    it('should write to memory correctly', () => {
      executor.set(3, 100);
      executor.setMemoryPointer(3);
      expect(executor.getAtPointer()).toBe(100);
    });

    it('should return 0 for unset memory locations', () => {
      executor.setMemoryPointer(100);
      expect(executor.getAtPointer()).toBe(0);
    });
  });

  describe('program execution', () => {
    it('should execute addition program correctly', async () => {
      executor = new ProgramExecutor('1,0,0,3,99');
      await executor.run();
      executor.setMemoryPointer(3);
      expect(executor.getAtPointer()).toBe(2); // 1 + 1 = 2
    });

    it('should execute multiplication program correctly', async () => {
      executor = new ProgramExecutor('2,3,0,3,99');
      await executor.run();
      executor.setMemoryPointer(3);
      expect(executor.getAtPointer()).toBe(6); // 2 * 3 = 6
    });

    it('should halt on program end', async () => {
      executor = new ProgramExecutor('99');
      const result = await executor.run();
      expect(result).toBe('FINISHED');
    });
  });
});
