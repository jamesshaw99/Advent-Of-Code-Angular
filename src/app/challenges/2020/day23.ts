import { CupCircle } from "../../helpers/CupCircle";
import { day } from "../../helpers/day";

export class year2020day23 extends day {
  private initialCups: number[] = [];

  override preChallenge(): void {
    this.initialCups = this.input[0].split('').map(Number);
  }

  override part1(): string {
    const cupCircle = new CupCircle(this.initialCups);
    
    for (let i = 0; i < 100; i++) {
      cupCircle.playRound();
    }
    
    return `Labels on cups after 100 moves: ${cupCircle.getResultAfterCup1()}`;
  }

  override part2(): string {
    const cupCircle = new CupCircle(this.initialCups, 1000000);
    
    for (let i = 0; i < 10000000; i++) {
      cupCircle.playRound();
    }
    
    return `Product of labels after ten million moves: ${cupCircle.getProductAfterCup1()}`;
  }
}