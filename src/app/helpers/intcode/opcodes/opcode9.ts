import { Opcode } from "../opcode";
import { OpcodeInfo } from "../opcode-info";
import { ProgramExecutor } from "../program-executor";
import { ParameterModeHelper } from "../parameter-mode";

export class Opcode9 extends Opcode {
    public override async run(executor: ProgramExecutor): Promise<void> {
        const rawCode = Number(executor.getAtPointerAndIncrement());
        const argument = Number(executor.getAtPointerAndIncrement());
        const mode = ParameterModeHelper.modesFromRaw(rawCode)[0];

        executor.adjustRelativePointer(Number(executor.get(mode, argument)));
    }

    public override getOpcodeInfo(): OpcodeInfo {
        return OpcodeInfo.ADJUST_OFFSET;
    }
}
