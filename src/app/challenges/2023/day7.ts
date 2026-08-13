import { day } from "../../helpers/day";

class Hand {
    private handString: string;
    private bid: number;
    private type: number;
    private cards = '23456789TJQKA';
    private handsRecognizer: HandsRecognizer = new HandsRecognizer();

    constructor(handString: string, bid: number) {
        this.handString = handString;
        this.bid = bid;
        this.type = this.handsRecognizer.recognizePokerHand(handString.split(""));
    }

    updateType(): void {
        this.cards = 'J23456789TQKA';
        this.type = this.handsRecognizer.recognizePokerHand(this.handString.split(""), true);
    }

    getBid(): number {
        return this.bid;
    }

    compareTo(other: Hand): number {
        if (this.type !== other.type) {
            return this.type - other.type;
        } else {
            for (let i = 0; i < this.handString.length; i++) {
                if (this.handString.charAt(i) !== other.handString.charAt(i)) {
                    return this.cards.indexOf(this.handString.charAt(i)) - this.cards.indexOf(other.handString.charAt(i));
                }
            }
            return 0;
        }
    }
}

class HandsRecognizer {
    private part2 = false;

    recognizePokerHand(hand: string[], part2?: boolean): number {
        if (part2 !== undefined) {
            this.part2 = part2;
        }
        return this.recognizePokerHandInternal(hand);
    }

    private recognizePokerHandInternal(hand: string[]): number {
        const sortedHand = [...hand].sort();

        if (this.hasNOfAKind(sortedHand, 5)) return 6;
        else if (this.hasNOfAKind(sortedHand, 4)) return 5;
        else if (this.isFullHouse(sortedHand)) return 4;
        else if (this.hasNOfAKind(sortedHand, 3)) return 3;
        else if (this.isTwoPair(sortedHand)) return 2;
        else return this.hasNOfAKind(sortedHand, 2) ? 1 : 0;
    }

    private isFullHouse(hand: string[]): boolean {
        return this.hasNOfAKind(hand, 3) && this.hasNOfAKind(hand, 2);
    }

    private isTwoPair(hand: string[]): boolean {
        let pairCount = 0;
        for (let i = 1; i < hand.length; i++) {
            if (hand[i] === hand[i - 1]) pairCount++;
        }
        return pairCount === 2;
    }

    private hasNOfAKind(hand: string[], n: number): boolean {
        if (this.part2) {
            // Find most common non-J card
            const nonJCards = hand.filter(s => s !== "J");
            const cardCounts = new Map<string, number>();
            
            for (const card of nonJCards) {
                cardCounts.set(card, (cardCounts.get(card) || 0) + 1);
            }

            let mostCommonCard = "J";
            let maxCount = 0;
            let highestValue = -1;

            for (const [card, count] of cardCounts.entries()) {
                const cardValue = 'J23456789TQKA'.indexOf(card);
                if (count > maxCount || (count === maxCount && cardValue > highestValue)) {
                    mostCommonCard = card;
                    maxCount = count;
                    highestValue = cardValue;
                }
            }

            // Replace all J's with the most common card
            hand = hand.map(s => s === "J" ? mostCommonCard : s);
        }

        // Count occurrences of each card
        const cardCounts = new Map<string, number>();
        for (const card of hand) {
            cardCounts.set(card, (cardCounts.get(card) || 0) + 1);
        }

        // Check if any card appears n times
        for (const count of cardCounts.values()) {
            if (count === n) {
                return true;
            }
        }
        return false;
    }
}

export class year2023day7 extends day {
    private hands: Hand[] = [];

    override preChallenge(): void {
        for (const line of this.input) {
            const parts = line.split(" ");
            const handString = parts[0];
            const bid = parseInt(parts[1]);
            this.hands.push(new Hand(handString, bid));
        }
    }

    override part1(): string {
        return `Total Winnings: ${this.calculateWinnings()}`;
    }

    override part2(): string {
        this.hands.forEach(hand => hand.updateType());
        return `Total Winnings: ${this.calculateWinnings()}`;
    }

    private calculateWinnings(): number {
        this.hands.sort((a, b) => a.compareTo(b));
        let totalWinnings = 0;

        for (let i = 0; i < this.hands.length; i++) {
            const hand = this.hands[i];
            totalWinnings += (i + 1) * hand.getBid();
        }
        return totalWinnings;
    }
}