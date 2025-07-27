import { day } from '../../helpers/day';

export class year2020day5 extends day {
  seatIds: number[] = [];

  override preChallenge(): void {
    this.seatIds = this.input.map((line) => this.calculateSeatId(line));
    this.seatIds.sort((a, b) => a - b);
  }

  private calculateSeatId(boardingPass: string): number {
    const binaryString = boardingPass
      .replace(/[FL]/g, '0')
      .replace(/[BR]/g, '1');

    return parseInt(binaryString, 2);
  }

  override part1(): string {
    return `Highest seat ID: ${this.seatIds[this.seatIds.length - 1]}`;
  }

  override part2(): string {
    const seatSet = new Set(this.seatIds);
    const minSeat = this.seatIds[0];
    const maxSeat = this.seatIds[this.seatIds.length - 1];

    for (let i = minSeat; i <= maxSeat; i++) {
      if (!seatSet.has(i)) {
        return `Id of my seat: ${i}`;
      }
    }

    return 'Could not find my seat';
  }
}
