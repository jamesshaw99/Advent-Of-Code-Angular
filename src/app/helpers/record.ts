export class Record {
    private recordData: string[];
    private recordRules: number[];

    constructor(recordData: string[], recordRules: number[]){
        this.recordData = recordData;
        this.recordRules = recordRules;
    }

    getRecordData() {
        return this.recordData;
    }

    getRecordRules() {
        return this.recordRules;
    }

    private duplicateList(originalList: number[], n: number): number[] {
        const duplicatedList: number[] = [];
        for (let i = 0; i < n; i++) {
            duplicatedList.push(...originalList);
        }
        return duplicatedList;
    }

    private duplicateListChar(originalList: string[], n: number): string[] {
        const duplicatedList: string[] = [];
        for (let i = 0; i < n; i++) {
            duplicatedList.push(...originalList);
            if (n !== 1 && i !== (n - 1)) {
                duplicatedList.push('?');
            }
        }
        return duplicatedList;
    }

    unfoldSpringData(n: number): void {
        this.recordData = this.duplicateListChar(this.recordData, n);
        this.recordRules = this.duplicateList(this.recordRules, n);
    }

    toString(): string {
        return `recordData=${JSON.stringify(this.recordData)}, recordRules=${JSON.stringify(this.recordRules)}`;
    }
}