export class ChallengeInfo {
    title: string;
    part1Description: string[];
    part2Description: string[];
  
    // Constructor with default values
    constructor(
      title = 'No data found',
      part1Description: string[] = [],
      part2Description: string[] = []
    ) {
      this.title = title;
      this.part1Description = part1Description;
      this.part2Description = part2Description;
    }
  }
  