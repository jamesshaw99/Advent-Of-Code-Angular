import { Opcode } from '../opcode';
import { ProgramExecutor } from '../program-executor';
import { OpcodeInfo } from '../opcode-info';
import { ParameterModeHelper } from '../parameter-mode';

export class Opcode1 extends Opcode {
  override async run(executor: ProgramExecutor): Promise<void> {
    const rawCode = executor.getAtPointerAndIncrement();
    const args: number[] = [];
    const modes = ParameterModeHelper.modesFromRaw(rawCode);

    for (let i = 0; i < this.getOpcodeInfo().getArgsAmount(); i++) {
      args.push(executor.getAtPointerAndIncrement());
    }

    executor.set(
      executor.getWriteAddress(modes[2], args[2]),
      executor.get(modes[0], args[0]) + executor.get(modes[1], args[1])
    );
  }

  override getOpcodeInfo(): OpcodeInfo {
    return OpcodeInfo.ADD;
  }
}
