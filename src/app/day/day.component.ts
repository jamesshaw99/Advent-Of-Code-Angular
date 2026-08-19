import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RunnerService } from '../services/runner.service';
import { Params } from '@angular/router';
import { ChallengeInfoService } from '../services/challenge-info.service';
import { Observable, from, merge, of, scan, startWith, map, catchError, finalize } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouteViewModelComponent } from '../shared/route-view-model.component';

export interface ChallengeResult {
  part1: string;
  part2: string;
  timePart1: number;
  timePart2: number;
}

export interface ChallengeDescription {
  title: string;
  part1Description: string;
  part2Description: string;
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
export class DayComponent extends RouteViewModelComponent<DayViewModel> {
  private runnerService = inject(RunnerService);
  private challengeInfoService = inject(ChallengeInfoService);

  protected getInitialVm(): DayViewModel {
    return { year: 0, day: 0, result: null, challengeInfo: null };
  }

  protected buildViewModel$(params: Params): Observable<DayViewModel> {
    const year = +params['year'];
    const day = +params['day'];
    const base: DayViewModel = { year, day, result: null, challengeInfo: null };
    const abortController = new AbortController();

    const challengeInfo$ = this.challengeInfoService
      .getChallengeInfo(year, day)
      .pipe(map((challengeInfo) => ({ challengeInfo })));

    const result$ = from(this.runnerService.runChallenge(year, day, undefined, abortController.signal)).pipe(
      map((result) => ({ result })),
      catchError((error) =>
        of({
          result: {
            part1: `Error: ${error}`,
            part2: `Error: ${error}`,
            timePart1: 0,
            timePart2: 0,
          },
        })
      )
    );

    return merge(challengeInfo$, result$).pipe(
      scan((acc, partial) => ({ ...acc, ...partial }), base),
      startWith(base),
      finalize(() => abortController.abort()),
    );
  }

  goBack(): void {
    this.router.navigate(['/year/' + this.currentVm.year]);
  }
}
