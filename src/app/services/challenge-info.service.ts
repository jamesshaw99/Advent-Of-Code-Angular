import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ChallengeInfo } from '../models/ChallengeInfo';
import { challengesByYear } from '../helpers/challenge-definitions';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {
  private http = inject(HttpClient);

  private challengeInfo: Record<number, Record<number, ChallengeInfo>> = {};

  getNumberOfDaysForYear(year: number): number {
    return Object.keys(challengesByYear[year] ?? {}).length;
  }

  getChallengeInfo(year: number, day: number): Observable<ChallengeInfo> {
    const cached = this.challengeInfo[year]?.[day];
    if (cached) {
      return of(cached);
    }
    return this.fetchAndCache(year, day).pipe(
      catchError((error) => {
        console.error(error);
        return of(new ChallengeInfo());
      })
    );
  }

  getChallengeTitle(
    year: number,
    day: number
  ): Observable<string> {
      const cached = this.challengeInfo[year]?.[day];
      if (cached) {
        return of(cached.title);
      }

      return this.fetchAndCache(year, day).pipe(
        map((data) => data.title || 'No title available'),
        catchError(() => of('No title available'))
      );
  }

  private fetchAndCache(year: number, day: number): Observable<ChallengeInfo> {
    return this.http
      .get<ChallengeInfo>(`http://localhost:3000/scrape/${year}/${day}`)
      .pipe(
        tap((data) => {
          if (!this.challengeInfo[year]) {
            this.challengeInfo[year] = {};
          }
          this.challengeInfo[year][day] = data;
        })
      );
  }
}
