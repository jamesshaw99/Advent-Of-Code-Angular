import { day } from '../../helpers/day';

interface Gate {
  a: string;
  operator: 'AND' | 'OR' | 'XOR';
  b: string;
  output: string;
}

export class year2024day24 extends day {
  wires = new Map<string, number>();
  gates: Gate[] = [];
  gatesByOutput = new Map<string, Gate>();

  override preChallenge(): void {
    this.wires = new Map();
    this.gates = [];
    this.gatesByOutput = new Map();

    for (const line of this.input) {
      const wireMatch = line.match(/^(\w+): (\d)$/);
      const gateMatch = line.match(/^(\w+) (AND|OR|XOR) (\w+) -> (\w+)$/);

      if (wireMatch) {
        const [, name, value] = wireMatch;
        this.wires.set(name, Number(value));
      } else if (gateMatch) {
        const [, a, operator, b, output] = gateMatch;
        const gate: Gate = { a, operator: operator as Gate['operator'], b, output };
        this.gates.push(gate);
        this.gatesByOutput.set(output, gate);
      }
    }
  }

  override part1(): string {
    const decimalValue = this.readNumber('z');
    return `Decimal value on the z-wires: ${decimalValue}`;
  }

  getValue(wire: string): number {
    const known = this.wires.get(wire);
    if (known !== undefined) return known;

    const gate = this.gatesByOutput.get(wire)!;
    const a = this.getValue(gate.a);
    const b = this.getValue(gate.b);

    let result: number;
    switch (gate.operator) {
      case 'AND':
        result = a & b;
        break;
      case 'OR':
        result = a | b;
        break;
      case 'XOR':
        result = a ^ b;
        break;
    }

    this.wires.set(wire, result);
    return result;
  }

  override part2(): string {
    const swapped = this.findSwappedWires();
    return `Wires involved in swaps: ${swapped.join(',')}`;
  }

  findSwappedWires(): string[] {
    const numBits = [...this.wires.keys()].filter((name) => name.startsWith('x')).length;
    const strongVectors = [...this.singleBitVectors(numBits), ...this.combinedVectors(numBits)];

    const swaps = new Map<string, string>();
    const foundPairs: string[] = [];
    const outputs = this.gates.map((gate) => gate.output);

    for (let round = 0; round < 4; round++) {
      const currentMap = this.relabelGates(swaps);
      const brokenBit = this.findFirstBrokenBit(currentMap, numBits, strongVectors);
      if (brokenBit === null) break;

      const targetVectors: [bigint, bigint][] =
        brokenBit >= 0
          ? [
              [1n << BigInt(brokenBit), 0n],
              [0n, 1n << BigInt(brokenBit)],
              [1n << BigInt(brokenBit), 1n << BigInt(brokenBit)],
            ]
          : strongVectors;

      let fixedThisRound = false;
      for (let i = 0; i < outputs.length && !fixedThisRound; i++) {
        const a = outputs[i];
        if (swaps.has(a)) continue;

        for (let j = i + 1; j < outputs.length && !fixedThisRound; j++) {
          const b = outputs[j];
          if (swaps.has(b)) continue;

          const trialSwaps = new Map(swaps);
          trialSwaps.set(a, b);
          trialSwaps.set(b, a);
          const trialMap = this.relabelGates(trialSwaps);

          if (this.findFirstBrokenBit(trialMap, numBits, targetVectors) !== null) continue;

          const globalBrokenBit = this.findFirstBrokenBit(trialMap, numBits, strongVectors);
          if (globalBrokenBit !== null && globalBrokenBit <= brokenBit) continue;

          swaps.set(a, b);
          swaps.set(b, a);
          foundPairs.push(a, b);
          fixedThisRound = true;
        }
      }

      if (!fixedThisRound) break;
    }

    return foundPairs.sort();
  }

  singleBitVectors(numBits: number): [bigint, bigint][] {
    const vectors: [bigint, bigint][] = [];
    for (let i = 0; i < numBits; i++) {
      const bit = 1n << BigInt(i);
      vectors.push([bit, 0n], [0n, bit], [bit, bit]);
    }
    return vectors;
  }

  combinedVectors(numBits: number): [bigint, bigint][] {
    const allOnes = (1n << BigInt(numBits)) - 1n;
    let alternatingEven = 0n;
    let alternatingOdd = 0n;

    for (let i = 0; i < numBits; i++) {
      if (i % 2 === 0) alternatingEven |= 1n << BigInt(i);
      else alternatingOdd |= 1n << BigInt(i);
    }

    return [
      [allOnes, 1n],
      [1n, allOnes],
      [allOnes, allOnes],
      [alternatingEven, alternatingOdd],
      [alternatingOdd, alternatingEven],
      [alternatingEven, alternatingEven],
      [alternatingOdd, alternatingOdd],
    ];
  }

  relabelGates(swaps: Map<string, string>): Map<string, Gate> {
    const map = new Map<string, Gate>();
    for (const gate of this.gates) {
      map.set(swaps.get(gate.output) ?? gate.output, gate);
    }
    return map;
  }

  simulateAddition(
    xValue: bigint,
    yValue: bigint,
    gatesByOutput: Map<string, Gate>,
    numBits: number
  ): bigint | null {
    const wireVals = new Map<string, number>();
    for (let i = 0; i < numBits; i++) {
      const suffix = String(i).padStart(2, '0');
      wireVals.set(`x${suffix}`, Number((xValue >> BigInt(i)) & 1n));
      wireVals.set(`y${suffix}`, Number((yValue >> BigInt(i)) & 1n));
    }

    const zWires = [...gatesByOutput.keys()].filter((name) => name.startsWith('z')).sort();

    try {
      let z = 0n;
      for (let i = 0; i < zWires.length; i++) {
        const bit = this.resolveWire(zWires[i], wireVals, gatesByOutput, new Set());
        z += BigInt(bit) * (2n ** BigInt(i));
      }
      return z;
    } catch {
      return null;
    }
  }

  resolveWire(
    wire: string,
    wireVals: Map<string, number>,
    gatesByOutput: Map<string, Gate>,
    visiting: Set<string>
  ): number {
    const known = wireVals.get(wire);
    if (known !== undefined) return known;
    if (visiting.has(wire)) throw new Error('cycle detected');

    visiting.add(wire);
    const gate = gatesByOutput.get(wire)!;
    const a = this.resolveWire(gate.a, wireVals, gatesByOutput, visiting);
    const b = this.resolveWire(gate.b, wireVals, gatesByOutput, visiting);

    let result: number;
    switch (gate.operator) {
      case 'AND':
        result = a & b;
        break;
      case 'OR':
        result = a | b;
        break;
      case 'XOR':
        result = a ^ b;
        break;
    }

    wireVals.set(wire, result);
    visiting.delete(wire);
    return result;
  }

  findFirstBrokenBit(
    gatesByOutput: Map<string, Gate>,
    numBits: number,
    vectors: [bigint, bigint][]
  ): number | null {
    for (const [xValue, yValue] of vectors) {
      const z = this.simulateAddition(xValue, yValue, gatesByOutput, numBits);
      if (z === null) return -1;

      const expected = xValue + yValue;
      if (z !== expected) {
        for (let i = 0; i <= numBits; i++) {
          if (((z >> BigInt(i)) & 1n) !== ((expected >> BigInt(i)) & 1n)) {
            return i;
          }
        }
      }
    }

    return null;
  }

  readNumber(prefix: string): number {
    const wireNames = new Set<string>([...this.wires.keys(), ...this.gatesByOutput.keys()]);
    const bitWires = [...wireNames]
      .filter((name) => name.startsWith(prefix))
      .sort();

    let value = 0;
    for (let i = 0; i < bitWires.length; i++) {
      value += this.getValue(bitWires[i]) * 2 ** i;
    }

    return value;
  }
}
