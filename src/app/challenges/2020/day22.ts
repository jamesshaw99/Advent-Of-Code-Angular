import { day } from "../../helpers/day";
import { Deck } from "../../helpers/deck";

export class year2020day22 extends day {
  private player1Start: number[] = [];
  private player2Start: number[] = [];

  override preChallenge(): void {
    let currentPlayer: 'player1' | 'player2' | null = null;
    
    for (const line of this.input) {
      if (line === 'Player 1:') {
        currentPlayer = 'player1';
      } else if (line === 'Player 2:') {
        currentPlayer = 'player2';
      } else if (line.trim() && currentPlayer) {
        const card = parseInt(line);
        if (currentPlayer === 'player1') {
          this.player1Start.push(card);
        } else {
          this.player2Start.push(card);
        }
      }
    }
  }

  override part1(): string {
    const player1 = new Deck(this.player1Start);
    const player2 = new Deck(this.player2Start);
    
    while (!player1.isEmpty() && !player2.isEmpty()) {
      const card1 = player1.drawCard();
      const card2 = player2.drawCard();
      
      if (card1 > card2) {
        player1.addCards(card1, card2);
      } else {
        player2.addCards(card2, card1);
      }
    }
    
    const winner = player1.isEmpty() ? player2 : player1;
    return `Winning player's score: ${winner.calculateScore()}`;
  }

  override part2(): string {
    const player1 = new Deck(this.player1Start);
    const player2 = new Deck(this.player2Start);
    
    const player1Wins = this.playRecursiveCombat(player1, player2);
    const winner = player1Wins ? player1 : player2;
    
    return `Winning player's score: ${winner.calculateScore()}`;
  }

  private playRecursiveCombat(player1: Deck, player2: Deck): boolean {
    const gameStates = new Set<string>();
    
    while (!player1.isEmpty() && !player2.isEmpty()) {
      const stateHash = `${player1.getStateHash()}|${player2.getStateHash()}`;
      
      if (gameStates.has(stateHash)) {
        return true;
      }
      gameStates.add(stateHash);
      
      const card1 = player1.drawCard();
      const card2 = player2.drawCard();
      
      let player1Wins: boolean;
      
      if (player1.canRecurse(card1) && player2.canRecurse(card2)) {
        const subDeck1 = player1.getSubDeck(card1);
        const subDeck2 = player2.getSubDeck(card2);
        player1Wins = this.playRecursiveCombat(subDeck1, subDeck2);
      } else {
        player1Wins = card1 > card2;
      }
      
      if (player1Wins) {
        player1.addCards(card1, card2);
      } else {
        player2.addCards(card2, card1);
      }
    }
    
    return !player1.isEmpty();
  }
}