import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { BehaviorSubject, Subject, from, merge, scan, startWith, switchMap, takeUntil, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface ChallengeResult {
  part1: string;
  part2: string;
  timePart1: number;
  timePart2: number;
}

export interface ChallengeDescription {
  title: string;
  part1Description: string[];
  part2Description: string[];
}

interface DayViewModel {
  year: number;
  day: number;
  result: ChallengeResult | null;
  challengeInfo: ChallengeDescription | null;
}

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './day.component.css',
    imports: [AsyncPipe],
})
export class DayComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private runnerService = inject(RunnerService);
  private challengeInfoService = inject(ChallengeInfoService);

  private destroy$ = new Subject<void>();
  private vmSubject = new BehaviorSubject<DayViewModel>({
    year: 0,
    day: 0,
    result: null,
    challengeInfo: null,
  });
  vm$ = this.vmSubject.asObservable();

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        const year = +params['year'];
        const day = +params['day'];
        const base: DayViewModel = { year, day, result: null, challengeInfo: null };

        const challengeInfo$ = this.challengeInfoService
          .getChallengeInfo(year, day)
          .pipe(map((challengeInfo) => ({ challengeInfo })));

        const result$ = from(this.runnerService.runChallenge(year, day)).pipe(
          map((result) => ({ result }))
        );

        return merge(challengeInfo$, result$).pipe(
          scan((acc, partial) => ({ ...acc, ...partial }), base),
          startWith(base),
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
    this.router.navigate(['/year/' + this.vmSubject.value.year]);
  }
}
