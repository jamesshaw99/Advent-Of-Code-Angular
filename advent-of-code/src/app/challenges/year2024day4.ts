import { day } from '../helpers/day';

export class year2024day4 extends day {
  override part1(): string {
    const word = 'XMAS';
    const wordLength = word.length;
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ];

    const numRows = this.input.length;
    const numCols = this.input[0].length;
    let count = 0;

    const canFindWord = (
      r: number,
      c: number,
      dr: number,
      dc: number
    ): boolean => {
      for (let i = 0; i < wordLength; i++) {
        const nr = r + dr * i;
        const nc = c + dc * i;
        if (
          nr < 0 ||
          nr >= numRows ||
          nc < 0 ||
          nc >= numCols ||
          this.input[nr][nc] !== word[i]
        ) {
          return false;
        }
      }
      return true;
    };

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        for (let [dr, dc] of directions) {
          if (canFindWord(r, c, dr, dc)) {
            count++;
          }
        }
      }
    }

    return `The word 'XMAS' appears ${count} times`;
  }

  override part2(): string {
    let count: number = 0;

    for (let i = 0; i < this.input.length; i++) {
        for (let j = 0; j < this.input[i].length; j++) {
            const c = this.input[i][j];
            if (c === "A") {
                const tl = this.input[i - 1]?.[j - 1];
                const br = this.input[i + 1]?.[j + 1];

                const bl = this.input[i + 1]?.[j - 1];
                const tr = this.input[i - 1]?.[j + 1];

                const ltMatch = (tl === "M" && br === "S") || (tl === "S" && br === "M");
                const blMatch = (bl === "M" && tr === "S") || (bl === "S" && tr === "M");

                if (ltMatch && blMatch) {
                    count += 1;
                }
            }
        }
    }

    return `An X-MAS appears ${count} times`;
  }
}
