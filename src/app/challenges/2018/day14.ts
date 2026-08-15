import { day } from '../../helpers/day';

export class year2018day14 extends day {
  private inputText = '';

  override preChallenge(): void {
    this.inputText = this.input[0];
  }

  override part1(): string {
    const target = Number(this.inputText);
    const recipes = [3, 7];
    let elf1 = 0;
    let elf2 = 1;

    while (recipes.length < target + 10) {
      this.createRecipes(recipes, elf1, elf2);
      elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
      elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;
    }

    return `Next ten recipe scores: ${recipes.slice(target, target + 10).join('')}`;
  }

  override part2(): string {
    const targetDigits = [...this.inputText].map(Number);
    const recipes = [3, 7];
    let elf1 = 0;
    let elf2 = 1;

    while (true) {
      const added = this.createRecipes(recipes, elf1, elf2);
      elf1 = (elf1 + 1 + recipes[elf1]) % recipes.length;
      elf2 = (elf2 + 1 + recipes[elf2]) % recipes.length;

      for (let i = 0; i < added.length; i++) {
        const endIndex = recipes.length - added.length + i + 1;
        if (this.endsWith(recipes, endIndex, targetDigits)) {
          return `Recipes to the left of the match: ${endIndex - targetDigits.length}`;
        }
      }
    }
  }

  private createRecipes(recipes: number[], elf1: number, elf2: number): number[] {
    const sum = recipes[elf1] + recipes[elf2];
    const digits = sum >= 10 ? [Math.floor(sum / 10), sum % 10] : [sum];
    recipes.push(...digits);
    return digits;
  }

  private endsWith(recipes: number[], endIndex: number, targetDigits: number[]): boolean {
    const startIndex = endIndex - targetDigits.length;
    if (startIndex < 0) {
      return false;
    }
    for (let i = 0; i < targetDigits.length; i++) {
      if (recipes[startIndex + i] !== targetDigits[i]) {
        return false;
      }
    }
    return true;
  }
}
