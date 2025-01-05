import { day } from '../../helpers/day';
import { PartNo } from '../../helpers/partNo';
import { Symbol } from '../../helpers/symbol';

export class year2023day3 extends day {
  private partNos: PartNo[] = [];
  private symbols: Symbol[] = [];

  override preChallenge(): void {
    for (let y = 0; y < this.input.length; y++) {
      const line = this.input[y];
      let partNo: PartNo | null = null;
      for (let x = 0; x < line.length; x++) {
        const character = line.charAt(x);
        if (/\d/.test(character)) {
          if (partNo === null) {
            partNo = new PartNo(x, y, character);
          } else {
            partNo.appendNumber(character);
          }
        } else {
          if (partNo !== null) {
            this.partNos.push(partNo);
            partNo = null;
          }
          if (character !== '.') {
            this.symbols.push(new Symbol(x, y, character));
          }
        }
      }
      if (partNo !== null) {
        this.partNos.push(partNo);
      }
    }
  }

  override part1(): string {
    const total = this.partNos
      .filter((partNo) =>
        this.symbols.some((symbol) => partNo.hasSymbol(symbol))
      )
      .map((partNo) => partNo.getNumberAsInt())
      .reduce((a, b) => a + b, 0);
    return `Sum of part numbers: ${total}`;
  }

  override part2(): string {
    const total = this.symbols
      .filter((symbol) => symbol.getVal() === '*')
      .map((symbol) => {
        const partNumbers = this.partNos
          .filter((partNo) => partNo.hasSymbol(symbol))
          .map((partNo) => partNo.getNumberAsInt());
        if (partNumbers.length !== 1) {
          return partNumbers.reduce((a, b) => a * b, 1);
        }
        return 0;
      })
      .reduce((a, b) => a + b, 0);
    return `Sum of the gear ratios: ${total}`;
  }
}
