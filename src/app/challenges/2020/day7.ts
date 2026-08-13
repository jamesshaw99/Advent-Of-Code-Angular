import { day } from "../../helpers/day";

interface BagRule {
  color: string;
  contents: Map<string, number>;
}

export class year2020day7 extends day {
private bagRules = new Map<string, BagRule>();

  override preChallenge(): void {
    for (const rule of this.input) {
      const bagRule = this.parseRule(rule);
      this.bagRules.set(bagRule.color, bagRule);
    }
  }

  override part1(): string {
    const canContainGold = new Set<string>();
    
    for (const [bagColor] of this.bagRules) {
      if (bagColor !== 'shiny gold' && this.canEventuallyContain(bagColor, 'shiny gold')) {
        canContainGold.add(bagColor);
      }
    }

    return `Number of bag colours: ${canContainGold.size}`;
  }

  override part2(): string {
    const totalBags = this.countTotalBags('shiny gold');
    return `Number of bags required: ${totalBags}`;
  }

  private parseRule(rule: string): BagRule {
    const [colorPart, contentsPart] = rule.split(' bags contain ');
    const color = colorPart.trim();
    const contents = new Map<string, number>();

    if (!contentsPart.includes('no other bags')) {
      const matches = contentsPart.matchAll(/(\d+) ([^,]+?) bags?/g);
      
      for (const match of matches) {
        const count = parseInt(match[1]);
        const bagColor = match[2].trim();
        contents.set(bagColor, count);
      }
    }

    return { color, contents };
  }

  private canEventuallyContain(bagColor: string, targetColor: string, visited = new Set<string>()): boolean {
    if (visited.has(bagColor)) {
      return false;
    }
    
    visited.add(bagColor);
    const bagRule = this.bagRules.get(bagColor);
    
    if (!bagRule) {
      return false;
    }

    if (bagRule.contents.has(targetColor)) {
      return true;
    }

    for (const [containedColor] of bagRule.contents) {
      if (this.canEventuallyContain(containedColor, targetColor, new Set(visited))) {
        return true;
      }
    }

    return false;
  }

  private countTotalBags(bagColor: string, memo = new Map<string, number>()): number {
    if (memo.has(bagColor)) {
      return memo.get(bagColor)!;
    }

    const bagRule = this.bagRules.get(bagColor);
    if (!bagRule) {
      return 0;
    }

    let total = 0;
    for (const [containedColor, count] of bagRule.contents) {
      total += count + (count * this.countTotalBags(containedColor, memo));
    }

    memo.set(bagColor, total);
    return total;
  }
}