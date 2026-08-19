import { day } from '../../helpers/day';

const MODULUS = 16777216n;

export class year2024day22 extends day {
  initialSecrets: bigint[] = [];

  override preChallenge(): void {
    this.initialSecrets = this.input
      .filter((line) => line.trim() !== '')
      .map((line) => BigInt(line.trim()));
  }

  override part1(): string {
    const sum = this.initialSecrets.reduce(
      (total, secret) => total + this.generateSecret(secret, 2000),
      0n
    );

    return `Sum of the 2000th secret numbers: ${sum}`;
  }

  override part2(): string {
    const mostBananas = this.findMostBananas();
    return `Most bananas obtainable: ${mostBananas}`;
  }

  computePrices(initial: bigint, steps: number): number[] {
    const prices: number[] = [Number(initial % 10n)];
    let secret = initial;

    for (let i = 0; i < steps; i++) {
      secret = this.nextSecret(secret);
      prices.push(Number(secret % 10n));
    }

    return prices;
  }

  findMostBananas(): number {
    const totalsBySequence = new Map<string, number>();

    for (const initial of this.initialSecrets) {
      const prices = this.computePrices(initial, 2000);
      const seen = new Set<string>();

      for (let i = 0; i + 4 < prices.length; i++) {
        const key = [
          prices[i + 1] - prices[i],
          prices[i + 2] - prices[i + 1],
          prices[i + 3] - prices[i + 2],
          prices[i + 4] - prices[i + 3],
        ].join(',');

        if (seen.has(key)) continue;
        seen.add(key);

        totalsBySequence.set(key, (totalsBySequence.get(key) ?? 0) + prices[i + 4]);
      }
    }

    return Math.max(0, ...totalsBySequence.values());
  }

  nextSecret(secret: bigint): bigint {
    secret = this.prune(this.mix(secret, secret * 64n));
    secret = this.prune(this.mix(secret, secret / 32n));
    secret = this.prune(this.mix(secret, secret * 2048n));
    return secret;
  }

  generateSecret(initial: bigint, steps: number): bigint {
    let secret = initial;
    for (let i = 0; i < steps; i++) {
      secret = this.nextSecret(secret);
    }
    return secret;
  }

  mix(secret: bigint, value: bigint): bigint {
    return secret ^ value;
  }

  prune(secret: bigint): bigint {
    return secret % MODULUS;
  }
}
