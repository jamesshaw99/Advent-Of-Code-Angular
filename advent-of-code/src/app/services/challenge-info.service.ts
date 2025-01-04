import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ChallengeInfo } from '../models/ChallengeInfo';
import { challengeInstances } from '../helpers/challenge-definitions';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {
  private challengeInfo: Record<number, Record<number, ChallengeInfo>> = {};

  constructor(private http: HttpClient) { }

  getNumberOfDaysForYear(year: number): number {
    return challengeInstances.filter((challenge) => challenge.year === year)
      .length;
  }

  getChallengeInfo(year: number, day: number): Observable<ChallengeInfo> {
    if (this.challengeInfo[year]?.[day]) {
      return of(this.challengeInfo[year][day]);
    }
    return this.http
      .get<ChallengeInfo>(`http://localhost:3000/scrape/${year}/${day}`)
      .pipe(
        tap((data) => {
          if (!this.challengeInfo[year]) {
            this.challengeInfo[year] = {};
          }
          this.challengeInfo[year][day] = data;
        }),
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
      const cachedData = this.challengeInfo[year]?.[day];
      if (cachedData) {
        return of(cachedData.title);
      }

      return this.http
        .get<ChallengeInfo>(`http://localhost:3000/scrape/${year}/${day}`)
        .pipe(
          tap((data) => {
            if (!this.challengeInfo[year]) {
              this.challengeInfo[year] = {};
            }
            this.challengeInfo[year][day] = data;
          }),
          map((data) => {
            return data.title || 'No title available';
          }),
          catchError(() => of('No title available'))
        );
  }
}
