import { day } from "../../helpers/day";
import { Record } from "../../helpers/record";

export class year2023day12 extends day {
    private cache = new Map<string, number>();

    override part1(): string {
        return `Total arrangements: ${this.findResults(false)}`;
    }

    override part2(): string {
        return `Total arrangements: ${this.findResults(true)}`;
    }

    findResults(part2: boolean): number {
        const records = this.buildRecordList();

        const result = records.map(record => {
            if (part2) {
                record.unfoldSpringData(5);
                return this.checkDamagedSpringData(record.getRecordData(), record.getRecordRules());
            } else {
                const possibleValues = this.generateCombinations(record.getRecordData(), record.getRecordRules());
                return possibleValues.filter(possibleRecord => 
                    this.isRecordValidSoFar(possibleRecord, [...record.getRecordRules()])
                ).length;
            }
        }).reduce((sum, current) => sum + current, 0);

        return result;
    }

    private isRecordValidSoFar(record: string[], damagedSprings: number[]): boolean {
        const localDamagedSpringRules = [...damagedSprings];
        let validRecord = true;
        let inSpringConnection = false;
        let currentCheck = localDamagedSpringRules.length === 0 ? null : localDamagedSpringRules.shift();

        for (const character of record) {
            if (character === '?') return true;

            if (currentCheck === 0) {
                inSpringConnection = false;
                if (character === '.') {
                    if (localDamagedSpringRules.length > 0) {
                        currentCheck = localDamagedSpringRules.shift();
                    }
                } else {
                    validRecord = false;
                    break;
                }
            } else {
                if (character === '.') {
                    if (inSpringConnection) {
                        validRecord = false;
                        break;
                    }
                    continue;
                }

                if (character === '#') {
                    currentCheck = currentCheck! - 1;
                    inSpringConnection = true;
                } else {
                    validRecord = false;
                    break;
                }
            }
        }

        return validRecord && localDamagedSpringRules.length === 0 && currentCheck === 0;
    }

    private generateCombinations(brokenRecordData: string[], rules: number[]): string[][] {
        const indexOfMissingValue = brokenRecordData.findIndex(char => char === '?');

        if (indexOfMissingValue === -1) {
            return [brokenRecordData];
        }

        const result: string[][] = [];
        if (this.isRecordValidSoFar(brokenRecordData, [...rules])) {
            const result1 = this.generateCombinations(this.replaceChar(brokenRecordData, '.', indexOfMissingValue), rules);
            const result2 = this.generateCombinations(this.replaceChar(brokenRecordData, '#', indexOfMissingValue), rules);
            result.push(...result1);
            result.push(...result2);
        }

        return result;
    }

    private replaceChar(brokenRecordData: string[], character: string, index: number): string[] {
        const copyRecordSpring = [...brokenRecordData];
        copyRecordSpring[index] = character;
        return copyRecordSpring;
    }

    private buildRecordList(): Record[] {
        return this.input.map(stringValue => {
            const parts = stringValue.split(" ");
            const recordData = parts[0].split('');
            const recordRules = parts[1].split(",").map(Number);
            return new Record(recordData, recordRules);
        });
    }

    private checkDamagedSpringData(record: string[], damagedSprings: number[]): number {
        let result = 0;
        const cacheKey = JSON.stringify(record) + JSON.stringify(damagedSprings);

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        if (damagedSprings.length === 0) {
            const computedResult = record.includes('#') ? 0 : 1;
            this.cache.set(cacheKey, computedResult);
            return computedResult;
        }

        const current = damagedSprings[0];
        const remainingSprings = damagedSprings.slice(1);

        for (let i = 0; i < record.length - this.sum(remainingSprings) - remainingSprings.length - current + 1; i++) {
            if (record.slice(0, i).includes('#')) {
                break;
            }

            const nxt = i + current;
            if (nxt <= record.length && 
                record.slice(i, nxt).every(ch => ch !== '.') &&
                (nxt === record.length || record[nxt] !== '#')) {
                const nextRecord = nxt + 1 < record.length ? record.slice(nxt + 1) : [];
                result += this.checkDamagedSpringData(nextRecord, remainingSprings);
            }
        }

        this.cache.set(cacheKey, result);
        return result;
    }

    private sum(values: number[]): number {
        return values.reduce((sum, current) => sum + current, 0);
    }
}