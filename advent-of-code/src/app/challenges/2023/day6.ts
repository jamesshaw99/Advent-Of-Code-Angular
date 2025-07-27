import { day } from "../../helpers/day"

export class year2023day6 extends day {
private time: number[] = [];
    private distance: number[] = [];

    override part1(): string {
        this.time = this.input[0].replace("Time: ", "").trim().split(/\s+/).map(Number);
        this.distance = this.input[1].replace("Distance: ", "").trim().split(/\s+/).map(Number);
        const result = this.calculateWaysToBeatRecord(this.time, this.distance);

        return `Total number of ways to win: ${result}`;
    }

    override part2(): string {
        this.time = [Number(this.input[0].replace("Time: ", "").replace(/\s+/g, ""))];
        this.distance = [Number(this.input[1].replace("Distance: ", "").replace(/\s+/g, ""))];
        const result = this.calculateWaysToBeatRecord(this.time, this.distance);

        return `Total number of ways to win: ${result}`;
    }

    private calculateWaysToBeatRecord(time: number[], distance: number[]): number {
        let totalWays = 1;

        for (let i = 0; i < time.length; i++) {
            const waysToBeatRecord = this.calculateWaysForRace(time[i], distance[i]);
            totalWays *= waysToBeatRecord;
        }

        return totalWays;
    }

    private calculateWaysForRace(raceTime: number, recordDistance: number): number {
        let waysToBeatRecord = 0;

        for (let holdTime = 0; holdTime < raceTime; holdTime++) {
            const boatSpeed = holdTime;
            const remainingTime = raceTime - holdTime;
            const totalDistance = boatSpeed * remainingTime;

            if (totalDistance > recordDistance) {
                waysToBeatRecord++;
            }
        }

        return waysToBeatRecord;
    }
}