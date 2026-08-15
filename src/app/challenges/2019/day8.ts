import { day } from '../../helpers/day';

export class year2019day8 extends day {
  layerWidth = 25;
  layerHeight = 6;
  private pixels = '';

  override preChallenge(): void {
    this.pixels = this.input[0];
  }

  override part1(): string {
    const layers = this.getLayers();

    let fewestZerosLayer = layers[0];
    let fewestZeros = Infinity;

    for (const layer of layers) {
      const zeros = this.countDigit(layer, 0);
      if (zeros < fewestZeros) {
        fewestZeros = zeros;
        fewestZerosLayer = layer;
      }
    }

    const ones = this.countDigit(fewestZerosLayer, 1);
    const twos = this.countDigit(fewestZerosLayer, 2);

    return `Checksum (1s * 2s on layer with fewest 0s): ${ones * twos}`;
  }

  override part2(): string {
    const layers = this.getLayers();
    const pixelsPerLayer = this.layerWidth * this.layerHeight;
    const image = new Array<number>(pixelsPerLayer).fill(2);

    for (const layer of layers) {
      for (let i = 0; i < pixelsPerLayer; i++) {
        if (image[i] === 2) {
          image[i] = Number(layer[i]);
        }
      }
    }

    const rows: string[] = [];
    for (let y = 0; y < this.layerHeight; y++) {
      let row = '';
      for (let x = 0; x < this.layerWidth; x++) {
        row += image[y * this.layerWidth + x] === 1 ? '#' : '.';
      }
      rows.push(row);
    }

    return `Rendered image:\n${rows.join('\n')}`;
  }

  private getLayers(): string[] {
    const pixelsPerLayer = this.layerWidth * this.layerHeight;
    const layers: string[] = [];

    for (let i = 0; i <= this.pixels.length - pixelsPerLayer; i += pixelsPerLayer) {
      layers.push(this.pixels.substring(i, i + pixelsPerLayer));
    }

    return layers;
  }

  private countDigit(layer: string, digit: number): number {
    let count = 0;

    for (const ch of layer) {
      if (ch === String(digit)) {
        count++;
      }
    }

    return count;
  }
}
