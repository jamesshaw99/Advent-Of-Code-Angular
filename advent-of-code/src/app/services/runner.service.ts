import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { Subject } from 'rxjs';
import { challengeInstances } from '../helpers/challenge-definitions';
import { day } from '../helpers/day';
import { RunnerResults } from '../models/RunnerResults';
import { ChallengeInfoService } from './challenge-info.service';

@Injectable({
  providedIn: 'root',
})
export class RunnerService {
  challenges: Record<
    number,
    Record<
      number,
      {
        run: (input: string[]) => {
          part1: string;
          part2: string;
          timePart1: number;
          timePart2: number;
        };
      }
    >
  > = {};

  constructor(private inputService: InputService, private challengeInfoService: ChallengeInfoService) {
    this.initializeChallenges(challengeInstances);
  }

  initializeChallenges(
    challengeInstances: { year: number; day: number; instance: day }[]
  ): void {
    for (const { year, day, instance } of challengeInstances) {
      if (!this.challenges[year]) {
        this.challenges[year] = {};
      }
      this.challenges[year][day] = {
        run: instance.run.bind(instance),
      };
    }
  }

  getYears(): {year: number, days: number, stars: number}[] {
    return Object.keys(this.challenges).map((year) => {
      const yearInt = parseInt(year, 10);      
      const days = Object.keys(this.challenges[yearInt]).length;
      // Count the number of stars earned for the year by checking the number of overrides
      const stars = challengeInstances
        .filter(ci => ci.year === yearInt)
        .reduce((count, ci) => {
          let overrides = 0;
          if (ci.instance.part1 !== day.prototype.part1) overrides++;
          if (ci.instance.part2 !== day.prototype.part2) overrides++;
          return count + overrides;
        }, 0);
      return {year: yearInt, days, stars};
    });
  }

  async runAllChallenges(year: number): Promise<Subject<RunnerResults>> {
    const days = Object.keys(this.challenges[year] || {}).map((day) =>
      parseInt(day, 10)
    );
    const resultsSubject = new Subject<RunnerResults>();

    (async () => {
      const challengePromises = days.map(async (day) => {
        try {
          const result = await this.runChallenge(year, day);
          const dayResult = { day, ...result };
          resultsSubject.next(dayResult);
        } catch (error) {
          console.error(`Error running challenge for Day ${day}:`, error);
        }
      });

      challengePromises.forEach((promise) => promise);

      await Promise.all(challengePromises);
      resultsSubject.complete();
    })();

    return resultsSubject;
  }

  async runChallenge(
    year: number,
    day: number
  ): Promise<{
    part1: string;
    part2: string;
    timePart1: number;
    timePart2: number;
  }> {
    const challenge = this.challenges[year]?.[day];
    if (!challenge) {
      return {
        part1: `No challenge implemented for Day ${day} of ${year}`,
        part2: `No challenge implemented for Day ${day} of ${year}`,
        timePart1: 0,
        timePart2: 0,
      };
    }

    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL('../runner.worker.ts', import.meta.url)
      );

      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };
      worker.onerror = (err) => {
        reject(err.message);
        worker.terminate();
      };
      this.inputService.loadInput(year, day).subscribe({
        next: (input) => {
          worker.postMessage({ year, day, input });
        },
        error: (err) => {
          reject(`Input loading failed: ${err}`);
          worker.terminate();
        },
      });
    });
  }
}
