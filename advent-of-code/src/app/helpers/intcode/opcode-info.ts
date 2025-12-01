import { Opcode } from './opcode';

export class OpcodeInfo {
  private constructor(
    private readonly opcode: number,
    private readonly argsAmount: number,
    private opcodeClass: Opcode
  ) {}

  static readonly ADD = new OpcodeInfo(1, 3, null!);
  static readonly MULTIPLY = new OpcodeInfo(2, 3, null!);
  static readonly INPUT = new OpcodeInfo(3, 1, null!);
  static readonly OUTPUT = new OpcodeInfo(4, 1, null!);
  static readonly JUMP_IF_TRUE = new OpcodeInfo(5, 2, null!);
  static readonly JUMP_IF_FALSE = new OpcodeInfo(6, 2, null!);
  static readonly LESS_THAN = new OpcodeInfo(7, 3, null!);
  static readonly EQUALS = new OpcodeInfo(8, 3, null!);
  static readonly ADJUST_OFFSET = new OpcodeInfo(9, 1, null!);
  static readonly END = new OpcodeInfo(99, 0, null!);

  private static readonly values = [
    OpcodeInfo.ADD,
    OpcodeInfo.MULTIPLY,
    OpcodeInfo.INPUT,
    OpcodeInfo.OUTPUT,
    OpcodeInfo.JUMP_IF_TRUE,
    OpcodeInfo.JUMP_IF_FALSE,
    OpcodeInfo.LESS_THAN,
    OpcodeInfo.EQUALS,
    OpcodeInfo.ADJUST_OFFSET,
    OpcodeInfo.END
  ];

  static recognise(opcode: number): OpcodeInfo {
    const entry = OpcodeInfo.values.find(entry => entry.getOpcode() === opcode % 100);
    if (!entry) {
      throw new Error(`Unable to recognise: ${opcode}`);
    }
    return entry;
  }

  getOpcode(): number {
    return this.opcode;
  }

  getArgsAmount(): number {
    return this.argsAmount;
  }

  getOpcodeClass(): Opcode {
    return this.opcodeClass;
  }

  static setOpcodeClass(info: OpcodeInfo, opcodeClass: Opcode): void {
    info.opcodeClass = opcodeClass;
  }
}
