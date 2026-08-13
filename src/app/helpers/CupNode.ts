export class CupNode {
  public value: number;
  public next!: CupNode;
  public prev!: CupNode;
  public decrementNode?: CupNode;

  constructor(value: number) {
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }
}