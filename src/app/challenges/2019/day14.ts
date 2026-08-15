import { day } from '../../helpers/day';

interface Ingredient {
  chemical: string;
  amount: number;
}

interface Reaction {
  outputAmount: number;
  inputs: Ingredient[];
}

export class year2019day14 extends day {
  private reactions = new Map<string, Reaction>();

  override preChallenge(): void {
    this.reactions = new Map<string, Reaction>();

    for (const line of this.input) {
      const [inputsPart, outputPart] = line.replace(/\s+/g, '').split('=>');
      const output = this.parseIngredient(outputPart);
      const inputs = inputsPart.split(',').map((part) => this.parseIngredient(part));
      this.reactions.set(output.chemical, { outputAmount: output.amount, inputs });
    }
  }

  override part1(): string {
    return `ORE required for 1 FUEL: ${this.oreForFuel(1)}`;
  }

  override part2(): string {
    return `Max FUEL producible from 1 trillion ORE: ${this.maxFuelForOre(1e12)}`;
  }

  private oreForFuel(fuelAmount: number): number {
    const leftovers = new Map<string, number>();
    const fuelReaction = this.reactions.get('FUEL');
    if (!fuelReaction) {
      return 0;
    }

    let total = 0;
    for (const input of fuelReaction.inputs) {
      total += this.oreNeeded(input.chemical, fuelAmount * input.amount, leftovers);
    }
    return total;
  }

  private oreNeeded(chemical: string, amount: number, leftovers: Map<string, number>): number {
    if (chemical === 'ORE') {
      return amount;
    }

    const reaction = this.reactions.get(chemical);
    if (!reaction) {
      return 0;
    }

    const quantityNeeded = amount - (leftovers.get(chemical) ?? 0);
    const batches = Math.ceil(quantityNeeded / reaction.outputAmount);
    const leftover = reaction.outputAmount * batches - quantityNeeded;

    if (leftover === 0) {
      leftovers.delete(chemical);
    } else {
      leftovers.set(chemical, leftover);
    }

    let total = 0;
    for (const input of reaction.inputs) {
      total += this.oreNeeded(input.chemical, input.amount * batches, leftovers);
    }
    return total;
  }

  private maxFuelForOre(totalOre: number): number {
    let low = 0;
    let high = 1e12;

    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      if (this.oreForFuel(mid) <= totalOre) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }

    return low;
  }

  private parseIngredient(text: string): Ingredient {
    const match = text.match(/^(\d+)([A-Za-z]+)$/);
    if (!match) {
      throw new Error(`Could not parse ingredient: ${text}`);
    }
    return { amount: Number(match[1]), chemical: match[2] };
  }
}
