import { Injectable, inject } from '@angular/core';
import { InputService } from './input.service';
import { Subject } from 'rxjs';
import { challengesByYear } from '../helpers/challenge-definitions';
import { day } from '../helpers/day';
import { RunnerResults } from '../models/RunnerResults';
import { YearInfo } from '../models/YearInfo';

@Injectable({
  providedIn: 'root',
})
export class RunnerService {
  private inputService = inject(InputService);

  challenges: Record<
    number,
    Record<
      number,
      {
        run: (input: string[]) => Promise<{
          part1: string;
          part2: string;
          timePart1: number;
          timePart2: number;
        }>;
      }
    >
  > = {};

  constructor() {
    this.initializeChallenges(challengesByYear);
  }

  initializeChallenges(challengesByYear: Record<number, Record<number, day>>): void {
    for (const [year, daysForYear] of Object.entries(challengesByYear)) {
      const yearInt = Number(year);
      this.challenges[yearInt] = {};
      for (const [dayNum, instance] of Object.entries(daysForYear)) {
        this.challenges[yearInt][Number(dayNum)] = {
          run: (input: string[]) => instance.run(input),
        };
      }
    }
  }

  getYears(): YearInfo[] {
    return Object.entries(challengesByYear).map(([year, daysForYear]) => {
      const instances = Object.values(daysForYear);
      // Count the number of stars earned for the year by checking the number of overrides
      const stars = instances.reduce((count, instance) => {
        let overrides = 0;
        if (instance.part1 !== day.prototype.part1) overrides++;
        if (instance.part2 !== day.prototype.part2) overrides++;
        return count + overrides;
      }, 0);
      return { year: Number(year), days: instances.length, stars };
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
          resultsSubject.next({
            day,
            part1: `Error: ${error}`,
            part2: `Error: ${error}`,
            timePart1: 0,
            timePart2: 0,
          });
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
    day: number,
    timeoutMs = 10000,
    signal?: AbortSignal
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
      let settled = false;

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        worker.terminate();
        reject(`Day ${day} of ${year} timed out after ${timeoutMs}ms`);
      }, timeoutMs);

      const finish = (fn: () => void) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        signal?.removeEventListener('abort', onAbort);
        fn();
        worker.terminate();
      };

      const onAbort = () => finish(() => reject(`Day ${day} of ${year} was cancelled`));
      signal?.addEventListener('abort', onAbort);

      worker.onmessage = ({ data }) => {
        finish(() => (data.error ? reject(data.stack) : resolve(data)));
      };
      worker.onerror = (err) => {
        finish(() => reject(err));
      };
      this.inputService.loadInput(year, day).subscribe({
        next: (input) => {
          worker.postMessage({ year, day, input });
        },
        error: (err) => {
          finish(() => reject(`Input loading failed: ${err}`));
        },
      });
    });
  }
}
