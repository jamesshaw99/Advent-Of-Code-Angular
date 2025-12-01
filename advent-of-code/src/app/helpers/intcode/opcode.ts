import { OpcodeInfo } from "./opcode-info";
import { ProgramExecutor } from "./program-executor";


export abstract class Opcode {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(executor: ProgramExecutor): Promise<void> {
    // Base implementation
  }

  getOpcodeInfo(): OpcodeInfo | null {
    return null;
  }
}
