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

export interface DaySlot {
  day: number;
  title: string | null;
  stars: number;
  starsLabel: string;
}

interface YearViewModel {
  year: number;
  noDays: number;
  dailyResults: DailyResult[];
  days: DaySlot[];
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
    return { year: 0, noDays: 0, dailyResults: [], days: [], completionPercentage: 0 };
  }

  protected buildViewModel$(params: Params): Observable<YearViewModel> {
    const year = +params['year'];
    const noDays = this.challengeInfoService.getNumberOfDaysForYear(year);
    const totalDays = year >= 2025 ? 12 : 25;

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
        days: this.buildDaySlots(totalDays, dailyResults),
        completionPercentage: noDays ? (dailyResults.length / noDays) * 100 : 0,
      })),
      catchError((err) => {
        console.error('Subscription error:', err); // Log errors, keep the pipeline alive for future navigations
        return of({ year, noDays, dailyResults: [] as DailyResult[], days: this.buildDaySlots(totalDays, []), completionPercentage: 0 });
      }),
    );
  }

  private buildDaySlots(totalDays: number, dailyResults: DailyResult[]): DaySlot[] {
    return Array.from({ length: totalDays }, (_, i) => {
      const dayNumber = i + 1;
      const result = dailyResults.find((r) => r.day === dayNumber) ?? null;
      const stars = result
        ? (result.part1 !== 'not implemented' ? 1 : 0) + (result.part2 !== 'not implemented' ? 1 : 0)
        : 0;
      return {
        day: dayNumber,
        title: result?.title ?? null,
        stars,
        starsLabel: '★'.repeat(stars),
      };
    });
  }

  padDay(day: number): string {
    return day.toString().padStart(2, '0');
  }

  isMultilineAnswer(answer: string): boolean {
    return answer.includes('\n');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
