import { Symbol } from "./symbol";

export class PartNo {
  private x: number;
  private y: number;
  private number: string;

  constructor(x: number, y: number, no: string) {
    this.x = x;
    this.y = y;
    this.number = no;
  }

  public appendNumber(no: string): void {
    this.number += no;
  }

  public hasSymbol(symbol: Symbol): boolean {
    for (let i = 0; i < this.number.length; i++) {
      if (Math.hypot(this.x + i - symbol.getX(), this.y - symbol.getY()) < 2) {
        return true;
      }
    }
    return false;
  }

  public getNumberAsInt(): number {
    return parseInt(this.number, 10);
  }
}
