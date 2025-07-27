export class Display {
    private numberCodes: Set<string>[] = new Array(10);

    matchStringAndNumber(code: string, digit: number): void {
        this.numberCodes[digit] = new Set(code);
    }

    getNumber(value: string): number {
        const valueSet = new Set(value);
        
        for (let i = 0; i < 10; i++) {
            if (this.numberCodes[i] && 
                valueSet.size === this.numberCodes[i].size &&
                this.setsEqual(valueSet, this.numberCodes[i])) {
                return i;
            }
        }
        return -1;
    }

    private setsEqual(set1: Set<string>, set2: Set<string>): boolean {
        return [...set1].every(item => set2.has(item));
    }
}