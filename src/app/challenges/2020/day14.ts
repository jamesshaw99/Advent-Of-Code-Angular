import { day } from '../../helpers/day';

interface Instruction {
  type: 'mask' | 'mem';
  value: string;
  address?: number;
}

export class year2020day14 extends day {
  private instructions: Instruction[] = [];

  override preChallenge(): void {
    this.instructions = this.input.map((line) => {
      if (line.startsWith('mask = ')) {
        return {
          type: 'mask' as const,
          value: line.substring(7),
        };
      } else {
        const addressMatch = line.match(/mem\[(\d+)\]/);
        const valueMatch = line.match(/= (\d+)/);
        return {
          type: 'mem' as const,
          address: parseInt(addressMatch![1]),
          value: valueMatch![1],
        };
      }
    });
  }

  override part1(): string {
    const memory = new Map<number, number>();
    let currentMask = '';

    for (const instruction of this.instructions) {
      if (instruction.type === 'mask') {
        currentMask = instruction.value;
      } else {
        const value = parseInt(instruction.value);
        const maskedValue = this.applyMaskV1(value, currentMask);
        memory.set(instruction.address!, maskedValue);
      }
    }

    return `Sum of values left in memory: ${Array.from(memory.values()).reduce((sum, value) => sum + value, 0)}`;
  }

  override part2(): string {
    const memory = new Map<number, number>();
    let currentMask = '';

    for (const instruction of this.instructions) {
      if (instruction.type === 'mask') {
        currentMask = instruction.value;
      } else {
        const value = parseInt(instruction.value);
        const addresses = this.getFloatingAddresses(
          instruction.address!,
          currentMask
        );

        for (const address of addresses) {
          memory.set(address, value);
        }
      }
    }

    return `Sum of values left in memory: ${Array.from(memory.values()).reduce((sum, value) => sum + value, 0)}`;
  }

  private applyMaskV1(value: number, mask: string): number {
    const binary = value.toString(2).padStart(36, '0');

    const result = binary
      .split('')
      .map((bit, index) => (mask[index] === 'X' ? bit : mask[index]))
      .join('');

    return parseInt(result, 2);
  }

  private getFloatingAddresses(address: number, mask: string): number[] {
    const addressBinary = address.toString(2).padStart(36, '0');

    let maskedAddress = '';
    for (let i = 0; i < 36; i++) {
      const maskBit = mask[i];
      if (maskBit === '0') {
        maskedAddress += addressBinary[i];
      } else if (maskBit === '1') {
        maskedAddress += '1';
      } else {
        maskedAddress += 'X';
      }
    }

    return this.expandFloatingBits(maskedAddress);
  }

  private expandFloatingBits(address: string): number[] {
    const floatingCount = address.split('X').length - 1;
    const combinations = Math.pow(2, floatingCount);
    const results: number[] = [];

    for (let i = 0; i < combinations; i++) {
      const binaryString = i.toString(2).padStart(floatingCount, '0');
      let bitIndex = 0;

      const resolvedAddress = address.replace(
        /X/g,
        () => binaryString[bitIndex++]
      );
      results.push(parseInt(resolvedAddress, 2));
    }

    return results;
  }
}
