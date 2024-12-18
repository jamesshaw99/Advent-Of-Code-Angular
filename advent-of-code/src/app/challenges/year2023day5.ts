import { day } from '../helpers/day';

export class year2023day5 extends day {
  private seeds: number[] = [];
  private maps: Array<Array<number[]>> = [];

  override part1(): string {
    let location = Number.MAX_VALUE;
    for (const seed of this.seeds) {
      location = Math.min(location, this.calculateLocation(seed));
    }
    return `Lowest location: ${location}`;
  }

  override part2(): string {
    let location = Number.MAX_VALUE;
    for (let i = 0; i < this.seeds.length; i += 2) {
      for (let j = 0; j <= this.seeds[i + 1]; j++) {
        location = Math.min(
          location,
          this.calculateLocation(this.seeds[i] + j)
        );
      }
    }
    return `Lowest location: ${location}`;
  }

  private calculateLocation(seed: number): number {
    let location = seed;
    for (let j = 0; j < 7; j++) {
      const map = this.maps[j];
      for (const values of map) {
        const minValue = values[1];
        const maxValue = minValue + values[2];
        if (location >= minValue && location < maxValue) {
          location = values[0] + (location - minValue);
          break;
        }
      }
    }
    return location;
  }

  override preChallenge(): void {
    this.maps = Array.from({ length: 7 }, () => []);
    let section = 0;
    for (const line of this.input) {
      if (line.trim().length === 0) {
        section++;
        continue;
      }
      if (line.includes('map')) {
        continue;
      }
      if (section === 0) {
        const seedsString = line.substring(7);
        this.seeds = seedsString.split(' ').map(Number);
      } else {
        const values = line.split(' ').map(Number);
        if (!this.maps[section - 1]) {
          this.maps[section - 1] = [];
        }
        this.maps[section - 1].push(values);
      }
    }
  }
}
