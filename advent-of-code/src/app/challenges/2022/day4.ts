import { day } from "../../helpers/day";

export class year2022day4 extends day {
    override part1(): string {
        let count = 0;
        for (const pairs of this.input) {
            const pair = pairs.replace(",", "-");
            const IDs = pair.split("-").map(Number);
            if ((IDs[0] <= IDs[2] && IDs[1] >= IDs[3]) || (IDs[0] >= IDs[2] && IDs[1] <= IDs[3])) {
                count++;
            }
        }
        return "Fully contained pairs: " + count;
    }

    override part2(): string {
        let count = 0;
        for (const pairs of this.input) {
            const pair = pairs.replace(",", "-");
            const IDs = pair.split("-").map(Number);
            if (!((IDs[0] < IDs[2] && IDs[1] < IDs[2]) || (IDs[0] > IDs[3] && IDs[1] > IDs[3]))) {
                count++;
            }
        }
        return "Overlapping pairs: " + count;
    }
}