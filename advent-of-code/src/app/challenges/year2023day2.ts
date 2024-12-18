import { day } from '../helpers/day';
import { Game } from '../helpers/game';

export class year2023day2 extends day {
  private games: Game[] = [];

  override preChallenge(): void {
    for (const line of this.input) {
      const split = line.split(':');
      const gameNo = parseInt(split[0].replace('Game ', ''));
      const game = new Game(gameNo);
      for (const hand of split[1].split(';')) {
        game.update(
          this.extractColorCount(hand, 'red'),
          this.extractColorCount(hand, 'green'),
          this.extractColorCount(hand, 'blue')
        );
      }
      this.games.push(game);
    }
  }

  override part1(): string {
    const idSum = this.games
      .filter(
        (game) =>
          game.getRed() <= 12 && game.getGreen() <= 13 && game.getBlue() <= 14
      )
      .reduce((sum, game) => sum + game.getGameNo(), 0);
    return 'Sum of possible games: ' + idSum;
  }

  override part2(): string {
    const power = this.games.reduce((sum, game) => sum + game.getPower(), 0);
    return 'Sum of each games power: ' + power;
  }

  private extractColorCount(input: string, color: string): number {
    const pattern = new RegExp(`(\\d+)\\s+${color}`);
    const matcher = pattern.exec(input);
    return matcher ? parseInt(matcher[1]) : 0;
  }
}
