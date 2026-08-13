import { Opcode } from "../opcode";
import { OpcodeInfo } from "../opcode-info";
import { ProgramExecutor } from "../program-executor";
import { ParameterModeHelper } from "../parameter-mode";

export class Opcode4 extends Opcode {
    public override async run(executor: ProgramExecutor): Promise<void> {
        const rawCode = Number(executor.getAtPointerAndIncrement());
        const argument = executor.getAtPointerAndIncrement();
        const mode = ParameterModeHelper.modesFromRaw(rawCode)[0];

        await executor.getIo().out(executor.get(mode, argument));
    }

    public override getOpcodeInfo(): OpcodeInfo {
        return OpcodeInfo.OUTPUT;
    }
}
