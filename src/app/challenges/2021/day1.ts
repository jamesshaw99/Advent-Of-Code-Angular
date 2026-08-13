import { day } from "../../helpers/day";

export class year2021day1 extends day {
    depths: number[] = [];

    override preChallenge(): void {
        this.depths = this.input.map(Number);
    }

    override part1(): string {
        let increased = 0;
        for(let i = 1; i < this.depths.length; i++){
            if(this.depths[i] > this.depths[i - 1]){
                increased++;
            }
        }
        return `Measurements increased ${increased} times`;
    }

    override part2(): string {
        let increased = 0;
        for(let i = 3; i < this.depths.length; i++){
            const Group1 = this.depths[i] + this.depths[i - 1] + this.depths[i - 2];
            const Group2 = this.depths[i - 1] + this.depths[i - 2] + this.depths[i - 3];
            if(Group1 > Group2){
                increased++;
            }
        }
        return `Measurements increased ${increased} times`;
    }
}