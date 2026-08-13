import { day } from '../../helpers/day';

export class year2024day11 extends day {
  stones: number[] = [];

  public override preChallenge(): void {
    this.stones = this.input[0].split(' ').map(Number);
  }

  public override part1(): string {
    const result = this.blinkStones(25);
    return `Total number of stones after 25 blinks: ${result}`;
  }

  public override part2(): string {
    const result = this.blinkStones(75);
    return `Total number of stones after 75 blinks: ${result}`;
  }

  blinkStones(blinks: number): number {
    let stoneMap = new Map<number, number>();

    // Initialize the map with input stones
    for (const stone of this.stones) {
      stoneMap.set(stone, (stoneMap.get(stone) || 0) + 1);
    }

    for (let i = 0; i < blinks; i++) {
      const newMap = new Map<number, number>();

      for (const [stone, count] of stoneMap.entries()) {
        if (stone === 0) {
          newMap.set(1, (newMap.get(1) || 0) + count);
        } else if (stone >= 10 && stone.toString().length % 2 === 0) {
          const strStone = stone.toString();
          const mid = strStone.length / 2;
          const left = parseInt(strStone.slice(0, mid), 10) || 0;
          const right = parseInt(strStone.slice(mid), 10) || 0;

          newMap.set(left, (newMap.get(left) || 0) + count);
          newMap.set(right, (newMap.get(right) || 0) + count);
        } else {
          const newStone = stone * 2024;
          newMap.set(newStone, (newMap.get(newStone) || 0) + count);
        }
      }

      stoneMap = newMap;
    }

    return Array.from(stoneMap.values()).reduce((sum, val) => sum + val, 0);
  }
}
