import { day } from '../../helpers/day';

export class year2019day22 extends day {
  deckSize = 10007;
  targetCard = 2019;

  cardCount = 119315717514047n;
  shuffleRepeats = 101741582076661n;
  targetPosition = 2020n;

  override part1(): string {
    const deck = this.shuffleOnce(this.initialDeck(this.deckSize), this.input);
    return `Position of card ${this.targetCard}: ${deck.indexOf(this.targetCard)}`;
  }

  override part2(): string {
    const n = this.cardCount;

    let a = 1n;
    let b = 0n;

    for (const line of this.input) {
      let la: bigint;
      let lb: bigint;

      if (line === 'deal into new stack') {
        la = -1n;
        lb = -1n;
      } else if (line.startsWith('deal with increment ')) {
        la = BigInt(line.split(' ')[3]);
        lb = 0n;
      } else if (line.startsWith('cut ')) {
        la = 1n;
        lb = -BigInt(line.split(' ')[1]);
      } else {
        throw new Error(`Unknown shuffle technique: ${line}`);
      }

      a = this.mod(la * a, n);
      b = this.mod(la * b + lb, n);
    }

    const ma = this.modPow(a, this.shuffleRepeats, n);
    const aMinusOneInv = this.modInverse(this.mod(a - 1n, n), n);
    const mb = this.mod(this.mod(ma - 1n, n) * b * aMinusOneInv, n);

    const card = this.mod((this.targetPosition - mb) * this.modInverse(ma, n), n);

    return `Card at position ${this.targetPosition}: ${card}`;
  }

  initialDeck(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i);
  }

  shuffleOnce(deck: number[], techniques: string[]): number[] {
    let result = deck;
    for (const technique of techniques) {
      result = this.applyTechnique(result, technique);
    }
    return result;
  }

  private applyTechnique(deck: number[], line: string): number[] {
    if (line === 'deal into new stack') {
      return deck.slice().reverse();
    }

    if (line.startsWith('deal with increment ')) {
      const n = Number(line.split(' ')[3]);
      const newDeck = new Array<number>(deck.length);
      for (let i = 0; i < deck.length; i++) {
        newDeck[(i * n) % deck.length] = deck[i];
      }
      return newDeck;
    }

    if (line.startsWith('cut ')) {
      const n = Number(line.split(' ')[1]);
      const size = deck.length;
      const shift = ((n % size) + size) % size;
      return [...deck.slice(shift), ...deck.slice(0, shift)];
    }

    throw new Error(`Unknown shuffle technique: ${line}`);
  }

  private mod(value: bigint, modulus: bigint): bigint {
    return ((value % modulus) + modulus) % modulus;
  }

  private modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
    let result = 1n;
    let b = this.mod(base, modulus);
    let exp = exponent;

    while (exp > 0n) {
      if (exp & 1n) {
        result = this.mod(result * b, modulus);
      }
      b = this.mod(b * b, modulus);
      exp >>= 1n;
    }

    return result;
  }

  private modInverse(value: bigint, modulus: bigint): bigint {
    return this.modPow(value, modulus - 2n, modulus);
  }
}
