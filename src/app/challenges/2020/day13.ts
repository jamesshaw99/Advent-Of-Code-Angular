import { day } from '../../helpers/day';

interface BusInfo {
  id: number;
  offset: number;
}

export class year2020day13 extends day {
  private earliestTimestamp = 0;
  private busSchedule: string[] = [];

  override preChallenge(): void {
    this.earliestTimestamp = parseInt(this.input[0]);
    this.busSchedule = this.input[1].split(',');
  }

  override part1(): string {
    let bestBusId = 0;
    let shortestWait = Infinity;

    for (const busStr of this.busSchedule) {
      if (busStr !== 'x') {
        const busId = parseInt(busStr);
        const nextDeparture = Math.ceil(this.earliestTimestamp / busId) * busId;
        const waitTime = nextDeparture - this.earliestTimestamp;

        if (waitTime < shortestWait) {
          shortestWait = waitTime;
          bestBusId = busId;
        }
      }
    }

    return `Earliest bus * minutes needed to wait: ${bestBusId * shortestWait}`;
  }

  override part2(): string {
    const buses: BusInfo[] = this.busSchedule
      .map((busStr, index) => ({ busStr, index }))
      .filter(({ busStr }) => busStr !== 'x')
      .map(({ busStr, index }) => ({
        id: parseInt(busStr),
        offset: index,
      }));

    return `Earliest timestamp for all busses: ${this.chineseRemainderTheorem(
      buses
    )}`;
  }

  private chineseRemainderTheorem(buses: BusInfo[]): number {
    const moduli = buses.map((bus) => bus.id);
    const remainders = buses.map((bus) => {
      const remainder = -bus.offset % bus.id;
      return remainder < 0 ? remainder + bus.id : remainder;
    });

    const N = moduli.reduce((product, modulus) => product * modulus, 1);

    let result = 0;
    for (let i = 0; i < moduli.length; i++) {
      const Ni = N / moduli[i];
      const Mi = this.modularInverse(Ni, moduli[i]);
      result += remainders[i] * Ni * Mi;
    }

    return ((result % N) + N) % N;
  }

  private modularInverse(a: number, m: number): number {
    const originalM = m;
    let x0 = 0,
      x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
      const q = Math.floor(a / m);
      let t = m;

      m = a % m;
      a = t;
      t = x0;

      x0 = x1 - q * x0;
      x1 = t;
    }

    if (x1 < 0) x1 += originalM;

    return x1;
  }
}
