export class Symbol {
  private x = 0;
  private y = 0;
  private val = '';

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
