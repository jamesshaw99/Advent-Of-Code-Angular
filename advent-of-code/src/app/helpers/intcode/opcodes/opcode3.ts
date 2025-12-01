import { Opcode } from '../opcode';
import { ProgramExecutor } from '../program-executor';
import { OpcodeInfo } from '../opcode-info';
import { ParameterModeHelper } from '../parameter-mode';

export class Opcode3 extends Opcode {
  override async run(executor: ProgramExecutor): Promise<void> {
    const rawCode = executor.getAtPointerAndIncrement();
    const argument = executor.getAtPointerAndIncrement();
    const mode = ParameterModeHelper.modesFromRaw(rawCode)[0];

    const input = await executor.getIo().in();
    executor.set(executor.getWriteAddress(mode, argument), input);
  }

  override getOpcodeInfo(): OpcodeInfo {
    return OpcodeInfo.INPUT;
  }
}
