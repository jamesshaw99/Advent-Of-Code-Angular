import { day } from '../helpers/day';

export class year2024day1 extends day {
  leftList: number[] = [];
  rightList: number[] = [];

  override preChallenge(): void {
    for (const line of this.input) {
      const [left, right] = line.split(/\s+/).map(Number);
      this.leftList.push(left);
      this.rightList.push(right);
    }
  }

  override part1(): string {
    const totalDistance = this.calculateTotalDistance(
      this.leftList,
      this.rightList
    );
    return `Total Distance: ${totalDistance}`;
  }

  override part2():string {
    const similarityScore = this.calculateSimilarityScore(
      this.leftList,
      this.rightList
    );
    return `Similarity Score: ${similarityScore}`;
  }

  calculateTotalDistance(leftList: number[], rightList: number[]): number {
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    let totalDistance = 0;

    for (let i = 0; i < leftList.length; i++) {
      totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
  }

  calculateSimilarityScore(leftList: number[], rightList: number[]): number {
    const frequencyMap = new Map<number, number>();

    for (const num of rightList) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let similarityScore = 0;
    for (const num of leftList) {
        const count = frequencyMap.get(num) || 0;
        similarityScore += num * count;
    }

    return similarityScore;
}
}
