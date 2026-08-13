import { OpcodeInfo } from './opcode-info';

export enum ParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2
}

export class ParameterModeHelper {
  static modesFromRaw(opcode: number): ParameterMode[] {
    const info = OpcodeInfo.recognise(opcode);
    const amount = info.getArgsAmount();
    const modesOnly = Math.floor((opcode - info.getOpcode()) / 100);
    const digits = modesOnly === 0 
      ? []
      : modesOnly.toString()
          .split('')
          .map(Number)
          .reverse();

    const modes: ParameterMode[] = [];
    
    for (const digit of digits) {
      modes.push(this.fromRaw(digit));
    }

    while (modes.length < amount) {
      modes.push(ParameterMode.POSITION);
    }

    return modes;
  }

  static fromRaw(raw: number): ParameterMode {
    return raw in ParameterMode 
      ? raw as ParameterMode 
      : ParameterMode.POSITION;
  }
}
