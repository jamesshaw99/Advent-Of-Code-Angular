import { day } from '../../helpers/day';

interface Range {
  start: number;
  length: number;
}

interface MapEntry {
  destStart: number;
  sourceStart: number;
  length: number;
}

export class year2023day5 extends day {
  private seeds: number[] = [];
  private maps: MapEntry[][] = [];
  
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
        this.maps[section - 1].push({
          destStart: values[0],
          sourceStart: values[1],
          length: values[2]
        });
      }
    }
  }

  override part1(): string {
    let location = Number.MAX_VALUE;
    for (const seed of this.seeds) {
      location = Math.min(location, this.calculateLocation(seed));
    }
    return `Lowest location: ${location}`;
  }

  override part2(): string {
    const seedRanges: Range[] = [];
    for (let i = 0; i < this.seeds.length; i += 2) {
      seedRanges.push({
        start: this.seeds[i],
        length: this.seeds[i + 1]
      });
    }
    
    let currentRanges = seedRanges;
    for (const map of this.maps) {
      currentRanges = this.processRanges(currentRanges, map);
    }
    
    let minLocation = Number.MAX_VALUE;
    for (const range of currentRanges) {
      minLocation = Math.min(minLocation, range.start);
    }

    return `Lowest location: ${minLocation}`;
  }

  calculateLocation(seed: number): number {
    let location = seed;
    for (const map of this.maps) {
      for (const mapEntry of map) {
        if (location >= mapEntry.sourceStart && 
            location < mapEntry.sourceStart + mapEntry.length) {
          location = mapEntry.destStart + (location - mapEntry.sourceStart);
          break;
        }
      }
    }
    return location;
  }

  processRanges(ranges: Range[], map: MapEntry[]): Range[] {
    const result: Range[] = [];
    
    for (const range of ranges) {
      const processedRanges = this.processRange(range, map);
      result.push(...processedRanges);
    }
    
    return result;
  }

  processRange(range: Range, map: MapEntry[]): Range[] {
    const result: Range[] = [];
    const queue: Range[] = [range];

    while (queue.length > 0) {
      const currentRange = queue.pop()!;
      let mapped = false;

      for (const mapEntry of map) {
        const overlapStart = Math.max(currentRange.start, mapEntry.sourceStart);
        const overlapEnd = Math.min(
          currentRange.start + currentRange.length,
          mapEntry.sourceStart + mapEntry.length
        );

        if (overlapStart < overlapEnd) {
          const mappedStart = mapEntry.destStart + (overlapStart - mapEntry.sourceStart);
          const mappedLength = overlapEnd - overlapStart;
          
          result.push({
            start: mappedStart,
            length: mappedLength
          });

          if (currentRange.start < overlapStart) {
            queue.push({
              start: currentRange.start,
              length: overlapStart - currentRange.start
            });
          }
          
          if (overlapEnd < currentRange.start + currentRange.length) {
            queue.push({
              start: overlapEnd,
              length: currentRange.start + currentRange.length - overlapEnd
            });
          }

          mapped = true;
          break;
        }
      }

      if (!mapped) {
        result.push(currentRange);
      }
    }

    return result;
  }
}
