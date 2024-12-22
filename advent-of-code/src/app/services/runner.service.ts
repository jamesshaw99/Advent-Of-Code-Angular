import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { Subject } from 'rxjs';
import { challengeInstances } from '../helpers/challenge-definitions';

@Injectable({
  providedIn: 'root',
})
export class RunnerService {
  challenges: {
    [year: number]: {
      [day: number]: {
        run: (input: string[]) => {
          part1: string;
          part2: string;
          input: string[];
        };
      };
    };
  } = {};

  constructor(
    private inputService: InputService
  ) {
    this.initializeChallenges(challengeInstances);
  }

  initializeChallenges(
    challengeInstances: { year: number; day: number; instance: any }[]
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

  getYears(): number[] {
    return Object.keys(this.challenges).map((year) => parseInt(year, 10));
  }

  async runAllChallenges(
    year: number
  ): Promise<Subject<{ day: number; part1: string; part2: string }[]>> {
    const days = Object.keys(this.challenges[year] || {}).map((day) =>
      parseInt(day, 10)
    );
    const resultsSubject = new Subject<
      { day: number; part1: string; part2: string }[]
    >();
    const challengeResults: { day: number; part1: string; part2: string }[] = [];

    (async () => {
      for (const day of days) {
        const result = await this.runChallenge(year, day);
        challengeResults.push({ day, ...result });
        resultsSubject.next([...challengeResults]);
      }
      resultsSubject.complete();
    })();
    return resultsSubject;
  }

  async runChallenge(
    year: number,
    day: number
  ): Promise<{ part1: string; part2: string }> {
    const challenge = this.challenges[year]?.[day];
    if (!challenge) {
      return {
        part1: `No challenge implemented for Day ${day} of ${year}`,
        part2: `No challenge implemented for Day ${day} of ${year}`,
      };
    }
    
    return await this.runChallengeWithWorker(year, day);
  }

  async runChallengeWithWorker(
    year: number,
    day: number
  ): Promise<{ part1: string; part2: string }> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('../runner.worker.ts', import.meta.url));
  
      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };
      worker.onerror = (err) => {
        reject(err.message);
        worker.terminate();
      };
      this.inputService.loadInput(year, day).subscribe((input) => {
        worker.postMessage({ year, day, input });
      });
    });
  }  
}
