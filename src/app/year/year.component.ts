import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { BehaviorSubject, Subject, from, map, switchMap, mergeMap, scan, startWith, takeUntil, catchError, of } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';

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
    imports: [MatProgressBar, AsyncPipe],
})
export class YearComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private runnerService = inject(RunnerService);
  private challengeInfoService = inject(ChallengeInfoService);

  private destroy$ = new Subject<void>();
  private vmSubject = new BehaviorSubject<YearViewModel>({
    year: 0,
    noDays: 0,
    dailyResults: [],
    completionPercentage: 0,
  });
  vm$ = this.vmSubject.asObservable();

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => +params['year']),
      switchMap((year) => {
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
      }),
      takeUntil(this.destroy$),
    ).subscribe((vm) => this.vmSubject.next(vm));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
