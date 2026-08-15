import { day } from '../../helpers/day';
import { Cluster } from '../../helpers/intcode/cluster';

export class year2019day23 extends day {
  private text = '';

  override preChallenge(): void {
    this.text = this.input[0];
  }

  override async part1(): Promise<string> {
    const cluster = new Cluster(this.text, 50);
    let firstNatY = -1;

    await cluster.runNetwork((_x, y) => {
      firstNatY = y;
      return true;
    });

    return `${firstNatY}`;
  }

  override async part2(): Promise<string> {
    const cluster = new Cluster(this.text, 50);
    let lastSentY: number | null = null;
    let firstRepeatedY = -1;

    await cluster.runNetwork(
      () => false,
      (_x, y) => {
        const isRepeat = y === lastSentY;
        lastSentY = y;
        if (isRepeat) {
          firstRepeatedY = y;
          return true;
        }
        return false;
      }
    );

    return `${firstRepeatedY}`;
  }
}
