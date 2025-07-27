import { day } from "../../helpers/day";
import { Point } from "../../models/point";

export class year2020day3 extends day {
  override part1(): string {
    return `We would encounter ${this.countTrees(3, 1)} trees`;
  }

  override part2(): string {
    const slopes: Point[] = [
      {x: 1, y: 1},
      {x: 3, y: 1}, 
      {x: 5, y: 1},
      {x: 7, y: 1},
      {x: 1, y: 2}
    ];

    const product = slopes
      .map((point) => this.countTrees(point.x, point.y))
      .reduce((acc, trees) => acc * trees, 1);

    return `Product of trees on each slope: ${product}`;
  }

  private countTrees(deltaX: number, deltaY: number): number {
    const width = this.input[0].length;
    const height = this.input.length;
    let x = 0;
    let y = 0;
    let treeCount = 0;

    while (y < height) {
      if (this.input[y][x] === '#') {
        treeCount++;
      }
      
      x = (x + deltaX) % width;
      y += deltaY;
    }

    return treeCount;
  }
}