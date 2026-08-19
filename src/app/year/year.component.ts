import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { Params, RouterLink } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { Observable, from, map, mergeMap, scan, startWith, catchError, of, switchMap } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';
import { RouteViewModelComponent } from '../shared/route-view-model.component';

export interface DailyResult {
  day: number;
  part1: string;
  part2: string;
  timePart1: number;
  timePart2: number;
  title: string;
}

interface YearViewModel {
  year: number;
  noDays: number;
  dailyResults: DailyResult[];
  completionPercentage: number;
}

@Component({
    selector: 'app-year',
    templateUrl: './year.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './year.component.css',
    imports: [MatProgressBar, AsyncPipe, RouterLink],
})
export class YearComponent extends RouteViewModelComponent<YearViewModel> {
  private runnerService = inject(RunnerService);
  private challengeInfoService = inject(ChallengeInfoService);

  protected getInitialVm(): YearViewModel {
    return { year: 0, noDays: 0, dailyResults: [], completionPercentage: 0 };
  }

  protected buildViewModel$(params: Params): Observable<YearViewModel> {
    const year = +params['year'];
    const noDays = this.challengeInfoService.getNumberOfDaysForYear(year);

    return from(this.runnerService.runAllChallenges(year)).pipe(
      switchMap((subject) => subject.pipe(
        mergeMap((data) => this.challengeInfoService.getChallengeTitle(year, data.day).pipe(
          map((title) => ({ ...data, title: title || 'Unknown Title' }))
        )),
        scan((acc: DailyResult[], resultWithTitle) => {
          const insertIndex = acc.findIndex((result) => result.day > resultWithTitle.day);
          return insertIndex === -1
            ? [...acc, resultWithTitle]
            : [...acc.slice(0, insertIndex), resultWithTitle, ...acc.slice(insertIndex)];
        }, [] as DailyResult[]),
        startWith([] as DailyResult[]),
      )),
      map((dailyResults) => ({
        year,
        noDays,
        dailyResults,
        completionPercentage: noDays ? (dailyResults.length / noDays) * 100 : 0,
      })),
      catchError((err) => {
        console.error('Subscription error:', err); // Log errors, keep the pipeline alive for future navigations
        return of({ year, noDays, dailyResults: [] as DailyResult[], completionPercentage: 0 });
      }),
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
