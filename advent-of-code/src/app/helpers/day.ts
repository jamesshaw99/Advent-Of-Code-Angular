export class day {
    input: string[] = [];

    run(input: string[]): { part1: string; part2: string; }{
        this.input = input;
        this.preChallenge();
        return{
            part1: this.part1(),
            part2: this.part2()
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