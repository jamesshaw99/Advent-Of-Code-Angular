import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { ChallengeInfo } from '../models/ChallengeInfo';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {
  private challengeInfo: Record<number, Record<number, ChallengeInfo>> = {};

  constructor(private http: HttpClient) { }

  getChallengeInfo(year: number, day: number): Observable<ChallengeInfo> {
    return this.http.get<ChallengeInfo>(`http://localhost:3000/scrape/${year}/${day}`).pipe(
      tap(data => {
        if (!this.challengeInfo[year]) {
          this.challengeInfo[year] = {};
        }
        this.challengeInfo[year][day] = data;
      }),
      catchError(error => {
        console.error(error);
        return of(new ChallengeInfo());
      })
    );
  }

  getChallengeTitles(year: number, days: number): Observable<{ day: number; title: string }[]> {
    const requests = Array.from({ length: days }, (_, day) => 
      this.http.get<ChallengeInfo>(`http://localhost:3000/scrape/${year}/${day + 1}`).pipe(
        catchError(() => of({ title: 'No title available' }))
      )
    );
    
    return forkJoin(requests).pipe(
      map(responses => {
        return responses.map((data, index) => ({
          day: index + 1,
          title: data.title
        }));
      })
    );
  }
}