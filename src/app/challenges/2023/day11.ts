import { day } from '../../helpers/day';

export class year2023day11 extends day {
    emptyRows: number[] = [];
    emptyCols: number[] = [];
    galaxies: number[][] = [];

    override preChallenge(): void {
        for(let i = 0; i < this.input.length; i++){
            const row = this.input[i];
            if(!row.includes('#')){
                this.emptyRows.push(i);
            }
            for(let j = 0; j < row.length; j++){
                if(row.charAt(j) != '.'){
                    this.galaxies.push([i, j]);
                }
            }
        }

        for(let j = 0; j < this.input[0].length; j++){
            let isEmptyCol = true;
            for(const row of this.input){
                if(row.charAt(j) != '.'){
                    isEmptyCol = false;
                    break;
                }
            }
            if(isEmptyCol) {
                this.emptyCols.push(j);
            }
        }
    }

    override part1(): string {
        return `Sum of shortest paths: ${this.computeTotalDistance(2)}`;
    }

    override part2(): string {
        return `Sum of shortest paths: ${this.computeTotalDistance(1000000)}`;
    }

    computeTotalDistance(expansionRatio: number): number {
        let totalDistance = 0;

        for(let i = 0; i < this.galaxies.length - 1; i++){
            const srcGalaxy = this.findLocationAfterExpansion(this.galaxies[i], expansionRatio);
            for(let j = i + 1; j < this.galaxies.length; j++){
                const dstGalaxy = this.findLocationAfterExpansion(this.galaxies[j], expansionRatio);
                totalDistance += Math.abs(srcGalaxy[0] - dstGalaxy[0]) + Math.abs(srcGalaxy[1] - dstGalaxy[1]);
            }
        }
        return totalDistance;
    }

    findLocationAfterExpansion(pos: number[], expansionRatio: number): number[] {
        const x = pos[0];
        const y = pos[1];
        expansionRatio--;

        let expandedX = 0;
        let expandedY = 0;
        for(const row of this.emptyRows){
            if(x > row){
                expandedX += expansionRatio;
            }
        }
        for(const col of this.emptyCols) {
            if(y > col){
                expandedY += expansionRatio;
            }
        }
        return [x + expandedX, y + expandedY];
    }
}
