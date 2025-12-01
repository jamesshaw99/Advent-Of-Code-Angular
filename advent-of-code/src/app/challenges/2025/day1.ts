import { day } from '../../helpers/day';

interface Instruction {
  direction: 'L' | 'R';
  value: number;
}

export class year2025day1 extends day {
  readonly MIN_POSITION = 0;
  readonly MAX_POSITION = 99;
  readonly RANGE_SIZE = 100;
  readonly STARTING_POSITION = 50;

  override part1(): string {
    let position = this.STARTING_POSITION;
    let zeroCounter = 0;

    for (const instruction of this.input) {
      const { direction, value } = this.parseInstruction(instruction);

      position = this.applyMove(position, direction, value);
      position = this.normalizePosition(position);

      if (position === this.MIN_POSITION) {
        zeroCounter++;
      }
    }

    return `Password to open the door is ${zeroCounter}`;
  }

  override part2(): string {
    let position = this.STARTING_POSITION;
    let zeroCounter = 0;

    for (const instruction of this.input) {
      const { direction, value } = this.parseInstruction(instruction);

      const startPosition = position;
      position = this.applyMove(position, direction, value);

      const wraps = this.countWrapsAndNormalize(position, startPosition);
      zeroCounter += wraps.wrapCount;
      position = wraps.normalizedPosition;

      if (position == 0) {
        zeroCounter++;
      }
    }

    return `Password to open the door is ${zeroCounter}`;
  }

  parseInstruction(instruction: string): Instruction {
    const direction = instruction[0] as 'L' | 'R';
    const value = Number(instruction.slice(1));
    return { direction, value };
  }

  applyMove(
    position: number,
    direction: 'L' | 'R',
    value: number
  ): number {
    return direction === 'L' ? position - value : position + value;
  }

  normalizePosition(position: number): number {
    let normalized = position % this.RANGE_SIZE;
    if (normalized < 0) {
      normalized += this.RANGE_SIZE;
    }
    return normalized;
  }

  countWrapsAndNormalize(
    endPosition: number,
    startPosition: number
  ): {
    wrapCount: number;
    normalizedPosition: number;
  } {
    let wrapCount = 0;

    if (endPosition < this.MIN_POSITION) {
      wrapCount = Math.ceil(Math.abs(endPosition) / this.RANGE_SIZE);
      if (startPosition % this.RANGE_SIZE === 0) {
        wrapCount--;
      }
    } else if (endPosition > this.MAX_POSITION) {
      wrapCount = Math.floor(endPosition / this.RANGE_SIZE);
      if (endPosition % this.RANGE_SIZE === 0) {
        wrapCount--;
      }
    }
    const normalizedPosition = this.normalizePosition(endPosition);

    return { wrapCount, normalizedPosition };
  }
}
