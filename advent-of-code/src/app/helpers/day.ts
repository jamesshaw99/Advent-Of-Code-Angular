export class day {
    input: string[] = [];

    run(input: string[]): { part1: string; part2: string; input: string[] }{
        this.input = input;
        this.preChallenge();
        return{
            part1: this.part1(),
            part2: this.part2(),
            input: this.input
        }
    }

    preChallenge(){}

    part1(){
        return 'not implemented';
    }

    part2(){
        return 'not implemented';
    }
}