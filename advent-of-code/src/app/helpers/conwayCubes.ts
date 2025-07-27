export type Coordinate = readonly number[];

export class ConwayCubes {
  private cubes: Map<string, '#' | '.'>;
  private readonly dimensionsCount: number;

  private constructor(cubes: Map<string, '#' | '.'>, dimensionsCount: number) {
    this.cubes = cubes;
    this.dimensionsCount = dimensionsCount;
  }

  static from(lines: string[], dimensionsCount: number): ConwayCubes {
    const cubes = new Map<string, '#' | '.'>();

    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line.length; x++) {
        const coords = new Array(dimensionsCount).fill(0);
        coords[0] = x;
        coords[1] = y;
        cubes.set(ConwayCubes.coordKey(coords), line[x] as '#' | '.');
      }
    }

    return new ConwayCubes(cubes, dimensionsCount);
  }

  transitionToNextState(times: number): void {
    for (let i = 0; i < times; i++) {
      this.cubes = this.nextState();
    }
  }

  activeCubesCount(): number {
    let count = 0;
    for (const state of this.cubes.values()) {
      if (state === '#') count++;
    }
    return count;
  }

  private nextState(): Map<string, '#' | '.'> {
    const newCubes = new Map<string, '#' | '.'>();
    const [minCoord, maxCoord] = this.getBounds();

    const start = minCoord.map(c => c - 1);
    const end = maxCoord.map(c => c + 1);

    this.iterateCoordinates(start, end, (coords) => {
      const key = ConwayCubes.coordKey(coords);
      const currentState = this.cubes.get(key) ?? '.';
      const activeNeighbors = this.countActiveNeighbors(coords);

      if (currentState === '#' && (activeNeighbors === 2 || activeNeighbors === 3)) {
        newCubes.set(key, '#');
      } else if (currentState === '.' && activeNeighbors === 3) {
        newCubes.set(key, '#');
      } else {
        newCubes.set(key, '.');
      }
    });

    return newCubes;
  }

  private countActiveNeighbors(coord: number[]): number {
    let count = 0;
    const start = new Array(this.dimensionsCount).fill(-1);
    const end = new Array(this.dimensionsCount).fill(1);

    this.iterateCoordinates(start, end, (offset) => {
      if (offset.every(o => o === 0)) return; // skip self
      const neighbor = coord.map((c, i) => c + offset[i]);
      if (this.cubes.get(ConwayCubes.coordKey(neighbor)) === '#') count++;
    });

    return count;
  }

  private getBounds(): [number[], number[]] {
    const coordsArray = Array.from(this.cubes.keys()).map(k => ConwayCubes.parseKey(k));
    if (coordsArray.length === 0) {
      throw new Error('No coordinates found in cubes');
    }

    const minCoords = coordsArray[0].slice();
    const maxCoords = coordsArray[0].slice();

    for (const coords of coordsArray) {
      for (let i = 0; i < this.dimensionsCount; i++) {
        if (coords[i] < minCoords[i]) minCoords[i] = coords[i];
        if (coords[i] > maxCoords[i]) maxCoords[i] = coords[i];
      }
    }

    return [minCoords, maxCoords];
  }

  private iterateCoordinates(start: number[], end: number[], callback: (coords: number[]) => void, dim = 0, current: number[] = []) {
    if (dim === this.dimensionsCount) {
      callback(current);
      return;
    }

    for (let v = start[dim]; v <= end[dim]; v++) {
      this.iterateCoordinates(start, end, callback, dim + 1, [...current, v]);
    }
  }

  private static coordKey(coords: number[]): string {
    return coords.join(',');
  }

  private static parseKey(key: string): number[] {
    return key.split(',').map(Number);
  }
}