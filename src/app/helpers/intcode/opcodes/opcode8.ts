import { Opcode } from "../opcode";
import { OpcodeInfo } from "../opcode-info";
import { ProgramExecutor } from "../program-executor";
import { ParameterModeHelper } from "../parameter-mode";

export class Opcode8 extends Opcode {
    public override async run(executor: ProgramExecutor): Promise<void> {
        const rawCode = Number(executor.getAtPointerAndIncrement());
        const args: number[] = [];
        const modes = ParameterModeHelper.modesFromRaw(rawCode);

        for (let i = 0; i < this.getOpcodeInfo().getArgsAmount(); i++) {
            args.push(Number(executor.getAtPointerAndIncrement()));
        }

        if (Number(executor.get(modes[0], args[0])) === Number(executor.get(modes[1], args[1]))) {
            executor.set(executor.getWriteAddress(modes[2], args[2]), 1);
        } else {
            executor.set(executor.getWriteAddress(modes[2], args[2]), 0);
        }
    }

    public override getOpcodeInfo(): OpcodeInfo {
        return OpcodeInfo.EQUALS;
    }
}
