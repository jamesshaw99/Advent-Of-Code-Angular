import { day } from '../../helpers/day';

interface LogEntry {
  timestamp: string;
  minute: number;
  event: 'begin' | 'sleep' | 'wake';
  guardId?: number;
}

export class year2018day4 extends day {
  private sleepMinutesByGuard = new Map<number, number[]>();

  override preChallenge(): void {
    const entries = this.input
      .map(line => this.parseLine(line))
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    let currentGuard = -1;
    let asleepSince = -1;

    for (const entry of entries) {
      if (entry.event === 'begin') {
        currentGuard = entry.guardId!;
      } else if (entry.event === 'sleep') {
        asleepSince = entry.minute;
      } else {
        const minutes = this.sleepMinutesByGuard.get(currentGuard) ?? new Array(60).fill(0);
        for (let minute = asleepSince; minute < entry.minute; minute++) {
          minutes[minute]++;
        }
        this.sleepMinutesByGuard.set(currentGuard, minutes);
      }
    }
  }

  override part1(): string {
    let sleepiestGuard = -1;
    let mostMinutesAsleep = -1;

    for (const [guardId, minutes] of this.sleepMinutesByGuard) {
      const total = minutes.reduce((sum, count) => sum + count, 0);
      if (total > mostMinutesAsleep) {
        mostMinutesAsleep = total;
        sleepiestGuard = guardId;
      }
    }

    const bestMinute = this.bestMinuteFor(sleepiestGuard);
    return `Guard ${sleepiestGuard} * minute ${bestMinute} = ${sleepiestGuard * bestMinute}`;
  }

  override part2(): string {
    let bestGuard = -1;
    let bestMinute = -1;
    let bestCount = -1;

    for (const [guardId, minutes] of this.sleepMinutesByGuard) {
      for (let minute = 0; minute < minutes.length; minute++) {
        if (minutes[minute] > bestCount) {
          bestCount = minutes[minute];
          bestGuard = guardId;
          bestMinute = minute;
        }
      }
    }

    return `Guard ${bestGuard} * minute ${bestMinute} = ${bestGuard * bestMinute}`;
  }

  private bestMinuteFor(guardId: number): number {
    const minutes = this.sleepMinutesByGuard.get(guardId)!;
    let bestMinute = 0;
    for (let minute = 1; minute < minutes.length; minute++) {
      if (minutes[minute] > minutes[bestMinute]) {
        bestMinute = minute;
      }
    }
    return bestMinute;
  }

  private parseLine(line: string): LogEntry {
    const match = line.match(/\[(\d{4}-\d{2}-\d{2} \d{2}:(\d{2}))\] (.+)/);
    if (!match) {
      throw new Error(`Could not parse log entry: ${line}`);
    }
    const [, timestamp, minuteText, description] = match;
    const minute = Number(minuteText);

    if (description.startsWith('Guard')) {
      const guardId = Number(description.match(/#(\d+)/)![1]);
      return { timestamp, minute, event: 'begin', guardId };
    }
    if (description === 'falls asleep') {
      return { timestamp, minute, event: 'sleep' };
    }
    return { timestamp, minute, event: 'wake' };
  }
}
