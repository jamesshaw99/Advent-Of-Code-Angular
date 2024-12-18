export class Symbol {
  private x: number = 0;
  private y: number = 0;
  private val: string = '';

  constructor(x: number, y: number, val: string) {
    this.x = x;
    this.y = y;
    this.val = val;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getVal(): string {
    return this.val;
  }
}
