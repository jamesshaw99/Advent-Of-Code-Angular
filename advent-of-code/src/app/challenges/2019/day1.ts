import { day } from '../../helpers/day';

export class year2019day1 extends day {
  private list!: number[];

  override preChallenge(): void {
    this.list = this.input.map(Number);
  }

  override part1(): string {
    const totalFuel = this.list.reduce((sum, n) => sum + Math.floor(n / 3) - 2, 0);
    return `Total fuel: ${totalFuel}`;
  }

  override part2(): string {
    const totalFuel = this.list.reduce((sum, n) => {
      let fuel = Math.floor(n / 3) - 2;
      let subtotal = 0;
      while (fuel > 0) {
        subtotal += fuel;
        fuel = Math.floor(fuel / 3) - 2;
      }
      return sum + subtotal;
    }, 0);
    return `Total fuel: ${totalFuel}`;
  }
}
