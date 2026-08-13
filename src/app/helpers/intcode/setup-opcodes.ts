import { OpcodeInfo } from './opcode-info';

import { Opcode1 } from './opcodes/opcode1';
import { Opcode2 } from './opcodes/opcode2';
import { Opcode3 } from './opcodes/opcode3';
import { Opcode4 } from './opcodes/opcode4';
import { Opcode5 } from './opcodes/opcode5';
import { Opcode6 } from './opcodes/opcode6';
import { Opcode7 } from './opcodes/opcode7';
import { Opcode8 } from './opcodes/opcode8';
import { Opcode9 } from './opcodes/opcode9';
import { Opcode99 } from './opcodes/opcode99';

export function setupOpcodes(): void {
  OpcodeInfo.setOpcodeClass(OpcodeInfo.ADD, new Opcode1);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.MULTIPLY, new Opcode2);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.INPUT, new Opcode3);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.OUTPUT, new Opcode4);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.JUMP_IF_TRUE, new Opcode5);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.JUMP_IF_FALSE, new Opcode6);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.LESS_THAN, new Opcode7);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.EQUALS, new Opcode8);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.ADJUST_OFFSET, new Opcode9);
  OpcodeInfo.setOpcodeClass(OpcodeInfo.END, new Opcode99);
}
