import { Opcode } from "../opcode";
import { OpcodeInfo } from "../opcode-info";
import { ProgramExecutor } from "../program-executor";

export class Opcode99 extends Opcode {
    public override async run(executor: ProgramExecutor): Promise<void> {
        executor.stop();
    }

    public override getOpcodeInfo(): OpcodeInfo {
        return OpcodeInfo.END;
    }
}
