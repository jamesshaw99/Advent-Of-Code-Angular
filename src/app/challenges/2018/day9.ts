import { day } from '../../helpers/day';

class MarbleNode {
  next!: MarbleNode;
  prev!: MarbleNode;

  constructor(public value: number) {}
}

export class year2018day9 extends day {
  private playerCount = 0;
  private lastMarble = 0;

  override preChallenge(): void {
    const match = this.input[0].match(/(\d+) players; last marble is worth (\d+) points/);
    if (!match) {
      throw new Error(`Could not parse input: ${this.input[0]}`);
    }
    this.playerCount = Number(match[1]);
    this.lastMarble = Number(match[2]);
  }

  override part1(): string {
    return `Winning score: ${this.play(this.lastMarble)}`;
  }

  override part2(): string {
    return `Winning score with 100x marbles: ${this.play(this.lastMarble * 100)}`;
  }

  private play(lastMarble: number): number {
    const scores = new Array(this.playerCount).fill(0);

    let current = new MarbleNode(0);
    current.next = current;
    current.prev = current;

    for (let marble = 1; marble <= lastMarble; marble++) {
      if (marble % 23 === 0) {
        for (let i = 0; i < 7; i++) {
          current = current.prev;
        }

        const player = (marble - 1) % this.playerCount;
        scores[player] += marble + current.value;

        current.prev.next = current.next;
        current.next.prev = current.prev;
        current = current.next;
      } else {
        const left = current.next;
        const right = left.next;
        const inserted = new MarbleNode(marble);

        left.next = inserted;
        inserted.prev = left;
        inserted.next = right;
        right.prev = inserted;

        current = inserted;
      }
    }

    return Math.max(...scores);
  }
}
