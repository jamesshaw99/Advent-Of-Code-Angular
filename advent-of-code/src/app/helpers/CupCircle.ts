import { CupNode } from "./CupNode";

export class CupCircle {
  private currentCup: CupNode;
  private cupLookup = new Map<number, CupNode>();
  private maxValue: number;

  constructor(initialValues: number[], totalCups: number = initialValues.length) {
    this.maxValue = Math.max(...initialValues, totalCups);
    this.currentCup = this.buildCircle(initialValues, totalCups);
    this.buildDecrementLinks();
  }

  private buildCircle(initialValues: number[], totalCups: number): CupNode {
    const firstCup = new CupNode(initialValues[0]);
    this.cupLookup.set(initialValues[0], firstCup);
    
    let current = firstCup;
    
    for (let i = 1; i < initialValues.length; i++) {
      const newCup = new CupNode(initialValues[i]);
      this.cupLookup.set(initialValues[i], newCup);
      
      current.next = newCup;
      newCup.prev = current;
      current = newCup;
    }
    
    for (let i = initialValues.length + 1; i <= totalCups; i++) {
      const newCup = new CupNode(i);
      this.cupLookup.set(i, newCup);
      
      current.next = newCup;
      newCup.prev = current;
      current = newCup;
    }
    
    current.next = firstCup;
    firstCup.prev = current;
    
    return firstCup;
  }

  private buildDecrementLinks(): void {
    for (const [value, node] of this.cupLookup) {
      const decrementValue = value === 1 ? this.maxValue : value - 1;
      node.decrementNode = this.cupLookup.get(decrementValue);
    }
  }

  public playRound(): void {
    const pickedUp = this.removeNext3Cups();
    
    const destination = this.findDestination(pickedUp);
    
    this.insertCupsAfter(destination, pickedUp);
    
    this.currentCup = this.currentCup.next;
  }

  private removeNext3Cups(): CupNode[] {
    const cups: CupNode[] = [];
    let current = this.currentCup.next;
    
    for (let i = 0; i < 3; i++) {
      cups.push(current);
      current = current.next;
    }
    
    this.currentCup.next = current;
    current.prev = this.currentCup;
    
    return cups;
  }

  private findDestination(pickedUp: CupNode[]): CupNode {
    const pickedUpValues = new Set(pickedUp.map(cup => cup.value));
    let destination = this.currentCup.decrementNode!;
    
    while (pickedUpValues.has(destination.value)) {
      destination = destination.decrementNode!;
    }
    
    return destination;
  }

  private insertCupsAfter(destination: CupNode, cups: CupNode[]): void {
    if (cups.length === 0) return;
    
    const afterDestination = destination.next;
    const firstCup = cups[0];
    const lastCup = cups[cups.length - 1];
    
    destination.next = firstCup;
    firstCup.prev = destination;
    
    lastCup.next = afterDestination;
    afterDestination.prev = lastCup;
  }

  public getResultAfterCup1(): string {
    const cup1 = this.cupLookup.get(1);
    if (!cup1) throw new Error('Cup 1 not found');
    
    const result: string[] = [];
    let current = cup1.next;
    
    while (current.value !== 1) {
      result.push(current.value.toString());
      current = current.next;
    }
    
    return result.join('');
  }

  public getProductAfterCup1(): number {
    const cup1 = this.cupLookup.get(1);
    if (!cup1) throw new Error('Cup 1 not found');
    
    return cup1.next.value * cup1.next.next.value;
  }
}