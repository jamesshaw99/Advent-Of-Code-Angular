import { day } from "../../helpers/day";

export class year2022day1 extends day {
    calories: number[] = new Array(this.input.length+1);

    override preChallenge(): void {
        for(let i = 0; i < this.input.length; i++){
            if(this.input[i] === ''){
                this.calories[i] = 0;
            }
            else {
                this.calories[i] = +this.input[i];
            }
        }
        this.calories[this.input.length] = 0;
    }

    override part1(): string {
        let max = 0, total = 0;

        for(const calorie of this.calories) {
            total += calorie;
            if(calorie === 0) {
                if(max < total) {
                    max = total;
                }
                total = 0;
            }
        }
        return `The most calories carried by an elf is ${max}`;
    }

    override part2(): string {
        let first = 0, second = 0, third = 0, total = 0;

        for(const calorie of this.calories){
            total += calorie;
            if(calorie === 0){
                if(first < total) {
                    third = second;
                    second = first;
                    first = total;
                }
                else if(second < total) {
                    third = second;
                    second = total;
                }
                else if(third < total) {
                    third = total;
                }
                total = 0;
            }
        }
        return `The total calories of the top thee elves is ${first + second + third}`;
    }
}